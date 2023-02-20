import { Link } from "react-router-dom"
import * as postsAPI from '../../utilities/posts-api'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function PostItem({post}) {
    const [likeTotal, setLikeTotal] = useState(post.likes.length - post.dislikes.length)

    const honk = new Audio("http://www.bubbasmonkey.com/COWS/bikehorn.wav")
    const navigate = useNavigate()
  

    async function likePost(event) {
        event.stopPropagation()
        const updatedPost = await postsAPI.likePost(post._id)
        setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
        honk.play()
    }

    async function dislikePost(event) {
        event.stopPropagation()
        const updatedPost = await postsAPI.dislikePost(post._id)
        setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
        honk.play()
    }

    function navigateToShow() {
        navigate(`/view/${post._id}`)
    }

    return (
        <div onClick={navigateToShow} className="post-item">
            <span className="post-title">{post.title}</span>
            <p className="post-text">{post.text}</p>
            <div className="likes-container">
            <span className="like-button" onClick={likePost}>💚</span>
               <span>{likeTotal}</span> 
            <span className="dislike-button" onClick={dislikePost}>🎈</span>
            </div>
            <p className="comment-count">Comments: {post.comments.length}</p>
            <p className="post-owner">Posted By: {post.owner.name}</p>
        </div>
    )
}