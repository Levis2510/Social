import PostCard from "../components/post/PostCard";

export default function Demo() {
  const samplePosts = [
    {
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
          user: { name: "Trần B", avatar: "https://i.pravatar.cc/50?img=5" },
          text: "Chuẩn luôn, trời đẹp ☀️",
        },
        {
          user: { name: "Lê C", avatar: "https://i.pravatar.cc/50?img=7" },
          text: "Đi cà phê thôi 😆",
        },
      ],
    },
    {
      id: 2,
      user: {
        name: "Phạm Thị D",
        avatar: "https://i.pravatar.cc/50?img=10",
      },
      text: "Hôm nay mình vừa thử món bún chả Hà Nội, ngon quá 😋",
      image: "https://picsum.photos/600/301",
      video: null,
      createdAt: new Date(),
      comments: [],
    },
    {
      id: 3,
      user: {
        name: "Hoàng E",
        avatar: "https://i.pravatar.cc/50?img=15",
      },
      text: "Check-in Đà Lạt 🌲✨",
      image: "https://picsum.photos/600/302",
      video: null,
      createdAt: new Date(),
      comments: [
        {
          user: { name: "Nguyễn Văn A", avatar: "https://i.pravatar.cc/50?img=3" },
          text: "Đẹp quá, muốn đi 😍",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-xl font-bold mb-4">Demo Post Card</h2>
        {samplePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
