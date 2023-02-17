import * as postsAPI from '../../utilities/posts-api'
import { useNavigate } from 'react-router-dom'

export default function Post({post, user}) {
  const navigate = useNavigate()

  async function handleDelete(postId) {
    await postsAPI.deletePost(postId)
    navigate('/')
  }

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      {post.owner === user._id ? <button onClick={() => handleDelete(post._id)}>Delete</button> : null}
    </div>
  )
}
