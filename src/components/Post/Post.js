import * as postsAPI from '../../utilities/posts-api'
import { useNavigate } from 'react-router-dom'

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
      <div className="owner-button-container">
        {post.owner && post.owner._id === user._id ? <button className='button' onClick={() => handleClick(post._id)}>Update</button> : null}
        {post.owner && post.owner._id === user._id ? <button className='button' onClick={() => handleDelete(post._id)}>Delete</button> : null}
      </div>
      <div className="likes-container">
      <span className='like-button' onClick={likePost}>💚</span>
       <span>{likeTotal}</span> 
      <span className='dislike-button' onClick={dislikePost}>🎈</span>
      </div>
      <p className='post-owner'>Posted By: {post.owner && post.owner.name}</p>
    </div>
  )
}
