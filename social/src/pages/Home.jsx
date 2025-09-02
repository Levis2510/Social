import { useEffect, useState } from "react"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/") // chưa login thì quay về login
      return
    }

    const fetchData = async () => {
      try {
        // (4) lấy userID từ user
        const res = await fetch(`http://localhost:5175/api/home/${user.id}`)
        const result = await res.json()
        setData(result)
      } catch (err) {
        console.error("Fetch home data error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, navigate])

  if (loading) return <p>Đang tải dữ liệu...</p>

  return (
    <div>
      <h2>Trang chủ</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
