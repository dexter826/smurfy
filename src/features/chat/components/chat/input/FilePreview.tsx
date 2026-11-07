import React from 'react';
import {
  X,
  Play,
  Pause,
  Paperclip,
  Video,
  FileText,
  Archive,
  FileCode,
  FileType,
} from 'lucide-react';
import { CircularProgressOverlay } from '@/components/ui/CircularProgress';

export interface FilePreviewItem {
  id: string;
  file: File;
  preview?: string;
  type: 'image' | 'video' | 'file' | 'voice';
  uploadProgress?: number;
  duration?: number;
}

interface FilePreviewProps {
  files: FilePreviewItem[];
  onRemove: (index: number) => void;
  onPlayVoice?: (url: string, index: number) => void;
  playingIndex: number | null;
  isSending: boolean;
  onPreviewMedia?: (index: number) => void;
}

const getFileStyle = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';

  const baseStyles: Record<string, any> = {
    pdf: {
      icon: <FileText size={20} />,
      color: 'text-danger',
      bg: 'bg-danger-soft',
      border: 'border-danger/20',
      label: 'PDF',
    },
    doc: {
      icon: <FileText size={20} />,
      color: 'text-info',
      bg: 'bg-info-soft',
      border: 'border-info/20',
      label: 'DOC',
    },
    xlsx: {
      icon: <FileType size={20} />,
      color: 'text-success',
      bg: 'bg-success-soft',
      border: 'border-success/20',
      label: 'SHEET',
    },
    zip: {
      icon: <Archive size={20} />,
      color: 'text-warning',
      bg: 'bg-warning-soft',
      border: 'border-warning/20',
      label: 'ARCH',
    },
    code: {
      icon: <FileCode size={20} />,
      color: 'text-primary-strong',
      bg: 'bg-primary-soft',
      border: 'border-primary/20',
      label: 'CODE',
    },
  };

  if (['pdf'].includes(ext)) return baseStyles.pdf;
  if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) return baseStyles.doc;
  if (['xls', 'xlsx', 'csv'].includes(ext)) return baseStyles.xlsx;
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return baseStyles.zip;
  if (['js', 'ts', 'jsx', 'tsx', 'html', 'css', 'json', 'py', 'go'].includes(ext))
    return baseStyles.code;

  return {
    icon: <Paperclip size={20} />,
    color: 'text-muted',
    bg: 'bg-surface-sunken',
    border: 'border-border',
    label: ext.toUpperCase().slice(0, 4) || 'FILE',
  };
};

/** Hiển thị danh sách tệp đính kèm trước khi gửi */
export const FilePreview: React.FC<FilePreviewProps> = ({
  files,
  onRemove,
  onPlayVoice,
  playingIndex,
  isSending,
  onPreviewMedia,
}) => {
  if (files.length === 0) return null;

  return (
    <div className="px-3 pt-3 pb-3 border-b border-border bg-surface overflow-x-auto scroll-hide">
      <div className="flex gap-3">
        {files.map((item, index) => {
          const fileStyle = item.type === 'file' ? getFileStyle(item.file.name) : null;

          return (
            <div key={item.id} className="relative flex-shrink-0 group">
              <div
                className={`w-[72px] h-[72px] rounded-md border overflow-hidden transition-all duration-200
                  ${item.type === 'file' ? `${fileStyle?.bg} ${fileStyle?.border}` : 'bg-background border-border'}
                  ${(item.type === 'image' || item.type === 'video') && onPreviewMedia ? 'cursor-pointer hover:brightness-95' : ''}`}
                onClick={() => {
                  if ((item.type === 'image' || item.type === 'video') && onPreviewMedia) {
                    onPreviewMedia(index);
                  }
                }}
              >
                {item.preview ? (
                  item.type === 'video' ? (
                    <div className="w-full h-full relative">
                      <video
                        src={item.preview}
                        className="w-full h-full object-cover"
                        playsInline
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Video size={18} className="text-white" />
                      </div>
                    </div>
                  ) : item.type === 'voice' ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 p-2 relative bg-primary-soft border-primary-edge">
                      <button
                        type="button"
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border shadow-sm
                          ${playingIndex === index ? 'bg-primary text-on-primary border-primary' : 'bg-surface text-primary-strong border-primary-edge'}`}
                        onClick={() => item.preview && onPlayVoice(item.preview, index)}
                      >
                        {playingIndex === index ? (
                          <Pause size={14} fill="currentColor" />
                        ) : (
                          <Play size={14} fill="currentColor" className="ml-0.5" />
                        )}
                      </button>
                      <div className="flex items-center justify-center">
                        {item.duration !== undefined && (
                          <div className="text-caption font-bold text-primary-strong bg-primary-soft px-2 py-0.5 rounded-full">
                            {Math.floor(item.duration / 60)}:
                            {String(item.duration % 60).padStart(2, '0')}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <img src={item.preview} alt="" className="w-full h-full object-cover" />
                  )
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 p-2 relative">
                    <div className={`${fileStyle?.color}`}>{fileStyle?.icon}</div>
                    <div
                      className={`text-caption font-bold px-1.5 py-0.5 rounded-sm bg-surface/70 ${fileStyle?.color}`}
                    >
                      {fileStyle?.label}
                    </div>
                  </div>
                )}

                {isSending && (item.type === 'image' || item.type === 'video') && (
                  <CircularProgressOverlay
                    isVisible
                    progress={item.uploadProgress ?? 0}
                    size={32}
                    showPercentage={false}
                  />
                )}
              </div>

              {/* File Name Display Below */}
              {item.type === 'file' && (
                <div className="mt-1.5 px-0.5">
                  <p className="text-caption text-secondary font-medium truncate w-[72px] text-center">
                    {item.file.name}
                  </p>
                </div>
              )}

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
          );
        })}
      </div>
    </div>
  );
};
