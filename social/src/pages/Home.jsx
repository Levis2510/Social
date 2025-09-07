import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/post/PostCard";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); 
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5175/api/home/${user.id}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Fetch home data error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Trang chủ</h2>
      <div className="space-y-4">
        {data?.posts?.length > 0 ? (
          data.posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
           <div className="bg-white p-6 rounded-xl shadow-sm border text-center text-gray-500">
      Chưa có bài viết nào
    </div>
        )}
      </div>
    </>
  );
}
