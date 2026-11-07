import { ref, push, update } from 'firebase/database';
import { doc, getDoc } from 'firebase/firestore';
import { rtdb, db, auth } from '@/lib/firebase/config';
import { MediaObject } from '@shared/types';

export function getCurrentUid(): string {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Bạn cần đăng nhập để thực hiện hành động này.');
  return uid;
}

export function generateRandomToken(length = 24): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let result = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }
  return result;
}

export async function getUserName(uid: string): Promise<string> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data()?.fullName || 'Người dùng' : 'Người dùng';
  } catch (error) {
    console.error(`[groupClientHelper] Lỗi lấy tên ${uid}:`, error);
    return 'Người dùng';
  }
}

export async function getUserProfile(
  uid: string,
): Promise<{ id: string; fullName: string; avatar: MediaObject | null }> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        id: uid,
        fullName: data?.fullName || 'Người dùng',
        avatar: data?.avatar || null,
      };
    }
    return { id: uid, fullName: 'Người dùng', avatar: null };
  } catch {
    return { id: uid, fullName: 'Người dùng', avatar: null };
  }
}

export async function sendSystemMessage(
  convId: string,
  content: string,
  memberIds: string[],
  actorId?: string,
): Promise<void> {
  const messagesRef = ref(rtdb, `messages/${convId}`);
  const newMsgRef = push(messagesRef);
  const messageId = newMsgRef.key;

  const now = Date.now();
  const updates: Record<string, any> = {};

  updates[`messages/${convId}/${messageId}`] = {
    senderId: 'system',
    type: 'system',
    content,
    createdAt: now,
    updatedAt: now,
  };

  updates[`conversations/${convId}/lastMessage`] = {
    senderId: 'system',
    content,
    type: 'system',
    timestamp: now,
    messageId,
  };
  updates[`conversations/${convId}/updatedAt`] = now;

  memberIds.forEach((uid) => {
    updates[`user_chats/${uid}/${convId}/lastMsgTimestamp`] = now;
    updates[`user_chats/${uid}/${convId}/updatedAt`] = now;

    if (actorId && uid === actorId) {
      updates[`user_chats/${uid}/${convId}/lastReadMsgId`] = messageId;
      updates[`user_chats/${uid}/${convId}/unreadCount`] = 0;
    }
  });

  await update(ref(rtdb), updates);
}

export const groupSystemMessages = {
  CREATE_GROUP: (actor: string) => `${actor} đã tạo nhóm`,
  ADD_MEMBERS: (actor: string, target: string) => `${actor} đã thêm ${target} vào nhóm`,
  REMOVE_MEMBER: (actor: string, target: string) => `${actor} đã xóa ${target} khỏi nhóm`,
  LEAVE_GROUP: (actor: string) => `${actor} đã rời nhóm`,
  DISBAND_GROUP: () => `Nhóm đã giải tán`,
  CHANGE_ADMIN_ROLE: (actor: string, target: string) =>
    `${actor} đã chuyển quyền quản trị cho ${target}`,
  PROMOTE_TO_ADMIN: (actor: string, target: string) =>
    `${actor} đã thăng ${target} làm quản trị viên`,
  DEMOTE_FROM_ADMIN: (actor: string, target: string) =>
    `${actor} đã hạ quyền quản trị viên của ${target}`,
  UPDATE_GROUP_NAME: (actor: string, name: string) => `${actor} đã đổi tên nhóm thành "${name}"`,
  UPDATE_GROUP_AVATAR: (actor: string) => `${actor} đã cập nhật ảnh nhóm`,
  UPDATE_GROUP_BOTH: (actor: string, name: string) =>
    `${actor} đã cập nhật ảnh nhóm và đổi tên nhóm thành "${name}"`,
  INVITE_PENDING: (actor: string, target: string) =>
    `${actor} đã mời ${target} vào nhóm (chờ duyệt)`,
  APPROVE_MEMBER: (actor: string, target: string) => `${actor} đã chấp nhận ${target} vào nhóm`,
  REJECT_MEMBER: (actor: string, target: string) => `${actor} đã từ chối ${target}`,
  TOGGLE_APPROVAL_ON: (actor: string) => `${actor} đã bật chế độ phê duyệt thành viên`,
  TOGGLE_APPROVAL_OFF: (actor: string) =>
    `${actor} đã tắt chế độ phê duyệt. Tất cả thành viên chờ đã được chấp nhận`,
  TRANSFER_CREATOR: (actor: string, target: string) =>
    `${actor} đã chuyển quyền trưởng nhóm cho ${target}`,
  JOIN_BY_LINK: (actor: string) => `${actor} đã tham gia nhóm qua link`,
  REQUEST_JOIN_BY_LINK: (actor: string) => `${actor} đã gửi yêu cầu tham gia nhóm qua link`,
};
