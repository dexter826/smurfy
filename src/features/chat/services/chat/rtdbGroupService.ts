import { ref, get, update, push, remove } from 'firebase/database';
import { rtdb } from '@/lib/firebase/config';
import { RtdbConversation, MediaObject, MemberRole } from '@shared/types';
import { uploadWithProgress, UploadProgress } from '@/utils/uploadUtils';
import { compressImage } from '@/utils/imageUtils';
import { IMAGE_COMPRESSION } from '@/constants';
import { validateAvatarFile } from '@/utils/fileValidation';
import {
  getCurrentUid,
  generateRandomToken,
  getUserName,
  sendSystemMessage,
  groupSystemMessages,
} from './groupClientHelper';

export const rtdbGroupService = {
  /** Tạo nhóm chat mới */
  createGroup: async (
    creatorId: string,
    name: string,
    memberIds: string[],
    avatar?: MediaObject,
  ): Promise<string> => {
    try {
      const actorName = await getUserName(creatorId);
      const newConvRef = push(ref(rtdb, 'conversations'));
      const convId = newConvRef.key!;

      const allMemberIds = Array.from(new Set([creatorId, ...memberIds]));
      const members: Record<string, MemberRole> = { [creatorId]: 'admin' };
      memberIds.forEach((id) => {
        if (id !== creatorId) members[id] = 'member';
      });

      const now = Date.now();
      const inviteToken = generateRandomToken();
      const conversationData: any = {
        isGroup: true,
        name,
        avatar: avatar || null,
        creatorId,
        inviteLink: inviteToken,
        members,
        joinApprovalMode: false,
        createdAt: now,
        updatedAt: now,
        lastMessage: null,
      };

      const updates: Record<string, any> = {
        [`conversations/${convId}`]: conversationData,
        [`invite_links/${inviteToken}`]: convId,
      };

      allMemberIds.forEach((uid) => {
        updates[`user_chats/${uid}/${convId}`] = {
          isPinned: false,
          isMuted: false,
          isArchived: false,
          unreadCount: 0,
          lastReadMsgId: null,
          lastMsgTimestamp: now,
          clearedAt: 0,
          createdAt: now,
          updatedAt: now,
        };
      });

      await update(ref(rtdb), updates);
      await sendSystemMessage(
        convId,
        groupSystemMessages.CREATE_GROUP(actorName),
        allMemberIds,
        creatorId,
      );

      return convId;
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi createGroup:', error);
      throw error;
    }
  },

  /** Thêm thành viên vào nhóm */
  addMembers: async (convId: string, memberIds: string[], actorId: string): Promise<void> => {
    try {
      const convSnap = await get(ref(rtdb, `conversations/${convId}`));
      if (!convSnap.exists()) throw new Error('Nhóm không tồn tại.');

      const conv = convSnap.val() as RtdbConversation;
      const existingMemberIds = Object.keys(conv.members || {});
      const newMembers = memberIds.filter((id) => !existingMemberIds.includes(id));
      if (newMembers.length === 0) return;

      const now = Date.now();
      const updates: Record<string, any> = {};

      newMembers.forEach((id) => {
        updates[`conversations/${convId}/members/${id}`] = 'member';
        updates[`user_chats/${id}/${convId}`] = {
          isPinned: false,
          isMuted: false,
          isArchived: false,
          unreadCount: 0,
          lastReadMsgId: null,
          lastMsgTimestamp: now,
          clearedAt: 0,
          createdAt: now,
          updatedAt: now,
        };
      });

      await update(ref(rtdb), updates);

      const [actorName, targetNames] = await Promise.all([
        getUserName(actorId),
        Promise.all(newMembers.map(getUserName)),
      ]);

      const allMemberIds = [...existingMemberIds, ...newMembers];
      await sendSystemMessage(
        convId,
        groupSystemMessages.ADD_MEMBERS(actorName, targetNames.join(', ')),
        allMemberIds,
        actorId,
      );
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi addMembers:', error);
      throw error;
    }
  },

  /** Mời người dùng tham gia nhóm */
  inviteMember: async (
    convId: string,
    uid: string,
    actorId: string,
  ): Promise<'direct' | 'pending'> => {
    try {
      const convSnap = await get(ref(rtdb, `conversations/${convId}`));
      if (!convSnap.exists()) throw new Error('Nhóm không tồn tại.');

      const conv = convSnap.val() as RtdbConversation;
      if (conv.members?.[uid]) return 'direct';

      if (conv.joinApprovalMode) {
        const now = Date.now();
        await update(ref(rtdb), {
          [`conversations/${convId}/pendingMembers/${uid}`]: {
            addedBy: actorId,
            timestamp: now,
          },
        });
        const [actorName, targetName] = await Promise.all([getUserName(actorId), getUserName(uid)]);
        const memberIds = Object.keys(conv.members || {});
        await sendSystemMessage(
          convId,
          groupSystemMessages.INVITE_PENDING(actorName, targetName),
          memberIds,
          actorId,
        );
        return 'pending';
      } else {
        await rtdbGroupService.addMembers(convId, [uid], actorId);
        return 'direct';
      }
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi inviteMember:', error);
      throw error;
    }
  },

  /** Lấy link mời nhóm */
  getGroupInviteLink: async (convId: string): Promise<string> => {
    try {
      const convSnap = await get(ref(rtdb, `conversations/${convId}`));
      if (!convSnap.exists()) throw new Error('Nhóm không tồn tại.');

      let token = convSnap.val().inviteLink;
      if (!token) {
        token = generateRandomToken();
        await update(ref(rtdb), {
          [`conversations/${convId}/inviteLink`]: token,
          [`invite_links/${token}`]: convId,
        });
      }
      return `${window.location.origin}/join/${token}`;
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi getGroupInviteLink:', error);
      throw error;
    }
  },

  /** Đặt lại link mời nhóm */
  regenerateGroupInviteLink: async (convId: string): Promise<string> => {
    try {
      const convSnap = await get(ref(rtdb, `conversations/${convId}`));
      if (!convSnap.exists()) throw new Error('Nhóm không tồn tại.');

      const oldToken = convSnap.val().inviteLink;
      const newToken = generateRandomToken();
      const updates: Record<string, any> = {
        [`conversations/${convId}/inviteLink`]: newToken,
        [`invite_links/${newToken}`]: convId,
      };
      if (oldToken) {
        updates[`invite_links/${oldToken}`] = null;
      }
      await update(ref(rtdb), updates);
      return `${window.location.origin}/join/${newToken}`;
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi regenerateGroupInviteLink:', error);
      throw error;
    }
  },

  /** Tham gia nhóm qua link */
  joinGroupByLink: async (
    token: string,
  ): Promise<{
    status: 'joined' | 'pending' | 'already_member' | 'invalid' | 'disbanded' | 'full';
    convId?: string;
  }> => {
    try {
      const currentUid = getCurrentUid();
      const tokenSnap = await get(ref(rtdb, `invite_links/${token}`));
      if (!tokenSnap.exists()) return { status: 'invalid' };

      const convId = tokenSnap.val() as string;
      const convSnap = await get(ref(rtdb, `conversations/${convId}`));
      if (!convSnap.exists()) return { status: 'invalid' };

      const conv = convSnap.val() as RtdbConversation;
      if (conv.isDisbanded) return { status: 'disbanded', convId };

      if (conv.members?.[currentUid]) {
        return { status: 'already_member', convId };
      }

      if (conv.joinApprovalMode) {
        await update(ref(rtdb), {
          [`conversations/${convId}/pendingMembers/${currentUid}`]: {
            addedBy: 'link',
            timestamp: Date.now(),
          },
        });
        return { status: 'pending', convId };
      }

      await rtdbGroupService.addMembers(convId, [currentUid], currentUid);
      return { status: 'joined', convId };
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi joinGroupByLink:', error);
      throw error;
    }
  },

  /** Lấy thông tin nhóm từ link mời */
  getGroupInviteInfo: async (
    token: string,
  ): Promise<{
    status: 'success' | 'invalid' | 'disbanded';
    convId?: string;
    name?: string;
    avatar?: MediaObject;
    memberCount?: number;
    isMember?: boolean;
    isPending?: boolean;
    joinApprovalMode?: boolean;
  }> => {
    try {
      const currentUid = getCurrentUid();
      const tokenSnap = await get(ref(rtdb, `invite_links/${token}`));
      if (!tokenSnap.exists()) return { status: 'invalid' };

      const convId = tokenSnap.val() as string;
      const convSnap = await get(ref(rtdb, `conversations/${convId}`));
      if (!convSnap.exists()) return { status: 'invalid' };

      const conv = convSnap.val() as RtdbConversation;
      if (conv.isDisbanded) return { status: 'disbanded', convId };

      const members = conv.members || {};
      const isMember = !!members[currentUid];
      const isPending = !!conv.pendingMembers?.[currentUid];

      return {
        status: 'success',
        convId,
        name: conv.name,
        avatar: conv.avatar,
        memberCount: Object.keys(members).length,
        isMember,
        isPending,
        joinApprovalMode: !!conv.joinApprovalMode,
      };
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi getGroupInviteInfo:', error);
      return { status: 'invalid' };
    }
  },

  /** Phê duyệt thành viên gia nhập */
  approveMembers: async (convId: string, uids: string[]): Promise<void> => {
    try {
      const actorId = getCurrentUid();
      const convSnap = await get(ref(rtdb, `conversations/${convId}`));
      if (!convSnap.exists()) throw new Error('Nhóm không tồn tại.');

      const conv = convSnap.val() as RtdbConversation;
      const now = Date.now();
      const updates: Record<string, any> = {};

      uids.forEach((uid) => {
        updates[`conversations/${convId}/pendingMembers/${uid}`] = null;
        updates[`conversations/${convId}/members/${uid}`] = 'member';
        updates[`user_chats/${uid}/${convId}`] = {
          isPinned: false,
          isMuted: false,
          isArchived: false,
          unreadCount: 0,
          lastReadMsgId: null,
          lastMsgTimestamp: now,
          clearedAt: 0,
          createdAt: now,
          updatedAt: now,
        };
      });

      await update(ref(rtdb), updates);

      const [actorName, targetNames] = await Promise.all([
        getUserName(actorId),
        Promise.all(uids.map(getUserName)),
      ]);
      const allMemberIds = [...Object.keys(conv.members || {}), ...uids];
      await sendSystemMessage(
        convId,
        groupSystemMessages.APPROVE_MEMBER(actorName, targetNames.join(', ')),
        allMemberIds,
        actorId,
      );
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi approveMembers:', error);
      throw error;
    }
  },

  /** Từ chối yêu cầu gia nhập */
  rejectMembers: async (convId: string, uids: string[]): Promise<void> => {
    try {
      const updates: Record<string, any> = {};
      uids.forEach((uid) => {
        updates[`conversations/${convId}/pendingMembers/${uid}`] = null;
      });
      await update(ref(rtdb), updates);
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi rejectMembers:', error);
      throw error;
    }
  },

  /** Chuyển đổi chế độ duyệt thành viên */
  toggleApprovalMode: async (convId: string, enabled: boolean): Promise<string[]> => {
    try {
      const actorId = getCurrentUid();
      const convSnap = await get(ref(rtdb, `conversations/${convId}`));
      if (!convSnap.exists()) throw new Error('Nhóm không tồn tại.');

      const conv = convSnap.val() as RtdbConversation;
      const updates: Record<string, any> = {
        [`conversations/${convId}/joinApprovalMode`]: enabled,
      };

      const pendingUids = Object.keys(conv.pendingMembers || {});
      if (!enabled && pendingUids.length > 0) {
        const now = Date.now();
        pendingUids.forEach((uid) => {
          updates[`conversations/${convId}/pendingMembers/${uid}`] = null;
          updates[`conversations/${convId}/members/${uid}`] = 'member';
          updates[`user_chats/${uid}/${convId}`] = {
            isPinned: false,
            isMuted: false,
            isArchived: false,
            unreadCount: 0,
            lastReadMsgId: null,
            lastMsgTimestamp: now,
            clearedAt: 0,
            createdAt: now,
            updatedAt: now,
          };
        });
      }

      await update(ref(rtdb), updates);

      const actorName = await getUserName(actorId);
      const memberIds = [...Object.keys(conv.members || {}), ...(!enabled ? pendingUids : [])];
      await sendSystemMessage(
        convId,
        enabled
          ? groupSystemMessages.TOGGLE_APPROVAL_ON(actorName)
          : groupSystemMessages.TOGGLE_APPROVAL_OFF(actorName),
        memberIds,
        actorId,
      );

      return !enabled ? pendingUids : [];
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi toggleApprovalMode:', error);
      throw error;
    }
  },

  /** Xóa thành viên khỏi nhóm */
  removeMember: async (convId: string, uid: string, actorId: string): Promise<void> => {
    try {
      const convSnap = await get(ref(rtdb, `conversations/${convId}`));
      if (!convSnap.exists()) throw new Error('Nhóm không tồn tại.');

      const conv = convSnap.val() as RtdbConversation;
      const memberIds = Object.keys(conv.members || {});

      const updates: Record<string, any> = {
        [`conversations/${convId}/members/${uid}`]: null,
        [`user_chats/${uid}/${convId}`]: null,
      };
      await update(ref(rtdb), updates);

      const [actorName, targetName] = await Promise.all([getUserName(actorId), getUserName(uid)]);
      await sendSystemMessage(
        convId,
        groupSystemMessages.REMOVE_MEMBER(actorName, targetName),
        memberIds,
        actorId,
      );
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi removeMember:', error);
      throw error;
    }
  },

  /** Giải tán nhóm chat */
  disbandGroup: async (convId: string, actorId: string): Promise<void> => {
    try {
      const convSnap = await get(ref(rtdb, `conversations/${convId}`));
      if (!convSnap.exists()) throw new Error('Nhóm không tồn tại.');

      const conv = convSnap.val() as RtdbConversation;
      const memberIds = Object.keys(conv.members || {});

      await update(ref(rtdb), {
        [`conversations/${convId}/isDisbanded`]: true,
      });

      await sendSystemMessage(convId, groupSystemMessages.DISBAND_GROUP(), memberIds, actorId);
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi disbandGroup:', error);
      throw error;
    }
  },

  /** Cập nhật thông tin cơ bản của nhóm */
  updateGroupInfo: async (
    convId: string,
    updates: { name?: string; avatar?: MediaObject },
  ): Promise<void> => {
    try {
      const actorId = getCurrentUid();
      const convSnap = await get(ref(rtdb, `conversations/${convId}`));
      if (!convSnap.exists()) throw new Error('Nhóm không tồn tại.');

      const conv = convSnap.val() as RtdbConversation;
      const rtdbUpdates: Record<string, any> = {
        [`conversations/${convId}/updatedAt`]: Date.now(),
      };

      if (updates.name !== undefined) rtdbUpdates[`conversations/${convId}/name`] = updates.name;
      if (updates.avatar !== undefined)
        rtdbUpdates[`conversations/${convId}/avatar`] = updates.avatar;

      await update(ref(rtdb), rtdbUpdates);

      const actorName = await getUserName(actorId);
      const memberIds = Object.keys(conv.members || {});
      let msg = '';
      if (updates.name && updates.avatar) {
        msg = groupSystemMessages.UPDATE_GROUP_BOTH(actorName, updates.name);
      } else if (updates.name) {
        msg = groupSystemMessages.UPDATE_GROUP_NAME(actorName, updates.name);
      } else if (updates.avatar) {
        msg = groupSystemMessages.UPDATE_GROUP_AVATAR(actorName);
      }

      if (msg) {
        await sendSystemMessage(convId, msg, memberIds, actorId);
      }
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi updateGroupInfo:', error);
      throw error;
    }
  },

  /** Cập nhật vai trò thành viên */
  updateMemberRole: async (
    convId: string,
    uid: string,
    role: MemberRole,
    actorId: string,
  ): Promise<void> => {
    try {
      const convSnap = await get(ref(rtdb, `conversations/${convId}`));
      if (!convSnap.exists()) throw new Error('Nhóm không tồn tại.');

      const conv = convSnap.val() as RtdbConversation;
      await update(ref(rtdb), {
        [`conversations/${convId}/members/${uid}`]: role,
      });

      const [actorName, targetName] = await Promise.all([getUserName(actorId), getUserName(uid)]);
      const memberIds = Object.keys(conv.members || {});
      const msg =
        role === 'admin'
          ? groupSystemMessages.PROMOTE_TO_ADMIN(actorName, targetName)
          : groupSystemMessages.DEMOTE_FROM_ADMIN(actorName, targetName);

      await sendSystemMessage(convId, msg, memberIds, actorId);
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi updateMemberRole:', error);
      throw error;
    }
  },

  /** Chuyển nhượng quyền trưởng nhóm */
  transferCreator: async (convId: string, newCreatorId: string, actorId: string): Promise<void> => {
    try {
      const convSnap = await get(ref(rtdb, `conversations/${convId}`));
      if (!convSnap.exists()) throw new Error('Nhóm không tồn tại.');

      const conv = convSnap.val() as RtdbConversation;
      await update(ref(rtdb), {
        [`conversations/${convId}/creatorId`]: newCreatorId,
        [`conversations/${convId}/members/${newCreatorId}`]: 'admin',
      });

      const [actorName, targetName] = await Promise.all([
        getUserName(actorId),
        getUserName(newCreatorId),
      ]);
      const memberIds = Object.keys(conv.members || {});
      await sendSystemMessage(
        convId,
        groupSystemMessages.TRANSFER_CREATOR(actorName, targetName),
        memberIds,
        actorId,
      );
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi transferCreator:', error);
      throw error;
    }
  },

  /** Rời khỏi nhóm chat */
  leaveGroup: async (convId: string, uid: string): Promise<void> => {
    try {
      const convSnap = await get(ref(rtdb, `conversations/${convId}`));
      if (!convSnap.exists()) throw new Error('Nhóm không tồn tại.');

      const conv = convSnap.val() as RtdbConversation;
      const memberIds = Object.keys(conv.members || {});

      await update(ref(rtdb), {
        [`conversations/${convId}/members/${uid}`]: null,
        [`user_chats/${uid}/${convId}`]: null,
      });

      const actorName = await getUserName(uid);
      await sendSystemMessage(
        convId,
        groupSystemMessages.LEAVE_GROUP(actorName),
        memberIds.filter((id) => id !== uid),
      );
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi leaveGroup:', error);
      throw error;
    }
  },

  /** Tải ảnh đại diện nhóm lên Storage (ImgBB) */
  uploadGroupAvatar: async (
    conversationId: string,
    file: File,
    onProgress?: (progress: UploadProgress) => void,
  ): Promise<MediaObject> => {
    try {
      validateAvatarFile(file);
      const compressedFile = await compressImage(file, IMAGE_COMPRESSION.AVATAR);
      const downloadURL = await uploadWithProgress('group-avatar', compressedFile, onProgress);

      return {
        url: downloadURL,
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
        isSensitive: false,
      };
    } catch (error) {
      console.error('[rtdbGroupService] Lỗi uploadGroupAvatar:', error);
      throw error;
    }
  },
};
