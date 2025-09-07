import PostCard from "../components/post/PostCard";

export default function Demo() {
  const samplePost = {
    id: 1,
    user: {
      name: "Nguyễn Văn A",
      avatar: "https://i.pravatar.cc/50?img=3",
    },
    text: "Hôm nay trời đẹp quá 🌤. Ai đi cà phê không?",
    image: "https://picsum.photos/600/300",
    video: null,
    createdAt: new Date(),
    comments: [
      {
        user: {
          name: "Trần B",
          avatar: "https://i.pravatar.cc/50?img=5",
        },
        text: "Chuẩn luôn, trời đẹp ☀️",
      },
      {
        user: {
          name: "Lê C",
          avatar: "https://i.pravatar.cc/50?img=7",
        },
        text: "Đi cà phê thôi 😆",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl font-bold mb-4">Demo PostCard</h2>
        <PostCard post={samplePost} />
      </div>
    </div>
  );
}
