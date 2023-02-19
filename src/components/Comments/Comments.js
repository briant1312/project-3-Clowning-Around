import React from 'react'
import * as commentAPI from '../../utilities/comment-api'
import { useParams } from 'react-router-dom'
import * as postsAPI from '../../utilities/posts-api'
import { useState } from 'react'

export default function Comments({comment, user, setComments}) {
  const { postId } = useParams()
  const [likeTotal, setLikeTotal] = useState(comment.likes.length - comment.dislikes.length)

async function likeComment() {
    const updatedComment = await commentAPI.likeComment(postId,{id:comment._id})
      if(!(updatedComment.likes)){
        return
      }
    setLikeTotal(updatedComment.likes.length - updatedComment.dislikes.length)
}

async function dislikeComment() {
    const updatedComment = await commentAPI.dislikeComment(postId,{id:comment._id})
    if(!(updatedComment.likes)){
      return
    }
    setLikeTotal(updatedComment.likes.length - updatedComment.dislikes.length)
}

async function handleDelete(commentId) {
    await commentAPI.deleteComment(postId, {id: commentId})
    const post = await postsAPI.show(postId)
    setComments(post.comments)
}

  return (
    <div className="comment-page">
      {comment.text}
      {user._id === comment.owner ? <button onClick={() => handleDelete(comment._id)}>Delete</button> : null}
      <div className="likes-container">
      <button onClick={likeComment}>💚</button><span>{likeTotal}</span><button onClick={dislikeComment}>🎈</button>
      </div>    
    </div>
  )
}
