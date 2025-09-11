import { useState } from "react"
import { Phone, Video } from "lucide-react"

export default function Messages() {
  const [conversations, setConversations] = useState([
    { id: 1, name: "Nguyễn Văn A", last: "Hello bạn 👋", avatar: "https://i.pravatar.cc/60?img=7" },
    { id: 2, name: "Trần Thị B", last: "Mai đi chơi nhé!", avatar: "https://i.pravatar.cc/60?img=8" },
    { id: 3, name: "Lê Văn C", last: "Ok bạn ơi", avatar: "https://i.pravatar.cc/60?img=9" },
    { id: 101, name: "Hoàng D", avatar: "https://i.pravatar.cc/60?img=10", isFriend: true, online: true },
    { id: 102, name: "Phạm E", avatar: "https://i.pravatar.cc/60?img=11", isFriend: true, online: true },
    { id: 103, name: "Vũ F", avatar: "https://i.pravatar.cc/60?img=12", isFriend: true, online: false, lastOnline: Date.now() - 1000 * 60 * 35 },
    { id: 104, name: "Ngô G", avatar: "https://i.pravatar.cc/60?img=13", isFriend: true, online: false, lastOnline: Date.now() - 1000 * 60 * 60 * 5 },
  ])

  const [activeChat, setActiveChat] = useState(null)
  const [messages, setMessages] = useState({}) // lưu tin nhắn theo id cuộc trò chuyện
  const [input, setInput] = useState("")

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "Không rõ"
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return "Vừa xong"
    if (minutes < 60) return `${minutes} phút trước`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} giờ trước`
    const days = Math.floor(hours / 24)
    return `${days} ngày trước`
  }

  const handleSelectChat = (item) => {
    if (item.isFriend && !item.last) {
      const newConversation = { ...item, last: "" }
      setConversations(prev => {
        if (!prev.some(c => c.id === item.id)) return [...prev, newConversation]
        return prev
      })
      setActiveChat(newConversation)
    } else {
      setActiveChat(item)
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!input.trim() || !activeChat) return

    setMessages(prev => ({
      ...prev,
      [activeChat.id]: [
        ...(prev[activeChat.id] || []),
        { text: input.trim(), sender: "me", time: new Date().toLocaleTimeString() }
      ]
    }))

    setConversations(prev =>
      prev.map(c =>
        c.id === activeChat.id ? { ...c, last: input.trim() } : c
      )
    )

    setInput("")
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white rounded-xl shadow">
      {/* Sidebar */}
      <div className="group relative flex-shrink-0 w-16 hover:w-64 bg-white border-r transition-all duration-300 overflow-hidden flex flex-col">
        <h2 className="text-lg font-semibold px-3 py-3 hidden group-hover:block">Tin nhắn & Bạn bè</h2>
        {conversations.map(item => (
          <div
            key={item.id}
            onClick={() => handleSelectChat(item)}
            className={`flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 transition-colors ${
              activeChat?.id === item.id ? "bg-blue-50" : ""
            }`}
          >
            <div className="relative flex-shrink-0">
              <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full" />
              <span
                className={`absolute bottom-0 right-0 block w-3 h-3 border-2 border-white rounded-full ${
                  item.online ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            </div>
            <div className="hidden group-hover:block">
              <p className="font-medium text-gray-800">{item.name}</p>
              {item.online ? (
                item.last ? (
                  <p className="text-sm text-gray-500 truncate">{item.last}</p>
                ) : (
                  <p className="text-xs text-gray-400 italic">Đang hoạt động</p>
                )
              ) : (
                <p className="text-xs text-gray-400 italic">
                  Offline • {formatTimeAgo(item.lastOnline)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full" />
                <h3 className="font-semibold text-gray-800">{activeChat.name}</h3>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => alert(`📞 Gọi cho ${activeChat.name}`)} className="p-2 rounded-full hover:bg-gray-100">
                  <Phone className="w-5 h-5 text-gray-700" />
                </button>
                <button onClick={() => alert(`🎥 Video call với ${activeChat.name}`)} className="p-2 rounded-full hover:bg-gray-100">
                  <Video className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Hiển thị tin nhắn */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {messages[activeChat.id]?.length ? (
                messages[activeChat.id].map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-3 py-2 rounded-2xl max-w-xs ${
                        msg.sender === "me" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">Chưa có tin nhắn</p>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
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
            Chọn một cuộc trò chuyện hoặc bạn bè để bắt đầu
          </div>
        )}
      </div>
    </div>
  )
}
