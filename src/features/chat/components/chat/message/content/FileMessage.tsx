import React from 'react';
import {
  FileText,
  Download,
  FileVideo,
  Archive,
  FileCode,
  FileType,
  Paperclip,
} from 'lucide-react';
import { RtdbMessage } from '@shared/types';
import { LazyImage, LazyVideo, CircularProgress, CircularProgressOverlay } from '@/components/ui';
import { downloadFile } from '@/utils';

interface FileMessageProps {
  message: { id: string; data: RtdbMessage };
  isMe: boolean;
  uploadProgress?: { progress: number; error?: boolean; localUrls?: string[] };
  onOpenImage: (index: number) => void;
}

const getFileStyle = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  const baseStyles: Record<string, any> = {
    pdf: {
      icon: <FileText size={18} />,
      color: 'text-danger',
      bg: 'bg-danger-soft',
      border: 'border-danger/20',
      label: 'PDF',
    },
    doc: {
      icon: <FileText size={18} />,
      color: 'text-info',
      bg: 'bg-info-soft',
      border: 'border-info/20',
      label: 'DOC',
    },
    xlsx: {
      icon: <FileType size={18} />,
      color: 'text-success',
      bg: 'bg-success-soft',
      border: 'border-success/20',
      label: 'SHEET',
    },
    zip: {
      icon: <Archive size={18} />,
      color: 'text-warning',
      bg: 'bg-warning-soft',
      border: 'border-warning/20',
      label: 'ARCH',
    },
    code: {
      icon: <FileCode size={18} />,
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
    icon: <Paperclip size={18} />,
    color: 'text-muted',
    bg: 'bg-surface-sunken',
    border: 'border-border',
    label: ext.toUpperCase().slice(0, 4) || 'FILE',
  };
};

export const FileMessage: React.FC<FileMessageProps> = ({
  message,
  isMe,
  uploadProgress,
  onOpenImage,
}) => {
  const fileData = message.data.media?.[0];
  const isUploading = isMe && uploadProgress && uploadProgress.progress < 100;

  const fileUrl =
    isUploading && uploadProgress?.localUrls?.[0]
      ? uploadProgress.localUrls[0]
      : fileData?.url || '';

  const fileName = fileData?.fileName || 'Tài liệu';
  const fileMime = fileData?.mimeType || '';
  const fileSize = fileData?.size ? `${(fileData.size / 1024).toFixed(1)} KB` : 'N/A';

  const isImageFile = fileMime.startsWith('image/');
  const isVideoFile = fileMime.startsWith('video/');
  const fileStyle = getFileStyle(fileName);

  // Removed bg, border, padding, and timestamp since MessageBubble wraps it
  const containerClass = `flex flex-col gap-2 transition-all duration-200 min-w-[200px] w-full max-w-[320px]`;

  return (
    <div className={containerClass}>
      {(isImageFile || isVideoFile) && fileUrl && (
        <div
          className="rounded-md overflow-hidden cursor-pointer bg-black/5 aspect-video flex items-center justify-center group relative shadow-inner mb-1"
          onClick={() => (isImageFile ? onOpenImage(0) : undefined)}
        >
          {isImageFile ? (
            <LazyImage src={fileUrl} alt={fileName} className="w-full h-full object-cover" />
          ) : (
            <div className="relative w-full h-full">
              <LazyVideo
                src={fileUrl}
                className="w-full h-full object-cover"
                muted={isUploading}
                controls={!isUploading}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 pointer-events-none">
                <div className="w-11 h-11 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg transition-transform active:scale-95 group-hover:bg-white/40">
                  <FileVideo size={22} className="text-white" />
                </div>
              </div>
            </div>
          )}
          {isUploading && (
            <CircularProgressOverlay isVisible progress={uploadProgress!.progress} size="md" />
          )}
        </div>
      )}

      {/* File Info & Progress */}
      <div className="flex items-center gap-3 relative">
        <div className="relative">
          <div
            className={`w-12 h-12 flex-shrink-0 flex flex-col items-center justify-center rounded-md border ${fileStyle.bg} ${fileStyle.color} ${fileStyle.border}`}
          >
            {fileStyle.icon}
            <span className="text-[8px] font-bold mt-0.5 opacity-80 uppercase tracking-tighter">
              {fileStyle.label}
            </span>
          </div>
          {isUploading && !fileUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-surface/80 rounded-md backdrop-blur-[1px]">
              <CircularProgress
                progress={uploadProgress!.progress}
                size="sm"
                showPercentage={false}
              />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div
            className="font-bold truncate text-sm text-foreground mb-0.5 leading-tight hover:underline cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (fileUrl && !isUploading) downloadFile(fileUrl, fileName);
            }}
          >
            {fileName}
          </div>
          <div className="flex items-center gap-1.5 text-caption font-bold text-muted uppercase tracking-tight">
            <span className={isMe ? 'text-on-primary/70' : 'text-muted'}>{fileSize}</span>
            {isUploading && (
              <>
                <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                <span className="text-primary font-bold">
                  Đang tải {Math.round(uploadProgress!.progress)}%
                </span>
              </>
            )}
          </div>
        </div>

        {!isUploading && fileUrl ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              downloadFile(fileUrl, fileName);
            }}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 active:scale-90 border shadow-sm ${
              isMe
                ? 'bg-on-primary/10 hover:bg-on-primary/20 text-on-primary border-on-primary/20'
                : 'bg-primary-soft hover:bg-primary/20 text-primary-strong border-primary/20'
            }`}
            title="Tải về"
          >
            <Download size={16} />
          </button>
        ) : (
          isUploading && (
            <div className="w-9 h-9 flex items-center justify-center">
              <CircularProgress
                progress={uploadProgress!.progress}
                size="sm"
                showPercentage={false}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};
