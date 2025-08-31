import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Profile() {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        // Đúng endpoint từ Swagger
        const res = await fetch(`http://localhost:5175/api/get_profile/${id}`)
        if (!res.ok) throw new Error("Không tìm thấy user")
        const data = await res.json()
        setProfile(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [id])

  if (loading) return <p className="text-center py-10">⏳ Đang tải...</p>
  if (error) return <p className="text-center text-red-500 py-10">❌ {error}</p>
  if (!profile) return <p className="text-center py-10">Không tìm thấy người dùng</p>

  return (
    <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={profile.cover}
          alt="cover"
          className="w-full h-60 md:h-80 object-cover"
        />

        {/* Avatar */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
          <img
            src={profile.avatar}
            alt="avatar"
            className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-20 md:mt-24 px-5 flex flex-col items-center">
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-gray-500">{profile.friends} bạn bè</p>

        <div className="flex gap-2 mt-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
            Thêm bạn bè
          </button>
          <button className="border px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
            Nhắn tin
          </button>
        </div>
      </div>

      <div className="border-t mt-6 px-5">
        <nav className="flex gap-6 text-gray-600 font-medium">
          <button className="py-3 border-b-2 border-blue-600 text-blue-600">Bài viết</button>
          <button className="py-3 hover:text-blue-600">Giới thiệu</button>
          <button className="py-3 hover:text-blue-600">Bạn bè</button>
          <button className="py-3 hover:text-blue-600">Ảnh</button>
        </nav>
      </div>

      {/* Nội dung */}
      <div className="p-5">
        <p className="text-gray-600">👉 Đây là nơi load bài viết của user {id}</p>
      </div>
    </div>
  )
}
