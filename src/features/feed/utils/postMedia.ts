import { toast } from '@/store/toastStore';
import { TOAST_MESSAGES } from '@/constants';
import { MEDIA_CONSTRAINTS } from '@/constants';
import { MediaObject } from '@shared/types';
import { validateFile } from '@/utils';

export interface MediaPreview {
  url: string;
  type: 'image';
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
    if (!isImage) {
      toast.error(`Không hỗ trợ định dạng file của "${file.name}"`);
      return;
    }
    const validation = validateFile(file, 'IMAGE');
    if (validation.isValid) {
      validFiles.push(file);
      newPreviews.push({ url: URL.createObjectURL(file), type: 'image' });
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

  let filesToAdd = validFiles;
  let processedPreviews = newPreviews;
  if (validFiles.length > remainingSlots) {
    toast.error(TOAST_MESSAGES.FEED.MEDIA_LIMIT(MEDIA_CONSTRAINTS.MAX_IMAGES_PER_POST));
    processedPreviews.slice(remainingSlots).forEach((p) => URL.revokeObjectURL(p.url));
    filesToAdd = validFiles.slice(0, remainingSlots);
    processedPreviews = processedPreviews.slice(0, remainingSlots);
  }

  return { files: filesToAdd, previews: processedPreviews };
}
