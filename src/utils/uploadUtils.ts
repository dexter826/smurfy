import { FILE_LIMITS, FileLimitType, TOAST_MESSAGES } from '../constants';

// Kiểm tra dung lượng và loại file hợp lệ
export const validateFile = (file: File, type: FileLimitType): { isValid: boolean; error?: string } => {
  const limit = FILE_LIMITS[type] || 5 * 1024 * 1024;
  
  // Chỉ chấp nhận hình ảnh
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    return {
      isValid: false,
      error: TOAST_MESSAGES.MEDIA.INVALID_FILE
    };
  }

  // Kiểm tra dung lượng
  if (file.size > limit) {
    const mbLimit = limit / (1024 * 1024);
    const labels: Record<string, string> = { IMAGE: 'Ảnh', AVATAR: 'Ảnh đại diện', COVER: 'Ảnh bìa', FILE: 'Ảnh', VIDEO: 'Ảnh' };
    const typeLabel = labels[type] || 'Ảnh';
      
    return {
      isValid: false,
      error: TOAST_MESSAGES.MEDIA.FILE_TOO_LARGE(mbLimit, typeLabel)
    };
  }
  return { isValid: true };
};

export interface UploadProgress {
  progress: number;
  bytesTransferred: number;
  totalBytes: number;
  state: "running" | "paused" | "success" | "error" | "canceled";
}

export type ProgressCallback = (progress: UploadProgress) => void;

/**
 * Tải ảnh lên ImgBB (hoặc fallback Base64 Data URL nếu chưa có API key)
 */
export const uploadWithProgress = (
  _path: string,
  file: File,
  onProgress?: ProgressCallback,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    if (!apiKey || apiKey === 'your_imgbb_api_key' || apiKey.trim() === '') {
      // Fallback base64 Data URL nếu chưa cấu hình API key
      const reader = new FileReader();
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          onProgress?.({
            progress: (e.loaded / e.total) * 100,
            bytesTransferred: e.loaded,
            totalBytes: e.total,
            state: 'running',
          });
        }
      };
      reader.onload = () => {
        onProgress?.({
          progress: 100,
          bytesTransferred: file.size,
          totalBytes: file.size,
          state: 'success',
        });
        resolve(reader.result as string);
      };
      reader.onerror = () => reject(new Error('Không thể đọc tệp ảnh'));
      reader.readAsDataURL(file);
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded / e.total) * 100;
        onProgress?.({
          progress,
          bytesTransferred: e.loaded,
          totalBytes: e.total,
          state: 'running',
        });
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          if (res.success && res.data?.url) {
            onProgress?.({
              progress: 100,
              bytesTransferred: file.size,
              totalBytes: file.size,
              state: 'success',
            });
            resolve(res.data.display_url || res.data.url);
          } else {
            reject(new Error(res.error?.message || 'Lỗi tải ảnh lên ImgBB'));
          }
        } catch {
          reject(new Error('Phản hồi không hợp lệ từ ImgBB'));
        }
      } else {
        reject(new Error(`ImgBB HTTP lỗi ${xhr.status}: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Lỗi kết nối mạng khi tải ảnh lên ImgBB'));
    };

    xhr.send(formData);
  });
};

export const deleteStorageFile = async (_url: string): Promise<void> => {};
export const deleteStorageFiles = async (_urls: string[]): Promise<void[]> => [];

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const generateVideoThumbnail = async (file: File): Promise<File> => file;
