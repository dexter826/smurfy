import React, { useState, useEffect } from 'react';
import { Ban, MessageCircle, EyeOff, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { SlideUpSheet } from './SlideUpSheet';
import { BlockOptions } from '@shared/types';
import { useContactStore } from '@/features/friend';
import { isFullyBlocked } from '@/lib/block/blockUtils';

interface BlockOptionsModalProps {
  open: boolean;
  targetId: string;
  targetName: string;
  initialOptions?: Partial<BlockOptions>;
  onApply: (options: BlockOptions) => Promise<void>;
  onUnblock?: () => Promise<void>;
  onOpenChange: () => void;
}

const DEFAULT_OPTIONS: BlockOptions = {
  blockMessages: false,
  blockViewMyActivity: false,
  hideTheirActivity: false,
};

export const BlockOptionsModal: React.FC<BlockOptionsModalProps> = ({
  open,
  targetId,
  targetName,
  initialOptions,
  onApply,
  onUnblock,
  onOpenChange,
}) => {
  const friends = useContactStore((state) => state.friends);
  const isFriend = React.useMemo(() => friends.some((f) => f.id === targetId), [friends, targetId]);
  const [options, setOptions] = useState<BlockOptions>(DEFAULT_OPTIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [isActivityExpanded, setIsActivityExpanded] = useState(false);

  useEffect(() => {
    if (open) {
      setOptions({
        blockMessages: initialOptions?.blockMessages ?? false,
        blockViewMyActivity: initialOptions?.blockViewMyActivity ?? false,
        hideTheirActivity: initialOptions?.hideTheirActivity ?? false,
      });
      setIsActivityExpanded(
        (initialOptions?.blockViewMyActivity ?? false) ||
          (initialOptions?.hideTheirActivity ?? false),
      );
    }
  }, [open, initialOptions]);

  const toggleOption = (key: keyof BlockOptions) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApply = async () => {
    setIsLoading(true);
    try {
      const allFalse =
        !options.blockMessages && !options.blockViewMyActivity && !options.hideTheirActivity;
      if (allFalse && onUnblock) {
        await onUnblock();
      } else {
        await onApply(options);
      }
      onOpenChange();
    } finally {
      setIsLoading(false);
    }
  };

  const renderOption = (
    key: keyof BlockOptions,
    icon: React.ReactNode,
    label: string,
    desc: string,
    isNested = false,
  ) => {
    const isActive = options[key];
    return (
      <div
        key={key}
        className={`flex items-start gap-4 p-4 cursor-pointer transition-all duration-200 ${
          isNested ? '' : 'rounded-card border-2'
        } ${
          isActive
            ? isNested
              ? 'bg-danger/5'
              : 'bg-danger/5 border-danger/40 ring-1 ring-danger/20'
            : isNested
              ? 'hover:bg-canvas/50'
              : 'border-canvas hover:border-line'
        }`}
        onClick={() => toggleOption(key)}
      >
        <div className="pt-0.5">
          <div
            className={`w-5 h-5 rounded-[4px] border-2 flex items-center justify-center transition-colors ${
              isActive ? 'border-danger bg-danger text-on-danger' : 'border-line-strong'
            }`}
          >
            {isActive && (
              <svg viewBox="0 0 12 10" width="10" height="10" fill="none">
                <path
                  d="M1 5l3.5 3.5L11 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`flex items-center gap-2 font-bold text-sm ${isActive ? 'text-danger' : 'text-ink'}`}
          >
            {icon}
            <span>{label}</span>
          </div>
          <p className="text-xs text-ink-2 mt-1 leading-relaxed">{desc}</p>
        </div>
      </div>
    );
  };

  return (
    <SlideUpSheet
      open={open}
      onOpenChange={onOpenChange}
      title={`Quản lý chặn ${targetName}`}
      footer={
        <>
          <Button variant="secondary" onClick={onOpenChange} className="flex-1 font-semibold h-11">
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={handleApply}
            isLoading={isLoading}
            className="flex-1 font-bold h-11"
          >
            Xác nhận
          </Button>
        </>
      }
    >
      <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
        <div className="w-9 h-9 rounded-control bg-danger/10 flex items-center justify-center flex-shrink-0">
          <Ban size={18} className="text-danger" />
        </div>
        <p className="text-sm text-ink-3">Chọn các hạn chế muốn áp dụng</p>
      </div>

      <div className="px-5 py-4 space-y-2.5 max-h-[60vh] overflow-y-auto overscroll-contain">
        {renderOption(
          'blockMessages',
          <MessageCircle size={15} />,
          'Chặn tin nhắn',
          'Người này không thể gửi tin nhắn cho bạn.',
        )}

        <div
          className={`border-2 rounded-card overflow-hidden transition-all duration-200 ${
            options.blockViewMyActivity || options.hideTheirActivity
              ? 'border-danger/40 ring-1 ring-danger/20'
              : 'border-canvas hover:border-line'
          }`}
        >
          <div
            className={`flex items-start gap-4 p-4 cursor-pointer transition-colors ${
              options.blockViewMyActivity && options.hideTheirActivity
                ? 'bg-danger/5'
                : 'bg-surface hover:bg-canvas/50'
            }`}
            onClick={() => {
              const newValue = !(options.blockViewMyActivity && options.hideTheirActivity);
              setOptions((prev) => ({
                ...prev,
                blockViewMyActivity: newValue,
                hideTheirActivity: newValue,
              }));
              if (newValue) setIsActivityExpanded(true);
            }}
          >
            <div className="pt-0.5">
              <div
                className={`w-5 h-5 rounded-[4px] border-2 flex items-center justify-center transition-colors ${
                  options.blockViewMyActivity && options.hideTheirActivity
                    ? 'border-danger bg-danger text-on-danger'
                    : 'border-line-strong'
                }`}
              >
                {options.blockViewMyActivity && options.hideTheirActivity && (
                  <svg viewBox="0 0 12 10" width="10" height="10" fill="none">
                    <path
                      d="M1 5l3.5 3.5L11 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {(!options.blockViewMyActivity || !options.hideTheirActivity) &&
                  (options.blockViewMyActivity || options.hideTheirActivity) && (
                    <div className="w-2 h-0.5 bg-danger rounded-full" />
                  )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`flex items-center gap-2 font-bold text-sm ${options.blockViewMyActivity || options.hideTheirActivity ? 'text-danger' : 'text-ink'}`}
              >
                <EyeOff size={15} />
                <span>Chặn và ẩn nhật ký</span>
              </div>
              <p className="text-xs text-ink-2 mt-1 leading-relaxed">
                Quản lý quyền xem bài viết và hoạt động
              </p>
            </div>
            <div
              className="pt-1 px-2 -mr-2"
              onClick={(e) => {
                e.stopPropagation();
                setIsActivityExpanded(!isActivityExpanded);
              }}
            >
              <ChevronDown
                size={18}
                className={`text-ink-3 transition-transform duration-200 ${isActivityExpanded ? 'rotate-180' : ''}`}
              />
            </div>
          </div>

          {isActivityExpanded && (
            <div className="border-t border-line bg-surface">
              {renderOption(
                'blockViewMyActivity',
                <EyeOff size={15} />,
                'Chặn xem bài đăng của tôi',
                'Người này sẽ không xem được bài đăng của bạn.',
                true,
              )}
              <div className="h-px bg-line mx-4" />
              {renderOption(
                'hideTheirActivity',
                <EyeOff size={15} />,
                'Ẩn hoạt động của người này',
                'Bạn sẽ không thấy bài đăng của người này.',
                true,
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cảnh báo hủy kết bạn (Tối giản) */}
      {isFriend && isFullyBlocked(options) && (
        <div className="px-6 py-2 bg-danger/5 border-t border-danger/10 animate-fade-in">
          <p className="text-caption text-danger/80 text-center font-medium">
            Lưu ý: Việc áp dụng tất cả các hạn chế sẽ đồng thời{' '}
            <span className="font-bold">hủy kết bạn</span>.
          </p>
        </div>
      )}
    </SlideUpSheet>
  );
};
