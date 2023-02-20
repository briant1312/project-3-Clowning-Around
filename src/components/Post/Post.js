import * as postsAPI from '../../utilities/posts-api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Post({post, user, likePost, dislikePost, likeTotal}) {
  const navigate = useNavigate()

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
      <div className="likes-container">
      <button onClick={likePost}>💚</button>
       <span>{likeTotal}</span> 
      <button onClick={dislikePost}>🎈</button>
      </div>
    </div>
  )
}
