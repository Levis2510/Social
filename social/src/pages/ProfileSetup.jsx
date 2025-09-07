import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ProfileSetup() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState("")
  const [bio, setBio] = useState("")
  const [interests, setInterests] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const [coverFile, setCoverFile] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleImageChange = (e, setPreview, setFile) => {
    const file = e.target.files[0]
    if (file) {
      setFile(file) 
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    setError(null)
    setLoading(true)

    const token = localStorage.getItem("token")
    const accountId = sessionStorage.getItem("userId") // phải cùng name
    console.log("accountid" + accountId)
    try {
      const formData = new FormData()
      formData.append("FullName", name) 
      formData.append("Gender", gender)
      formData.append("DateOfBirth", dob)
      formData.append("Bio", bio)
      formData.append("Phone", phone)
      formData.append("Address", address)
      formData.append("UserId", accountId || 1)
      formData.append("AvatarUrl", "") 
      formData.append("Interests", interests)

      if (avatarFile) formData.append("img_avatar", avatarFile)
      if (coverFile) formData.append("img_background", coverFile)

      const res = await fetch("http://localhost:5175/api/create_profile", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      })

      if (!res.ok) {
        const errData = await res.text()
        throw new Error(`Lỗi khi tạo hồ sơ: ${errData}`)
      }
      console.log(res)
      navigate("/home")
    } catch (err) {
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Thiết lập hồ sơ</h2>

      {/* Step 1: Thông tin cơ bản */}
      {step === 1 && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full border rounded-lg p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select
            className="w-full border rounded-lg p-3"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>

          <input
            type="date"
            className="w-full border rounded-lg p-3"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />

          <button
            onClick={() => setStep(2)}
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
          >
            Tiếp tục
          </button>
        </div>
      )}

      {/* Step 2: Bổ sung */}
      {step === 2 && (
        <div className="space-y-3">
          <textarea
            placeholder="Giới thiệu bản thân"
            className="w-full border rounded-lg p-3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <input
            type="text"
            placeholder="Sở thích (cách nhau bởi dấu phẩy)"
            className="w-full border rounded-lg p-3"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />

          <input
            type="text"
            placeholder="Số điện thoại"
            className="w-full border rounded-lg p-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="Địa chỉ"
            className="w-full border rounded-lg p-3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="bg-gray-300 rounded-lg py-2 px-4"
            >
              Quay lại
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Ảnh */}
      {step === 3 && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Ảnh đại diện</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageChange(e, setAvatarPreview, setAvatarFile)
              }
            />
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="w-24 h-24 mt-2 rounded-full object-cover"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Ảnh bìa</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageChange(e, setCoverPreview, setCoverFile)
              }
            />
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Cover preview"
                className="w-full h-32 mt-2 object-cover rounded-lg"
              />
            )}
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="bg-gray-300 rounded-lg py-2 px-4"
            >
              Quay lại
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Đang lưu..." : "Hoàn tất"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
