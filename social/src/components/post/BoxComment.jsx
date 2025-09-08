import { useState } from "react";
import { Heart, ThumbsDown, Trash2 } from "lucide-react";

export default function BoxComment({ comments = [], setComments, onClose }) {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Thêm comment chính 
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      user: {
        name: "Bạn",
        avatar: "https://ui-avatars.com/api/?name=Ban",
      },
      text: newComment.trim(),
      replies: [],
      likes: 0,
      dislikes: 0,
      liked: false,
      disliked: false,
    };
    setComments((prev = []) => [...prev, comment]);
    setNewComment("");
  };

  // Thêm reply
  const handleAddReply = (commentId) => {
    if (!replyText.trim()) return;
    const reply = {
      id: Date.now(),
      user: {
        name: "Bạn",
        avatar: "https://ui-avatars.com/api/?name=Ban",
      },
      text: replyText.trim(),
      likes: 0,
      dislikes: 0,
      liked: false,
      disliked: false,
    };
    setComments((prev = []) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, replies: [...(c.replies || []), reply] }
          : c
      )
    );
    setReplyText("");
    setReplyingTo(null);
  };

  // Xóa comment 
  const handleDeleteComment = (commentId) => {
    setComments((prev = []) => prev.filter((c) => c.id !== commentId));
    setConfirmDelete(null);
  };

  // Xóa reply 
  const handleDeleteReply = (commentId, replyId) => {
    setComments((prev = []) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, replies: (c.replies || []).filter((r) => r.id !== replyId) }
          : c
      )
    );
    setConfirmDelete(null);
  };

  // Like / Dislike
// LIKE
const toggleLike = (id, isReply = false, parentId = null) => {
  setComments((prev) =>
    prev.map((c) => {
      if (isReply && c.id === parentId) {
        return {
          ...c,
          replies: c.replies.map((r) =>
            r.id === id
              ? {
                  ...r,
                  liked: !r.liked,
                  likes: r.liked ? r.likes - 1 : r.likes + 1,
                  // Nếu like thì chắc chắn bỏ dislike
                  disliked: false,
                  dislikes: r.disliked ? r.dislikes - 1 : r.dislikes,
                }
              : r
          ),
        };
      }
      if (!isReply && c.id === id) {
        return {
          ...c,
          liked: !c.liked,
          likes: c.liked ? c.likes - 1 : c.likes + 1,
          disliked: false,
          dislikes: c.disliked ? c.dislikes - 1 : c.dislikes,
        };
      }
      return c;
    })
  );
};

// DISLIKE
const toggleDislike = (id, isReply = false, parentId = null) => {
  setComments((prev) =>
    prev.map((c) => {
      if (isReply && c.id === parentId) {
        return {
          ...c,
          replies: c.replies.map((r) =>
            r.id === id
              ? {
                  ...r,
                  disliked: !r.disliked,
                  dislikes: r.disliked ? r.dislikes - 1 : r.dislikes + 1,
                  // Nếu dislike thì chắc chắn bỏ like
                  liked: false,
                  likes: r.liked ? r.likes - 1 : r.likes,
                }
              : r
          ),
        };
      }
      if (!isReply && c.id === id) {
        return {
          ...c,
          disliked: !c.disliked,
          dislikes: c.disliked ? c.dislikes - 1 : c.dislikes + 1,
          liked: false,
          likes: c.liked ? c.likes - 1 : c.likes,
        };
      }
      return c;
    })
  );
};
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-4 relative">
        {/* Đóng popup */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold mb-3">Bình luận</h3>

        {/* Danh sách comment */}
        <div className="max-h-80 overflow-y-auto space-y-3 mb-3">
          {(comments || []).length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="text-sm">
                {/* Comment chính */}
                <div className="flex items-start gap-2">
                  <img
                    src={
                      c.user?.avatar ||
                      "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(c.user?.name || "Ẩn danh")
                    }
                    alt={c.user?.name || "Ẩn danh"}
                    className="w-6 h-6 rounded-full border"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 p-2 rounded-lg inline-block">
                      <span className="font-medium">{c.user?.name || "Ẩn danh"}</span>{" "}
                      {c.text}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <button
                        className={`flex items-center gap-1 ${
                          c.liked ? "text-red-500" : "hover:text-red-500"
                        }`}
                        onClick={() => toggleLike(c.id)}
                      >
                        <Heart size={14} fill={c.liked ? "red" : "none"} />
                        {c.likes}
                      </button>
                      <button
                        className={`flex items-center gap-1 ${
                          c.disliked ? "text-blue-600" : "hover:text-blue-600"
                        }`}
                        onClick={() => toggleDislike(c.id)}
                      >
                        <ThumbsDown size={14} />
                        {c.dislikes}
                      </button>
                      <button
                        className="text-blue-600"
                        onClick={() =>
                          setReplyingTo(replyingTo === c.id ? null : c.id)
                        }
                      >
                        Trả lời
                      </button>
                      <button
                        className="text-red-500 flex items-center gap-1"
                        onClick={() =>
                          setConfirmDelete({ type: "comment", commentId: c.id })
                        }
                      >
                        <Trash2 size={14} /> Gỡ
                      </button>
                    </div>

                    {/* Ô nhập reply */}
                    {replyingTo === c.id && (
                      <div className="flex items-center gap-2 mt-2 ml-6">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Viết phản hồi..."
                          className="flex-1 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => handleAddReply(c.id)}
                          className="px-2 py-1 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700"
                        >
                          Gửi
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Replies */}
                {(c.replies || []).length > 0 && (
                  <div className="ml-10 mt-2 space-y-2">
                    {c.replies.map((r) => (
                      <div key={r.id} className="flex items-start gap-2 text-xs">
                        <img
                          src={
                            r.user?.avatar ||
                            "https://ui-avatars.com/api/?name=" +
                              encodeURIComponent(r.user?.name || "Ẩn danh")
                          }
                          alt={r.user?.name || "Ẩn danh"}
                          className="w-5 h-5 rounded-full border"
                        />
                        <div className="flex-1">
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <span className="font-medium">{r.user?.name || "Ẩn danh"}</span>{" "}
                            {r.text}
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                            <button
                              className={`flex items-center gap-1 ${
                                r.liked ? "text-red-500" : "hover:text-red-500"
                              }`}
                              onClick={() => toggleLike(r.id, true, c.id)}
                            >
                              <Heart size={12} fill={r.liked ? "red" : "none"} />
                              {r.likes}
                            </button>
                            <button
                              className={`flex items-center gap-1 ${
                                r.disliked
                                  ? "text-blue-600"
                                  : "hover:text-blue-600"
                              }`}
                              onClick={() => toggleDislike(r.id, true, c.id)}
                            >
                              <ThumbsDown size={12} />
                              {r.dislikes}
                            </button>
                            <button
                              className="text-red-500 flex items-center gap-1"
                              onClick={() =>
                                setConfirmDelete({
                                  type: "reply",
                                  commentId: c.id,
                                  replyId: r.id,
                                })
                              }
                            >
                              <Trash2 size={12} /> Gỡ
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">Chưa có bình luận</p>
          )}
        </div>

        {/* Ô nhập comment chính */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Viết bình luận..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleAddComment}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            Gửi
          </button>
        </div>
      </div>

      {/* Popup xác nhận  xóa comment  */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center space-y-4">
            <h4 className="font-bold text-lg">Xóa bình luận</h4>
            <p>Bạn có chắc muốn gỡ bình luận này không?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setConfirmDelete(null)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={() => {
                  if (confirmDelete.type === "comment") {
                    handleDeleteComment(confirmDelete.commentId);
                  } else {
                    handleDeleteReply(confirmDelete.commentId, confirmDelete.replyId);
                  }
                }}
              >
                Gỡ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
