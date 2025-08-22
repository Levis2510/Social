import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const submit = async (e) => {
    e.preventDefault()
    await login(email, password)
    navigate(from, { replace: true })
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded-lg p-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full border rounded-lg p-3" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="w-full bg-blue-600 text-white rounded-lg py-2 disabled:opacity-60" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-3">Chưa có tài khoản? <Link to="/register" className="text-blue-600">Register</Link></p>
    </div>
  )
}
