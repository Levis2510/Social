import { useState } from "react";
import { MessageCircle, Heart, Share2 } from "lucide-react";

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);
  const [shares, setShares] = useState(post.shares || 0);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      user: {
        name: "Bạn",
        avatar: "https://ui-avatars.com/api/?name=Ban",
      },
      text: newComment.trim(),
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleShare = () => {
    setShares((prev) => prev + 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex gap-4">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={
            post.user.avatar ||
            "https://ui-avatars.com/api/?name=" + post.user.name
          }
          alt={post.user.name}
          className="w-10 h-10 rounded-full border"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{post.user.name}</span>
          <span>{new Date(post.createdAt).toLocaleString()}</span>
        </div>

        {/* Body */}
        <div className="mt-2 space-y-3">
          {post.text && <p className="text-gray-800">{post.text}</p>}
          {post.image && (
            <img
              src={post.image}
              alt="post"
              className="w-full rounded-lg border"
            />
          )}
          {post.video && (
            <video controls className="w-full rounded-lg">
              <source src={post.video} type="video/mp4" />
              Trình duyệt không hỗ trợ video.
            </video>
          )}
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center gap-6 text-gray-500 text-sm">
          {/* Like */}
          <button
            className={`flex items-center gap-1 ${
              liked ? "text-red-500" : "hover:text-red-500"
            }`}
            onClick={toggleLike}
          >
            <Heart size={18} fill={liked ? "red" : "none"} />
            {likes}
          </button>

          {/* Comment */}
          <button
            className="flex items-center gap-1 hover:text-blue-600"
            onClick={() => setShowComments((prev) => !prev)}
          >
            <MessageCircle size={18} />
            {comments.length}
          </button>

          {/* Share */}
          <button
            className="flex items-center gap-1 hover:text-green-600"
            onClick={handleShare}
          >
            <Share2 size={18} />
            {shares}
          </button>
        </div>

        {/* Comment Section */}
        {showComments && (
          <div className="mt-3 border-t pt-3 space-y-3">
            {/* Danh sách comment */}
            {comments.length > 0 ? (
              comments.map((c, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <img
                    src={c.user.avatar}
                    alt={c.user.name}
                    className="w-6 h-6 rounded-full border"
                  />
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <span className="font-medium">{c.user.name}</span>{" "}
                    {c.text}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">Chưa có bình luận</p>
            )}

            {/* Ô nhập comment */}
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
        )}
      </div>
    </div>
  );
}
