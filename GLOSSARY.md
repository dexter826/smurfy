# Smurfy Social

Ngôn ngữ nghiệp vụ của Smurfy — mạng xã hội real-time gồm bài viết, bình luận, kết bạn và trò chuyện. Một thuật ngữ = một khái niệm; khi trao đổi và đặt tên trong code, dùng đúng thuật ngữ ở đây.

## Language

### Người dùng & quan hệ

**User**:
Tài khoản của một người trong hệ thống, có hồ sơ (avatar, cover, thông tin cá nhân) và trạng thái hoạt động.
_Avoid_: Account, Profile, Member

**FriendRequest**:
Lời mời kết bạn từ một User gửi tới một User khác; có trạng thái `pending`, `accepted` hoặc `rejected`.
_Avoid_: Invite, Lời mời

**Friend**:
Quan hệ hai chiều giữa hai User sau khi FriendRequest được chấp nhận.
_Avoid_: Connection, Bạn (dùng khi nói riêng lẻ)

**FriendStatus**:
Trạng thái quan hệ giữa người xem và một User khác: `not_friend`, `pending_sent`, `pending_received`, `friend`. Là trạng thái suy ra, không phải bản ghi riêng.
_Avoid_: FriendRequestStatus — đó là trạng thái của một FriendRequest, không phải của cặp User

**Unfriend**:
Huỷ quan hệ Friend giữa hai User; cả hai trở về trạng thái chưa kết bạn.
_Avoid_: Remove friend, Huỷ kết bạn

**Suggested Friends**:
Danh sách gợi ý kết bạn cho một User, xếp theo số bạn chung; được làm mới định kỳ.
_Avoid_: Friend suggestion, Người dùng có thể biết

**Block**:
Chặn một User theo các phạm vi riêng: chặn tin nhắn, ẩn hoạt động của tôi với họ, ẩn hoạt động của họ với tôi. Quan hệ một chiều giữa hai User.
_Avoid_: Ban

### Nội dung

**Post**:
Bài viết do User đăng, có Visibility và vòng đời `active`, `deleted`.
_Avoid_: Status, Feed — Feed là dòng bài viết, không phải một bài

**System Post**:
Post do hệ thống tự tạo khi User đổi avatar hoặc cover (`avatar_update`, `cover_update`); bản cũ bị xoá khi có bản cùng loại mới hơn.
_Avoid_: Profile Update Post

**Visibility**:
Quyền xem của một nội dung: `public`, `friends` hoặc `private`. Áp dụng cho Post và từng trường thông tin hồ sơ.
_Avoid_: Privacy, Quyền riêng tư

**Comment**:
Bình luận trên Post. Comment gốc mở một thread; Reply nằm trong thread đó.
_Avoid_: Feedback, Trả lời

**Reply**:
Comment có `parentId` trỏ tới Comment gốc của thread; `replyToId` trỏ tới Comment cụ thể đang trả lời để gắn nhãn người được trả lời.
_Avoid_: Nested comment, Sub-comment

**Reaction**:
Cảm xúc thuộc một trong sáu loại (like, love, haha, wow, sad, angry) đặt trên Post hoặc Comment; mỗi User có một Reaction cho mỗi đối tượng.
_Avoid_: Like — like chỉ là một loại Reaction

**Media**:
Hình ảnh đính kèm của Post, Comment hay Message.
_Avoid_: File, Attachment

### Trò chuyện

**Conversation**:
Cuộc trò chuyện giữa hai User hoặc trong một Group Chat; chứa Message.
_Avoid_: Room, Channel, Chat — Chat là tên miền tính năng

**Group Chat**:
Conversation có nhiều thành viên, có thể có link mời và chế độ duyệt tham gia.
_Avoid_: Group, Channel

**Member**:
Thành viên của một Group Chat, vai trò `admin` hoặc `member` trong group đó.
_Avoid_: Participant

**Disband**:
Giải tán Group Chat: Conversation kết thúc vĩnh viễn với mọi Member, không thể nhắn thêm. Khác với một Member tự rời nhóm — nhóm vẫn sống với những người còn lại.
_Avoid_: Leave, Xoá nhóm

**Message**:
Tin nhắn trong Conversation. Khác với Comment — bình luận trên Post.
_Avoid_: Chat, Text

**Recall**:
Thu hồi một Message: mọi người trong Conversation đều thấy "đã thu hồi". Khác với xoá phía từng người — bản ghi bị ẩn chỉ với người đó.
_Avoid_: Unsend, Delete

**Clear History**:
Xoá toàn bộ Message của một Conversation trên phía mình; những người khác vẫn thấy bình thường. Khác với Recall — thu hồi áp dụng cho một Message và mọi người đều thấy.
_Avoid_: Xoá tin nhắn — mơ hồ giữa Clear History và Recall

**Pin**:
Ghim một Conversation lên đầu danh sách chat của riêng mình.
_Avoid_: Đánh dấu quan trọng

**Mute**:
Tắt thông báo của một Conversation cho riêng mình; vẫn nhận Message bình thường.
_Avoid_: Tắt nhắc, Im lặng

**Archive**:
Lưu trữ một Conversation, gỡ nó khỏi danh sách chat chính của riêng mình.
_Avoid_: Ẩn

**Share Post**:
Đăng một Post vào một Conversation dưới dạng Message kèm bản xem trước của Post gốc.
_Avoid_: Forward — chuyển tiếp Message, không phải Post

**Forward**:
Chuyển tiếp một Message đã có tới một Conversation khác; Message mới được đánh dấu là chuyển tiếp.
_Avoid_: Share, Gửi lại

**Mention**:
Gắn nhãn một User trong nội dung Message hoặc Comment; User được nhãn nhận Notification riêng.
_Avoid_: Tag

**Presence**:
Trạng thái đang online và last seen của User trong chat.
_Avoid_: Online status

### Phân phối & thông báo

**Feed**:
Bảng tin của một User: tập Post hiển thị trên trang chính, được cập nhật khi kết bạn, huỷ kết bạn, chặn hoặc ẩn bài viết.
_Avoid_: Newsfeed, Timeline

**Notification**:
Thông báo gửi cho một User khi một User khác tương tác (reaction, comment, kết bạn, nhắn tin…); người gây ra là actor, người nhận là receiver.
_Avoid_: Alert, Push
