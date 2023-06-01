import React from 'react'
import * as commentAPI from '../../utilities/comment-api'
import { useParams } from 'react-router-dom'
import * as postsAPI from '../../utilities/posts-api'
import { useState } from 'react'
import sadhonkfile from '../../audio/sadhonk.mp3'


export default function Comments({ comment, user, setComments }) {
    const { postId } = useParams()
    const [likeTotal, setLikeTotal] = useState(comment.likes.length - comment.dislikes.length)
    const [userLiked, setUserLiked] = useState(comment.likes.includes(user._id));
    const [userDisliked, setUserDisliked] = useState(comment.dislikes.includes(user._id));

    const honk = new Audio("http://www.bubbasmonkey.com/COWS/bikehorn.wav")
    let sadhonk = new Audio(sadhonkfile)
    sadhonk.playbackRate = 2

    async function likeComment() {
        try {
            const updatedComment = await commentAPI.likeComment(postId, { id: comment._id })
            if (!(updatedComment.likes)) {
                return
            }
            setLikeTotal(updatedComment.likes.length - updatedComment.dislikes.length)
            setUserLiked(updatedComment.likes.includes(user._id))
            setUserDisliked(updatedComment.dislikes.includes(user._id))
            honk.play()
        } catch (err) {
            console.error(err)
        }

    }

    async function dislikeComment() {
        try {
            const updatedComment = await commentAPI.dislikeComment(postId, { id: comment._id })
            if (!(updatedComment.likes)) {
                return
            }
            setLikeTotal(updatedComment.likes.length - updatedComment.dislikes.length)
            setUserLiked(updatedComment.likes.includes(user._id))
            setUserDisliked(updatedComment.dislikes.includes(user._id))
            sadhonk.play()
        } catch (err) {
            console.error(err)
        }
    }

    async function handleDelete(commentId) {
        try {
            await commentAPI.deleteComment(postId, { id: commentId })
            const post = await postsAPI.show(postId)
            setComments(post.comments)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="comment-page">
            {comment.text}
            {user._id === comment.owner._id ? <button className='delete-comment button' onClick={() => handleDelete(comment._id)}>Delete</button> : null}
            <div className="likes-container">
                <span
                    className='like-button'
                    onClick={likeComment}
                    style={{ color: userLiked && "blue" }}
                >
                    ⬆︎
                </span>
                <span>{likeTotal}</span>
                <span
                    className='dislike-button'
                    onClick={dislikeComment}
                    style={{ color: userDisliked && "orangered" }}
                >
                    ⬇︎
                </span>
            </div>
            <p className='comment-owner'>Posted By: {comment.owner.name}</p>
        </div>
    )
}
