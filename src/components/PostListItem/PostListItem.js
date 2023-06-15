import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TbArrowBigUpFilled, TbArrowBigDownFilled } from "react-icons/tb"
import { useLikePostMutation, useDislikePostMutation } from '../../store'
import useSounds from "../../hooks/useSounds"

export default function PostItem({ post, user }) {
    const [likeTotal, setLikeTotal] = useState(post.likes.length - post.dislikes.length)
    const [userLiked, setUserLiked] = useState(post.likes.includes(user._id));
    const [userDisliked, setUserDisliked] = useState(post.dislikes.includes(user._id));
    const { bikeHornSound, sadHonkSound } = useSounds()

    const [ likePost ] = useLikePostMutation()
    const [ dislikePost ] = useDislikePostMutation()

    const navigate = useNavigate()

    function handleLikePost(event) {
        event.stopPropagation()
        bikeHornSound()
        likePost(post._id)
            .unwrap()
            .then(updatedPost => {
                setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
                setUserLiked(updatedPost.likes.includes(user._id))
                setUserDisliked(updatedPost.dislikes.includes(user._id))
            })
            .catch(err => console.error(err))
    }

    function handleDislikePost(event) {
        event.stopPropagation()
        sadHonkSound()
        dislikePost(post._id)
            .unwrap()
            .then(updatedPost => {
                setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
                setUserDisliked(updatedPost.dislikes.includes(user._id))
                setUserLiked(updatedPost.likes.includes(user._id))
            })
            .catch(err => console.error(err))
    }

    function navigateToShow() {
        navigate(`/view/${post._id}`)
    }

    return (
        <div onClick={navigateToShow} className="post-item">
            <span className="post-title">{post.title}</span>
            <p className="post-text">{post.text}</p>
            <div className="likes-container">
                <span
                    className="like-button"
                    onClick={handleLikePost}
                    style={{ color: userLiked && "blue" }}
                >
                    <TbArrowBigUpFilled />
                </span>
                <span>{likeTotal}</span>
                <span 
                    className="dislike-button" 
                    onClick={handleDislikePost}
                    style={{ color: userDisliked && "orangered" }}
                >
                    <TbArrowBigDownFilled />
                </span>
            </div>
            <p className="comment-count">Comments: {post.comments.length}</p>
            <p className="post-owner">Posted By: {post.owner.name}</p>
        </div>
    )
}