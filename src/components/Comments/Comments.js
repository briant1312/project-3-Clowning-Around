import React from 'react'
import * as commentAPI from '../../utilities/comment-api'
import { useParams } from 'react-router-dom'
import * as postsAPI from '../../utilities/posts-api'
import { useState } from 'react'
import sadhonkfile from '../../audio/sadhonk.mp3'


export default function Comments({comment, user, setComments}) {
  const { postId } = useParams()
  const [likeTotal, setLikeTotal] = useState(comment.likes.length - comment.dislikes.length)
  const honk = new Audio("http://www.bubbasmonkey.com/COWS/bikehorn.wav")
  let sadhonk = new Audio(sadhonkfile)
  sadhonk.playbackRate = 2

async function likeComment() {
    const updatedComment = await commentAPI.likeComment(postId,{id:comment._id})
      if(!(updatedComment.likes)){
        return
      }
    setLikeTotal(updatedComment.likes.length - updatedComment.dislikes.length)
    honk.play()

}

async function dislikeComment() {
    const updatedComment = await commentAPI.dislikeComment(postId,{id:comment._id})
    if(!(updatedComment.likes)){
      return
    }
    setLikeTotal(updatedComment.likes.length - updatedComment.dislikes.length)
    sadhonk.play()
}

async function handleDelete(commentId) {
    await commentAPI.deleteComment(postId, {id: commentId})
    const post = await postsAPI.show(postId)
    setComments(post.comments)
}

  return (
    <div className="comment-page">
      {comment.text}
      {user._id === comment.owner._id ? <button className='delete-comment button' onClick={() => handleDelete(comment._id)}>Delete</button> : null}
      <div className="likes-container">
      <span className='like-button' onClick={likeComment}>💚</span><span>{likeTotal}</span><span className='dislike-button' onClick={dislikeComment}>🎈</span>
      <p className='comment-owner'>Posted By: {comment.owner.name}</p>
      </div>    
    </div>
  )
}
