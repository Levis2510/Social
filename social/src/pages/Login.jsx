import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const { login, loading, error } = useAuthStore()
  const navigate = useNavigate()

const submit = async (e) => {
  e.preventDefault();
  const user = await login(email, password);
  if (user) {
    const accountId = user.account_id || user.userId;
    if (!accountId) {
          console.error("Không tìm thấy account_id trong response:", user);
      return;
    }
    navigate(`/profile/${accountId}`);
  }
};

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          type="email"
          required
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            className="w-full border rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mật khẩu"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="rounded"
            />
            Ghi nhớ đăng nhập
          </label>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Chưa có tài khoản?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Đăng ký ngay
        </Link>
      </p>

      <p className="text-sm text-center mt-4">
        Bạn quên mật khẩu?{" "}
        <Link to="/reset-password" className="text-blue-600 hover:underline">
          Lấy lại mật khẩu
        </Link>
      </p>
    </div>
  )
}
