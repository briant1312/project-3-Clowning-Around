import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import useSounds from '../../hooks/useSounds'
import { TbArrowBigUpFilled, TbArrowBigDownFilled } from "react-icons/tb"
import { useLikeCommentMutation, useDislikeCommentMutation, useDeleteCommentMutation } from "../../store"

export default function Comment({ comment, user, setComments }) {
    const { postId } = useParams()
    const [likeTotal, setLikeTotal] = useState(comment.likes.length - comment.dislikes.length)
    const [userLiked, setUserLiked] = useState(comment.likes.includes(user._id));
    const [userDisliked, setUserDisliked] = useState(comment.dislikes.includes(user._id));
    const { bikeHornSound, sadHonkSound } = useSounds()
    const [likeComment] = useLikeCommentMutation()
    const [dislikeComment] = useDislikeCommentMutation()
    const [deleteComment] = useDeleteCommentMutation()


    function handleLikeComment() {
        bikeHornSound()
        likeComment({ postId, commentId: comment._id })
            .unwrap()
            .then(updatedComment => {
                setLikeTotal(updatedComment.likes.length - updatedComment.dislikes.length)
                setUserLiked(updatedComment.likes.includes(user._id))
                setUserDisliked(updatedComment.dislikes.includes(user._id))
            })
            .catch(err => console.error(err))
    }

    function handleDislikeComment() {
        sadHonkSound()
        dislikeComment({ postId, commentId: comment._id })
            .unwrap()
            .then(updatedComment => {
                setLikeTotal(updatedComment.likes.length - updatedComment.dislikes.length)
                setUserLiked(updatedComment.likes.includes(user._id))
                setUserDisliked(updatedComment.dislikes.includes(user._id))
            })
            .catch(err => console.error(err))
    }

    function handleDelete(commentId) {
        deleteComment({ postId, commentId: comment._id })
            .unwrap()
            .then(comments => {
                setComments(comments)
            })
            .catch(err => console.error(err))
    }

    return (
        <div className="comment-page">
            {comment.text}
            {user._id === comment.owner._id ? <button className='delete-comment button' onClick={() => handleDelete(comment._id)}>Delete</button> : null}
            <div className="likes-container">
                <span
                    className='like-button'
                    onClick={handleLikeComment}
                    style={{ color: userLiked && "blue" }}
                >
                    <TbArrowBigUpFilled />
                </span>
                <span>{likeTotal}</span>
                <span
                    className='dislike-button'
                    onClick={handleDislikeComment}
                    style={{ color: userDisliked && "orangered" }}
                >
                    <TbArrowBigDownFilled />
                </span>
            </div>
            <p className='comment-owner'>Posted By: {comment.owner.name}</p>
        </div>
    )
}
