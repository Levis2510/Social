import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Friends() {
  const [friends, setFriends] = useState([])
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    // Fake API cho danh sách bạn bè
    setFriends([
      { id: 1, name: "Nguyễn Văn A", avatar: "https://i.pravatar.cc/60?img=1" },
      { id: 2, name: "Trần Thị B", avatar: "https://i.pravatar.cc/60?img=2" },
      { id: 3, name: "Lê Văn C", avatar: "https://i.pravatar.cc/60?img=3" },
    ])

    // Fake API cho gợi ý kết bạn
    setSuggestions([
      { id: 4, name: "Phạm Thị D", avatar: "https://i.pravatar.cc/60?img=4" },
      { id: 5, name: "Hoàng Văn E", avatar: "https://i.pravatar.cc/60?img=5" },
      { id: 6, name: "Ngô Thị F", avatar: "https://i.pravatar.cc/60?img=6" },
    ])
  }, [])

  return (
    <div className="p-6 space-y-8">
      {/* Danh sách bạn bè */}
      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Danh sách bạn bè</h2>
        {friends.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map(friend => (
              <Link
                key={friend.id}
                to={`/profile/${friend.id}`}
                className="flex flex-col items-center p-3 rounded-lg border hover:shadow"
              >
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-16 h-16 rounded-full border mb-2"
                />
                <span className="text-gray-800 font-medium">{friend.name}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Bạn chưa có bạn bè nào</p>
        )}
      </section>

      {/* Gợi ý kết bạn */}
      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Gợi ý kết bạn</h2>
        {suggestions.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {suggestions.map(sg => (
              <div
                key={sg.id}
                className="flex flex-col items-center p-3 rounded-lg border hover:shadow"
              >
                <img
                  src={sg.avatar}
                  alt={sg.name}
                  className="w-16 h-16 rounded-full border mb-2"
                />
                <span className="text-gray-800 font-medium">{sg.name}</span>
                <button className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Kết bạn
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Không có gợi ý nào</p>
        )}
      </section>
    </div>
  )
}
