import { Link } from "react-router-dom"
import * as postsAPI from '../../utilities/posts-api'
import { useState } from "react"

export default function PostItem({post}) {
    const [likeTotal, setLikeTotal] = useState(post.likes.length - post.dislikes.length)

    const honk = new Audio("http://www.bubbasmonkey.com/COWS/bikehorn.wav")
  
  

    async function likePost() {
        const updatedPost = await postsAPI.likePost(post._id)
        setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
        honk.play()
    }

    async function dislikePost() {
        const updatedPost = await postsAPI.dislikePost(post._id)
        setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
        honk.play()
    }

    return (
        <div className="post-item">
            <Link to={`/view/${post._id}`}><span className="post-title">{post.title}</span></Link>
            <p className="post-text">{post.text}</p>
            <div className="likes-container">
            <button onClick={likePost}>💚</button>
               <span>{likeTotal}</span> 
            <button onClick={dislikePost}>🎈</button>
            </div>
            <p className="comment-count">Comments: {post.comments.length}</p>
            <p className="post-owner">Posted By: {post.owner.name}</p>
        </div>
    )
}