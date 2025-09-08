import { useState } from "react";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import BoxComment from "./BoxComment";

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);
  const [shares, setShares] = useState(post.shares || 0);

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
            onClick={() => setShowComments(true)}
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
      </div>

      {/* Popup Comment */}
      {showComments && (
        <BoxComment
          comments={comments}
          setComments={setComments}
          onClose={() => setShowComments(false)}
        />
      )}
    </div>
  );
}
