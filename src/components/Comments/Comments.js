import React from 'react'
import * as commentAPI from '../../utilities/comment-api'
import { useParams } from 'react-router-dom'
import * as postsAPI from '../../utilities/posts-api'

export default function Comments({comment, user, setComments}) {
  const { postId } = useParams()
  
  async function handleDelete(commentId) {
    await commentAPI.deleteComment(postId, {id: commentId})
    const post = await postsAPI.show(postId)
    setComments(post.comments)
  }

  return (
    <div>
      {comment.text}
      {user._id === comment.owner ? <button onClick={() => handleDelete(comment._id)}>Delete</button> : null}
    </div>
  )
}
