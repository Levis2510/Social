export default function CommentBox({ comments = [] }) {
  return (
    <div className="mt-4 space-y-3">
      {comments.map((c, i) => (
        <div key={i} className="flex gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-200" />
          <div className="bg-gray-100 rounded-lg p-2 flex-1">
            <p className="text-sm font-medium">{c.author?.name || 'User'}</p>
            <p className="text-sm">{c.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
