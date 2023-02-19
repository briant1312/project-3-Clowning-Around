import * as postsAPI from '../../utilities/posts-api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Post({post, user}) {
  const [likeTotal, setLikeTotal] = useState(post.likes.length - post.dislikes.length)
  const navigate = useNavigate()

    async function likePost() {
        const updatedPost = await postsAPI.likePost(post._id)
        setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
    }

    async function dislikePost() {
        const updatedPost = await postsAPI.dislikePost(post._id)
        setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
    }

  async function handleDelete(postId) {
    await postsAPI.deletePost(postId)
    navigate('/')
  }

  function handleClick(postId) {
    navigate(`/update/${postId}`)
  }

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      {post.owner === user._id ? <button onClick={() => handleDelete(post._id)}>Delete</button> : null}
      {post.owner === user._id ? <button onClick={() => handleClick(post._id)}>Update</button> : null}
      <button onClick={likePost}>Like</button>
                {likeTotal}
            <button onClick={dislikePost}>Dislike</button>
    </div>
  )
}
