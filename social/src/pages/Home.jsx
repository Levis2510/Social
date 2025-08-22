import { useEffect } from 'react'
import { usePostStore } from '../store/postStore'
import PostForm from '../components/post/PostForm'
import PostCard from '../components/post/PostCard'

export default function Home() {
  const { posts, fetchPosts, loading } = usePostStore() 

  useEffect(() => {
    fetchPosts() 
  }, [fetchPosts])

  return (
    <div className="space-y-4">
      <PostForm />
      {loading && <p>Loading...</p>}
      <div className="space-y-4">
        {posts.length === 0 && !loading && (
          <p className="text-gray-500">Chưa có bài viết nào.</p>
        )}
        {posts.map((p) => (
          <PostCard key={p._id || p.id} post={p} />
        ))}
      </div>
    </div>
  )
}
