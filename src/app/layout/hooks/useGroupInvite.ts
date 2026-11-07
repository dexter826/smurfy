import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '../../../store';
import { TOAST_MESSAGES } from '../../../constants';
import { useAuthStore } from '@/features/auth';
import { useRtdbChatStore } from '../../../store';
import { useUserCache } from '../../../store/userCacheStore';

interface InviteInfo {
  token: string | null;
  info: any | null;
  isFetching: boolean;
  isJoining?: boolean;
}

interface UseGroupInviteResult {
  invite: InviteInfo;
  closeInvite: () => void;
}

export const useGroupInvite = (): UseGroupInviteResult => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const { conversations, globalInviteInfo, setGlobalInviteInfo, fetchGroupInviteInfo } =
    useRtdbChatStore();
  const processedTokensRef = useRef<Set<string>>(new Set());

  const processToken = async (token: string) => {
    setGlobalInviteInfo({ token, isFetching: true });
    try {
      const info = await fetchGroupInviteInfo(token);
      if (info.status !== 'success') {
        toast.error(TOAST_MESSAGES.GROUP.INVALID_LINK);
        setGlobalInviteInfo({ token: null, info: null, isFetching: false });
        return;
      }
      const existingConv = conversations.find((c) => c.id === info.convId);
      const userCache = useUserCache.getState().users;
      const resolvedMembers =
        info.members ||
        (existingConv
          ? Object.keys(existingConv.data.members || {}).map((uid) => ({
              id: uid,
              fullName: userCache[uid]?.fullName || '...',
              avatar: userCache[uid]?.avatar,
            }))
          : undefined);

      if (info.isMember) {
        toast.info(TOAST_MESSAGES.GROUP.ALREADY_MEMBER);
        setGlobalInviteInfo({ token: null, info: null, isFetching: false });
        navigate(`/?conv=${info.convId}`, { replace: true });
        return;
      }
      setGlobalInviteInfo({
        token,
        info: { ...info, members: resolvedMembers as any[] },
        isFetching: false,
      });
    } catch {
      toast.error(TOAST_MESSAGES.GROUP.FETCH_INFO_FAILED);
      setGlobalInviteInfo({ token: null, info: null, isFetching: false });
    }
  };

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor || !anchor.href) return;

      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin || !url.pathname.startsWith('/join/')) return;

      const token = url.pathname.split('/join/')[1];
      if (!token) return;

      e.preventDefault();
      e.stopImmediatePropagation();
      processedTokensRef.current.delete(token);
      processToken(token);
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => document.removeEventListener('click', handleGlobalClick, true);
  }, [navigate, fetchGroupInviteInfo, setGlobalInviteInfo]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const joinToken = searchParams.get('joinToken');

    if (
      joinToken &&
      user &&
      !globalInviteInfo.token &&
      !processedTokensRef.current.has(joinToken)
    ) {
      processToken(joinToken);
    }
  }, [
    location.search,
    user,
    globalInviteInfo.token,
    fetchGroupInviteInfo,
    setGlobalInviteInfo,
    conversations,
  ]);

  const closeInvite = () => {
    if (globalInviteInfo.token) {
      processedTokensRef.current.add(globalInviteInfo.token);
    }
    setGlobalInviteInfo({ token: null, info: null });
    const params = new URLSearchParams(location.search);
    if (params.has('joinToken')) {
      params.delete('joinToken');
      const newSearch = params.toString();
      navigate(location.pathname + (newSearch ? `?${newSearch}` : ''), { replace: true });
    }
  };

  return { invite: globalInviteInfo, closeInvite };
};
