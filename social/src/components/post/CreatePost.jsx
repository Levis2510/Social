import { useState } from "react"

export default function CreatePost({ onPost }) {
  const [content, setContent] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) return
    onPost(content)
    setContent("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-2xl shadow mb-4"
    >
      <textarea
        className="w-full p-3 border rounded-xl focus:outline-none focus:ring resize-none text-black"
        rows="3"
        placeholder="Bạn đang nghĩ gì?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
      >
        Đăng bài
      </button>
    </form>
  )
}
