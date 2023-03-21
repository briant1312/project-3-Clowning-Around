import * as postsAPI from '../../utilities/posts-api'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import sadhonkfile from '../../audio/sadhonk.mp3'

export default function PostItem({post}) {
    const [likeTotal, setLikeTotal] = useState(post.likes.length - post.dislikes.length)
    let sadhonk = new Audio(sadhonkfile)
    sadhonk.playbackRate = 2
    const honk = new Audio("http://www.bubbasmonkey.com/COWS/bikehorn.wav")
    const navigate = useNavigate()

    useEffect(() => {
        setLikeTotal(post.likes.length - post.dislikes.length)
    }, [post])
  

    async function likePost(event) {
        try {
            event.stopPropagation()
            const updatedPost = await postsAPI.likePost(post._id)
            setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
            honk.play()
        } catch(err) {
            console.error(err)
        }
    }

    async function dislikePost(event) {
        try {
            event.stopPropagation()
            const updatedPost = await postsAPI.dislikePost(post._id)
            setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
            sadhonk.play()
        } catch(err) {
            console.error(err)
        }
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