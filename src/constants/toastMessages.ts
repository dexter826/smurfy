export const TOAST_MESSAGES = {
  COMMON: {
    ERROR: 'Đã xảy ra lỗi. Vui lòng thử lại sau',
    SUCCESS: 'Thao tác hoàn tất',
    LOADING: 'Đang xử lý...',
  },

  AUTH: {
    REGISTER_SUCCESS: 'Đăng ký hoàn tất. Vui lòng kiểm tra email',
    VERIFY_EMAIL_SUCCESS: 'Xác thực email hoàn tất',
    VERIFY_EMAIL_PENDING: 'Email chưa được xác thực. Vui lòng kiểm tra hộp thư',
    RESEND_VERIFY_SUCCESS: 'Đã gửi lại email xác thực',
    RESET_PASSWORD_SUCCESS: 'Đã gửi email khôi phục mật khẩu',
    CHANGE_PASSWORD_SUCCESS: 'Mật khẩu đã thay đổi. Vui lòng đăng nhập lại',
    SEND_EMAIL_FAILED: 'Không thể gửi email lúc này',
    CHECK_STATUS_FAILED: 'Không thể kiểm tra trạng thái lúc này',
    ERRORS: {
      INVALID_EMAIL: 'Email không hợp lệ',
      WRONG_PASSWORD: 'Email hoặc mật khẩu không chính xác',
      USER_NOT_FOUND: 'Email hoặc mật khẩu không chính xác',
      INVALID_CREDENTIAL: 'Email hoặc mật khẩu không chính xác',
      EMAIL_ALREADY_IN_USE: 'Email này đã được sử dụng',
      WEAK_PASSWORD: 'Mật khẩu quá yếu',
      USER_DISABLED: 'Tài khoản đã bị khóa',
      EMAIL_NOT_VERIFIED:
        'Email chưa được xác thực. Vui lòng kiểm tra hộp thư hoặc gửi lại email xác thực',
    },
  },

  FEED: {
    CREATE_SUCCESS: 'Đã đăng bài viết',
    UPDATE_SUCCESS: 'Đã cập nhật bài viết',
    DELETE_SUCCESS: 'Đã xóa bài viết',
    LOAD_FAILED: 'Không thể tải danh sách bài viết',
    CREATE_FAILED: (detail?: string) =>
      detail ? `Lỗi đăng bài: ${detail}` : 'Không thể đăng bài viết',
    UPDATE_FAILED: (detail?: string) =>
      detail ? `Lỗi cập nhật: ${detail}` : 'Không thể cập nhật bài viết',
    DELETE_FAILED: 'Không thể xóa bài viết',
    DELETE_COMMENT_SUCCESS: 'Đã xóa bình luận',
    DELETE_COMMENT_FAILED: 'Không thể xóa bình luận',
    MEDIA_LIMIT: (max: number) => `Tối đa ${max} ảnh cho mỗi bài viết`,
  },

  PROFILE: {
    UPDATE_SUCCESS: 'Cập nhật hồ sơ hoàn tất',
    UPDATE_FAILED: 'Cập nhật hồ sơ thất bại',
    ONBOARDING_SUCCESS: 'Hồ sơ đã sẵn sàng',
    ONBOARDING_FAILED: 'Cập nhật hồ sơ thất bại. Vui lòng thử lại',
    INTEREST_LIMIT: (max: number) => `Tối đa ${max} sở thích`,
  },

  MEDIA: {
    UPLOAD_AVATAR_FAILED: 'Không thể tải lên ảnh đại diện',
    UPLOAD_COVER_FAILED: 'Không thể tải lên ảnh bìa',
    UPDATE_AVATAR_SUCCESS: 'Đã cập nhật ảnh đại diện',
    UPDATE_COVER_SUCCESS: 'Đã cập nhật ảnh bìa',
    DELETE_AVATAR_SUCCESS: 'Đã xóa ảnh đại diện',
    DELETE_COVER_SUCCESS: 'Đã xóa ảnh bìa',
    DELETE_AVATAR_FAILED: 'Không thể xóa ảnh đại diện',
    DELETE_COVER_FAILED: 'Không thể xóa ảnh bìa',
    INVALID_FILE: 'Vui lòng chọn tệp ảnh hợp lệ',
    FILE_TOO_LARGE: (limit: number, label: string) => `${label} quá lớn (Tối đa ${limit}MB)`,
  },

  FRIEND: {
    ACCEPT_SUCCESS: 'Đã trở thành bạn bè',
    CANCEL_SUCCESS: 'Đã hủy lời mời kết bạn',
    SEND_SUCCESS: 'Đã gửi lời mời kết bạn',
    UNFRIEND_SUCCESS: 'Đã hủy kết bạn',
    UNFRIEND_FAILED: 'Hủy kết bạn thất bại',
    BLOCKED_USER: 'Không thể tương tác với người dùng này',
    BIRTHDAY_WISH_SUCCESS: (name: string) => `Đã gửi lời chúc đến ${name}!`,
    BIRTHDAY_WISH_FAILED: 'Không thể gửi lời chúc lúc này',
    ACTION_FAILED: (detail?: string) => detail || 'Thao tác thất bại',
  },

  BLOCK: {
    BLOCK_SUCCESS: 'Đã cập nhật thiết lập chặn',
    UNBLOCK_SUCCESS: 'Đã bỏ chặn người dùng',
    BLOCK_FAILED: 'Cập nhật thiết lập chặn thất bại',
    UNBLOCK_FAILED: 'Bỏ chặn thất bại',
  },

  CHAT: {
    SEND_FAILED: 'Không thể gửi tin nhắn',
    BLOCKED_USER: 'Không thể nhắn tin cho người dùng này',
    OPEN_FAILED: 'Không thể mở cuộc hội thoại',
    INIT_FAILED: 'Khởi tạo cuộc hội thoại thất bại',
    UPDATE_GROUP_FAILED: 'Cập nhật nhóm thất bại',
    FILE_LIMIT: (max: number) => `Tối đa ${max} tệp cùng lúc`,
    SHARE_POST_FAILED: 'Chia sẻ bài viết thất bại',
    INVITE_MEMBER_FAILED: 'Không thể mời thành viên',
    REMOVE_MEMBER_FAILED: 'Không thể xóa thành viên',
    COPY_LINK_SUCCESS: 'Đã sao chép link tham gia nhóm',
    COPY_LINK_FAILED: 'Không thể sao chép link nhóm',
    RESET_LINK_SUCCESS: 'Đã tạo mới và sao chép link nhóm',
    PIN_LIMIT: (max: number) => `Bạn chỉ có thể ghim tối đa ${max} cuộc hội thoại`,
  },

  COMMENT: {
    CREATE_FAILED: (detail?: string) =>
      detail ? `Lỗi bình luận: ${detail}` : 'Không thể gửi bình luận',
    UPDATE_FAILED: (detail?: string) =>
      detail ? `Lỗi cập nhật: ${detail}` : 'Không thể cập nhật bình luận',
  },

  GROUP: {
    JOIN_SUCCESS: (name: string) => `Đã tham gia nhóm ${name}`,
    ALREADY_MEMBER: 'Bạn đã là thành viên nhóm này',
    PENDING_APPROVAL: 'Đã gửi yêu cầu tham gia nhóm',
    INVALID_LINK: 'Liên kết không hợp lệ hoặc đã hết hạn',
    DISBANDED: 'Nhóm đã giải tán',
    FETCH_INFO_FAILED: 'Không thể lấy thông tin nhóm',
    JOIN_FAILED: 'Tham gia nhóm thất bại',
  },
} as const;
