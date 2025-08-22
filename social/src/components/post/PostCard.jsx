export default function PostCard({ post }) {
  return (
    <article className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
        <div>
          <p className="font-medium">{post.author?.name || 'Anonymous'}</p>
          <p className="text-xs text-gray-500">{new Date(post.createdAt || Date.now()).toLocaleString()}</p>
        </div>
      </div>
      <p className="text-gray-800">{post.content}</p>
      {post.image && <img className="mt-3 rounded-lg" src={post.image} alt="post" />}
      <div className="mt-3 flex gap-4 text-sm text-gray-600">
        <button className="hover:text-blue-600">Like</button>
        <button className="hover:text-blue-600">Comment</button>
        <button className="hover:text-blue-600">Share</button>
      </div>
    </article>
  )
}
