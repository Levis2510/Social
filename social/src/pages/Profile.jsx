import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PostCard from "../components/post/PostCard"; 

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`http://localhost:5175/api/get_profile/${60}`);
        if (!res.ok) throw new Error("Không thể tải dữ liệu người dùng");
        const data = await res.json();
        if (isMounted) setProfile(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) fetchProfile();
    return () => { isMounted = false; };
  }, [id]);

  if (loading) return <p className="text-center py-10">⏳ Đang tải...</p>;
  if (error) return <p className="text-center text-red-500 py-10">❌ {error}</p>;
  if (!profile) return <p className="text-center py-10">Không tìm thấy người dùng</p>;

  // Add Friend
  const handleFriendClick = async () => {
    if (!profile) return;

    try {
      if (profile.isPending) {
        await fetch(`http://localhost:5175/api/friends/request/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        setProfile({ ...profile, isPending: false });
      } else {
        await fetch(`http://localhost:5175/api/friends/request/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        setProfile({ ...profile, isPending: true });
      }
    } catch (err) {
      console.error("Friend request error:", err);
    }
  };

  // Messages
  const handleMessageClick = () => {
    navigate("/messages");
  };

  // Follow
  const handleFollowClick = async () => {
    if (!profile) return;

    try {
      if (profile.isFollowing) {
        await fetch(`http://localhost:5175/api/follow/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        setProfile({
          ...profile,
          isFollowing: false,
          followers: (profile.followers || 0) - 1,
        });
      } else {
        await fetch(`http://localhost:5175/api/follow/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        setProfile({
          ...profile,
          isFollowing: true,
          followers: (profile.followers || 0) + 1,
        });
      }
    } catch (err) {
      console.error("Follow error:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-indigo-100 text-black shadow rounded-lg overflow-hidden">
      {/* Cover */}
      <div className="w-full h-60 md:h-80 bg-gray-200 relative">
        {profile.coverUrl && (
          <img
            src={profile.coverUrl}
            alt="cover"
            className="w-full h-full object-cover"
          />
        )}
        {/* Avatar */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
          <img
            src={profile.avatarUrl || "/default-avatar.png"}
            alt="avatar"
            className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-black shadow-lg"
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-20 md:mt-24 px-5 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">{profile.fullName}</h1>
        {profile.username && <p className="text-gray-500">@{profile.username}</p>}
        <p className="text-gray-600 mt-2">{profile.bio || "Chưa có tiểu sử"}</p>
        <div className="flex gap-6 mt-4">
          <div>
            <p className="font-bold text-lg">{profile.posts?.length || 0}</p>
            <p className="text-gray-500 text-sm">Bài viết</p>
          </div>
          <div>
            <p className="font-bold text-lg">{profile.followers || 0}</p>
            <p className="text-gray-500 text-sm">Người theo dõi</p>
          </div>
          <div>
            <p className="font-bold text-lg">{profile.following || 0}</p>
            <p className="text-gray-500 text-sm">Đang theo dõi</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          {/* Add Friend */}
          <button
            onClick={handleFriendClick}
            disabled={profile.isFriend}
          >
            <motion.span
              key={
                profile.isFriend
                  ? "friend"
                  : profile.isPending
                  ? "pending"
                  : "add"
              }
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`inline-block px-4 py-2 rounded-lg font-medium text-white
                ${profile.isFriend
                  ? "bg-blue-400 cursor-default"
                  : profile.isPending
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {profile.isFriend
                ? "Bạn bè"
                : profile.isPending
                ? "Hủy lời mời"
                : "Thêm bạn bè"}
            </motion.span>
          </button>

          {/* Messages */}
          <button
            onClick={handleMessageClick}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700"
          >
            Nhắn tin
          </button>

          {/* Follow */}
          <button
            onClick={handleFollowClick}
            className={`px-4 py-2 rounded-lg font-medium text-white 
              ${profile.isFollowing
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {profile.isFollowing ? "Đang theo dõi" : "Theo dõi"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t mt-6 px-5">
        <nav className="flex gap-6 text-gray-600 font-medium justify-center">
          <button className="py-3 hover:text-blue-600">Bài viết</button>
          <button className="py-3 hover:text-blue-600">Bạn bè</button>
        </nav>
      </div>

      {/* Posts list */}
      <div className="p-5 space-y-4">
        {profile.posts && profile.posts.length > 0 ? (
          profile.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p className="text-gray-500 text-center">
            Người dùng chưa có bài viết
          </p>
        )}
      </div>
    </div>
  );
}
