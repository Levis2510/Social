import { useState } from "react"

export default function Messages() {
  const [conversations] = useState([
    { id: 1, name: "Nguyễn Văn A", last: "Hello bạn 👋", avatar: "https://i.pravatar.cc/60?img=7" },
    { id: 2, name: "Trần Thị B", last: "Mai đi chơi nhé!", avatar: "https://i.pravatar.cc/60?img=8" },
    { id: 3, name: "Lê Văn C", last: "Ok bạn ơi", avatar: "https://i.pravatar.cc/60?img=9" },
  ])

  const [friendsOnline] = useState([
    { id: 101, name: "Hoàng D", avatar: "https://i.pravatar.cc/60?img=10" },
    { id: 102, name: "Phạm E", avatar: "https://i.pravatar.cc/60?img=11" },
    { id: 103, name: "Vũ F", avatar: "https://i.pravatar.cc/60?img=12" },
  ])

  const [activeChat, setActiveChat] = useState(conversations[0])

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white rounded-xl shadow">
      <div className="w-64 border-r p-3 space-y-2 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-3">Tin nhắn</h2>
        {conversations.map(c => (
          <div
            key={c.id}
            onClick={() => setActiveChat(c)}
            className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-100 ${
              activeChat?.id === c.id ? "bg-blue-50" : ""
            }`}
          >
            <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-medium text-gray-800">{c.name}</p>
              <p className="text-sm text-gray-500 truncate">{c.last}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            <div className="flex items-center gap-3 p-4 border-b">
              <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full" />
              <h3 className="font-semibold text-gray-800">{activeChat.name}</h3>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="text-gray-500 text-sm">
                Đây là nơi hiển thị tin nhắn của {activeChat.name}
              </div>
            </div>

            <form className="p-3 border-t flex gap-2">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                Gửi
              </button>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Chọn một cuộc trò chuyện để bắt đầu
          </div>
        )}
      </div>


      <div className="w-64 border-l p-3 space-y-3 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-3">Đang hoạt động</h2>
        {friendsOnline.map(friend => (
          <div key={friend.id} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
            <div className="relative">
              <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full" />
              {/* chấm xanh online */}
              <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <p className="font-medium text-gray-800">{friend.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
