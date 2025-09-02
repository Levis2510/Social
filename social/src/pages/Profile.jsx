import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`http://localhost:5175/api/get_profile/${id}`);
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

  return (
    <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden">
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
            src={profile.avatarUrl || '/default-avatar.png'}
            alt="avatar"
            className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg"
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
            <p className="font-bold text-lg">{profile.posts || 0}</p>
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
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
            {profile.isFriend ? "Bạn bè" : "Thêm bạn bè"}
          </button>
          <button className="border px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
            Nhắn tin
          </button>
          <button className="border px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
            Theo dõi
          </button>
        </div>
      </div>
      <div className="border-t mt-6 px-5">
        <nav className="flex gap-6 text-gray-600 font-medium justify-center">
          <button className="py-3 border-b-2 border-blue-600 text-blue-600">Bài viết</button>
          <button className="py-3 hover:text-blue-600">Giới thiệu</button>
          <button className="py-3 hover:text-blue-600">Bạn bè</button>
          <button className="py-3 hover:text-blue-600">Ảnh</button>
          <button className="py-3 hover:text-blue-600">Video</button>
        </nav>
      </div>

      {/* Posts preview */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {(profile.postsData || []).map((post, index) => (
          <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
            <img src={post.imageUrl} alt={`post-${index}`} className="w-full h-40 object-cover" />
          </div>
        ))}
        {(!profile.postsData || profile.postsData.length === 0) && (
          <p className="text-gray-500 col-span-full text-center">Người dùng chưa có bài viết</p>
        )}
      </div>
    </div>
  );
}
