import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Users, ShieldCheck, Clock, Info, ChevronLeft } from 'lucide-react';

import { Button, Loading, Avatar } from '@/components/ui';
import { useAuthStore } from '@/features/auth';
import { useChat } from '@/hooks';
import { toast } from '@/store/toastStore';
import { TOAST_MESSAGES } from '@/constants';

const JoinGroupPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ token: string }>();
  const hasHandledRef = useRef(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [groupInfo, setGroupInfo] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const { user, isInitialized } = useAuthStore();
  const { fetchGroupInviteInfo, handleSelectConversation, handleJoinGroupByLink } = useChat();

  const token = params.token || '';

  useEffect(() => {
    if (!isInitialized || hasHandledRef.current) return;

    if (!token) {
      hasHandledRef.current = true;
      setErrorText(TOAST_MESSAGES.GROUP.INVALID_LINK);
      return;
    }

    const loadGroupInfo = async () => {
      setIsFetching(true);
      try {
        const info = await fetchGroupInviteInfo(token);
        if (info.status === 'success') {
          if (info.isMember) {
            toast.info(TOAST_MESSAGES.GROUP.ALREADY_MEMBER);
            handleSelectConversation(info.convId!);
            navigate(`/?conv=${info.convId}`, { replace: true });
            return;
          }
          setGroupInfo(info);
        } else {
          const msgs = {
            disbanded: TOAST_MESSAGES.GROUP.DISBANDED,
            invalid: TOAST_MESSAGES.GROUP.INVALID_LINK,
          };
          setErrorText(msgs[info.status as keyof typeof msgs] || TOAST_MESSAGES.GROUP.INVALID_LINK);
        }
      } catch {
        setErrorText(TOAST_MESSAGES.GROUP.FETCH_INFO_FAILED);
      } finally {
        setIsFetching(false);
        hasHandledRef.current = true;
      }
    };

    loadGroupInfo();
  }, [
    isInitialized,
    token,
    user,
    navigate,
    location,
    fetchGroupInviteInfo,
    handleSelectConversation,
  ]);

  useEffect(() => {
    const pendingToken = sessionStorage.getItem('pending_join_token');
    if (user && pendingToken === token && groupInfo && !isJoining) {
      sessionStorage.removeItem('pending_join_token');
      handleJoin();
    }
  }, [user, groupInfo, token]);

  const handleJoin = async () => {
    if (!user) {
      sessionStorage.setItem('pending_join_token', token);
      navigate('/login', {
        state: { redirectTo: `${location.pathname}${location.search}` },
      });
      return;
    }

    setIsJoining(true);
    try {
      const result: any = await handleJoinGroupByLink(token);
      if (result.status === 'joined') {
        toast.success(TOAST_MESSAGES.GROUP.JOIN_SUCCESS(groupInfo?.name || ''));
        handleSelectConversation(result.convId);
        navigate(`/?conv=${result.convId}`, { replace: true });
      } else if (result.status === 'already_member') {
        toast.info(TOAST_MESSAGES.GROUP.ALREADY_MEMBER);
        handleSelectConversation(result.convId);
        navigate(`/?conv=${result.convId}`, { replace: true });
      } else if (result.status === 'pending') {
        toast.info(TOAST_MESSAGES.GROUP.PENDING_APPROVAL);
        navigate('/', { replace: true });
      }
    } catch (err) {
      toast.error(TOAST_MESSAGES.GROUP.JOIN_FAILED);
    } finally {
      setIsJoining(false);
    }
  };

  if (!isInitialized || isFetching || (!hasHandledRef.current && !errorText)) {
    return <Loading variant="page" text="Đang kiểm tra thông tin nhóm..." />;
  }

  const renderContent = () => {
    if (errorText) {
      return (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-danger/10 rounded-card flex items-center justify-center mx-auto text-danger shadow-sm border border-danger/5">
            <Info size={40} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-ink">Không thể tham gia nhóm</h1>
            <p className="text-sm text-ink-2 leading-relaxed px-4">{errorText}</p>
          </div>
          <Button
            onClick={() => navigate('/', { replace: true })}
            variant="secondary"
            fullWidth
            size="lg"
            icon={<ChevronLeft size={18} />}
          >
            Về trang chủ
          </Button>
        </div>
      );
    }

    if (groupInfo) {
      return (
        <div className="text-center space-y-8">
          <div className="flex flex-col items-center space-y-5">
            <Avatar
              src={groupInfo.avatar}
              name={groupInfo.name}
              size="2xl"
              isGroup={true}
              members={groupInfo.members}
            />

            <div className="space-y-2.5">
              <h1 className="text-3xl font-extrabold text-ink tracking-tight line-clamp-2">
                {groupInfo.name}
              </h1>
              <div className="flex items-center justify-center gap-5 text-sm font-semibold">
                <div className="flex items-center gap-1.5 text-ink-2 bg-surface-2 px-3 py-1.5 rounded-full border border-line">
                  <Users size={16} className="text-accent" />
                  <span>{groupInfo.memberCount} thành viên</span>
                </div>
                {groupInfo.joinApprovalMode ? (
                  <div className="flex items-center gap-1.5 text-warning bg-warning-soft px-3 py-1.5 rounded-full border border-warning/20">
                    <Clock size={16} />
                    <span>Cần xét duyệt</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-success bg-success-soft px-3 py-1.5 rounded-full border border-success/20">
                    <ShieldCheck size={16} />
                    <span>Tham gia ngay</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              onClick={handleJoin}
              fullWidth
              size="lg"
              className="h-14 text-base shadow-card"
              isLoading={isJoining}
            >
              {!user
                ? 'Đăng nhập để tham gia'
                : groupInfo.isPending
                  ? 'Xem trạng thái yêu cầu'
                  : isJoining
                    ? 'Đang tham gia...'
                    : 'Tham gia ngay'}
            </Button>
            <Button variant="ghost" onClick={() => navigate('/')} fullWidth size="lg">
              Bỏ qua
            </Button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-[100dvh] bg-canvas selection:bg-accent/20 flex flex-col">
      <header className="h-14 flex-shrink-0 bg-surface border-b border-line flex items-center px-4 gap-3">
        <img src="/logo.svg" alt="Smurfy" className="h-8 w-8 object-contain" />
        <span className="font-display font-extrabold text-ink">Smurfy</span>
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-6 animate-fade-in">
        <div className="w-full max-w-[480px]">{renderContent()}</div>
      </main>
    </div>
  );
};

export default JoinGroupPage;
