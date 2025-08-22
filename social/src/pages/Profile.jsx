import { useParams } from 'react-router-dom'

export default function Profile() {
  const { id } = useParams()
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Profile</h2>
      <p className="text-gray-600">User ID: {id}</p>
    </div>
  )
}
