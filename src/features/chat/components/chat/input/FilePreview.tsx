import React from 'react';
import { X } from 'lucide-react';
import { CircularProgressOverlay } from '@/components/ui/CircularProgress';

export interface FilePreviewItem {
  id: string;
  file: File;
  preview?: string;
  type: 'image';
  uploadProgress?: number;
}

interface FilePreviewProps {
  files: FilePreviewItem[];
  onRemove: (index: number) => void;
  isSending: boolean;
  onPreviewMedia?: (index: number) => void;
}

/** Hiển thị danh sách ảnh đính kèm trước khi gửi */
export const FilePreview: React.FC<FilePreviewProps> = ({
  files,
  onRemove,
  isSending,
  onPreviewMedia,
}) => {
  if (files.length === 0) return null;

  return (
    <div className="px-3 pt-3 pb-3 border-b border-border bg-surface overflow-x-auto scroll-hide">
      <div className="flex gap-3">
        {files.map((item, index) => (
          <div key={item.id} className="relative flex-shrink-0 group">
            <div
              className={`w-[72px] h-[72px] rounded-md border overflow-hidden transition-all duration-200 bg-background border-border ${
                onPreviewMedia ? 'cursor-pointer hover:brightness-95' : ''
              }`}
              onClick={() => onPreviewMedia?.(index)}
            >
              {item.preview && (
                <img src={item.preview} alt="" className="w-full h-full object-cover" />
              )}

              {isSending && (
                <CircularProgressOverlay
                  isVisible
                  progress={item.uploadProgress ?? 0}
                  size={32}
                  showPercentage={false}
                />
              )}
            </div>

            {!isSending && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute -top-1.5 -right-1.5 w-6 h-6 flex items-center justify-center bg-white dark:bg-surface-sunken text-foreground rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 hover:bg-hover transform hover:scale-105 border border-border"
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
