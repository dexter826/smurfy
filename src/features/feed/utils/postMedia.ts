import { toast } from '@/store/toastStore';
import { TOAST_MESSAGES } from '@/constants';
import { MEDIA_CONSTRAINTS } from '@/constants';
import { MediaObject } from '@shared/types';
import { validateFile } from '@/utils';

export interface MediaPreview {
  url: string;
  type: 'image' | 'video';
}

export interface ProcessPostFilesResult {
  files: File[];
  previews: MediaPreview[];
}

/** Chuẩn hóa danh sách tệp chọn thêm vào bài viết theo giới hạn media. */
export function processPostFiles(
  files: File[],
  existingMedia: MediaObject[],
  pendingFiles: File[],
): ProcessPostFilesResult | null {
  if (files.length === 0) return null;

  const validFiles: File[] = [];
  const newPreviews: MediaPreview[] = [];

  files.forEach((file) => {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    if (!isImage && !isVideo) {
      toast.error(`Không hỗ trợ định dạng file của "${file.name}"`);
      return;
    }
    const validation = validateFile(file, isImage ? 'IMAGE' : 'VIDEO');
    if (validation.isValid) {
      validFiles.push(file);
      newPreviews.push({ url: URL.createObjectURL(file), type: isImage ? 'image' : 'video' });
    } else if (validation.error) {
      toast.error(validation.error);
    }
  });

  if (validFiles.length === 0) return null;

  const currentTotal = existingMedia.length + pendingFiles.length;
  const remainingSlots = MEDIA_CONSTRAINTS.MAX_IMAGES_PER_POST - currentTotal;
  if (remainingSlots <= 0) {
    toast.error(TOAST_MESSAGES.FEED.MEDIA_LIMIT(MEDIA_CONSTRAINTS.MAX_IMAGES_PER_POST));
    return null;
  }

  const existingVideoCount =
    existingMedia.filter((m) => m.mimeType.startsWith('video/')).length +
    pendingFiles.filter((f) => f.type.startsWith('video/')).length;
  const remainingVideoSlots = MEDIA_CONSTRAINTS.MAX_VIDEOS_PER_POST - existingVideoCount;
  const newVideos = validFiles.filter((f) => f.type.startsWith('video/'));

  let processedFiles = validFiles;
  let processedPreviews = newPreviews;

  if (newVideos.length > 0 && remainingVideoSlots <= 0) {
    toast.error(TOAST_MESSAGES.FEED.VIDEO_LIMIT(MEDIA_CONSTRAINTS.MAX_VIDEOS_PER_POST));
    processedFiles = validFiles.filter((f) => !f.type.startsWith('video/'));
    processedPreviews = newPreviews.filter((p) => p.type !== 'video');
  } else if (newVideos.length > remainingVideoSlots) {
    toast.error(TOAST_MESSAGES.FEED.VIDEO_LIMIT(MEDIA_CONSTRAINTS.MAX_VIDEOS_PER_POST));
    let videosAdded = 0;
    const tempFiles: File[] = [];
    const tempPreviews: MediaPreview[] = [];
    processedFiles.forEach((f, i) => {
      if (f.type.startsWith('video/')) {
        if (videosAdded < remainingVideoSlots) {
          tempFiles.push(f);
          tempPreviews.push(processedPreviews[i]);
          videosAdded++;
        } else URL.revokeObjectURL(processedPreviews[i].url);
      } else {
        tempFiles.push(f);
        tempPreviews.push(processedPreviews[i]);
      }
    });
    processedFiles = tempFiles;
    processedPreviews = tempPreviews;
  }

  if (processedFiles.length === 0) return null;

  let filesToAdd = processedFiles;
  if (processedFiles.length > remainingSlots) {
    toast.error(TOAST_MESSAGES.FEED.MEDIA_LIMIT(MEDIA_CONSTRAINTS.MAX_IMAGES_PER_POST));
    processedPreviews.slice(remainingSlots).forEach((p) => URL.revokeObjectURL(p.url));
    filesToAdd = processedFiles.slice(0, remainingSlots);
    processedPreviews = processedPreviews.slice(0, remainingSlots);
  }

  return { files: filesToAdd, previews: processedPreviews };
}
