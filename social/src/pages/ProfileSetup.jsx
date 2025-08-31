import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ProfileSetup() {
  const [step, setStep] = useState(1)

  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)

  const [cover, setCover] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)

  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState("")
  const [bio, setBio] = useState("")
  const [interests, setInterests] = useState("")

  const navigate = useNavigate()

  // chọn file avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatar(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  // chọn file cover
  const handleCoverChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCover(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const handleNext = () => setStep((s) => s + 1)
  const handleBack = () => setStep((s) => s - 1)

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("avatar", avatar)
    formData.append("cover", cover)
    formData.append("name", name)
    formData.append("gender", gender)
    formData.append("dob", dob)
    formData.append("bio", bio)
    formData.append("interests", interests)

    // Gọi API lưu profile
    console.log("Profile data:", Object.fromEntries(formData.entries()))

    navigate("/", { replace: true })
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Tạo hồ sơ cá nhân</h2>

      {/* thanh bước tiến trình */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 mx-1 rounded ${
              step >= s ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* --- Bước 1: Avatar + Cover --- */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ảnh bìa</label>
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ảnh đại diện</label>
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
          </div>
        )}

        {/* --- Bước 2: Thông tin cá nhân --- */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Họ và tên</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Nhập họ và tên"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Giới tính</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border rounded-lg p-3"
                required
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ngày sinh</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>
          </div>
        )}

        {/* --- Bước 3: Giới thiệu & sở thích --- */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Giới thiệu bản thân</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Viết vài dòng về bạn..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sở thích</label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Ví dụ: Đọc sách, Du lịch, Lập trình..."
              />
            </div>
          </div>
        )}

        {/* Nút điều hướng */}
        <div className="flex justify-between pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Quay lại
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Tiếp tục
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Hoàn tất
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
