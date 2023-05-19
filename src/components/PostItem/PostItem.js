import * as postsAPI from '../../utilities/posts-api'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import sadhonkfile from '../../audio/sadhonk.mp3'

export default function PostItem({post, user }) {
    const [likeTotal, setLikeTotal] = useState(post.likes.length - post.dislikes.length)
    const [userLiked, setUserLiked] = useState(post.likes.includes(user._id));
    const [userDisliked, setUserDisliked] = useState(post.dislikes.includes(user._id));

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
            setUserLiked(updatedPost.likes.includes(user._id))
            setUserDisliked(updatedPost.dislikes.includes(user._id))
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
            setUserDisliked(updatedPost.dislikes.includes(user._id))
            setUserLiked(updatedPost.likes.includes(user._id))
            sadhonk.play()
        } catch(err) {
            console.error(err)
        }
    }

    function navigateToShow() {
        navigate(`/view/${post._id}`)
    }

    function colorLikeArrows(buttonType) {
        if(buttonType === "like") {
            if(userLiked) return "blue"
            return "gray"
        }
        if(userDisliked) return "orangered"
        return "gray"
    }

    let likeButtonColor = colorLikeArrows("like")
    let dislikeButtonColor = colorLikeArrows("dislike")

    return (
        <div onClick={navigateToShow} className="post-item">
            <span className="post-title">{post.title}</span>
            <p className="post-text">{post.text}</p>
            <div className="likes-container">
                <span
                    className="like-button"
                    onClick={likePost}
                    style={{ color: likeButtonColor }}
                >
                    ⬆︎
                </span>
                <span>{likeTotal}</span>
                <span 
                    className="dislike-button" 
                    onClick={dislikePost}
                    style={{ color: dislikeButtonColor }}
                >
                    ⬇︎
                </span>
            </div>
            <p className="comment-count">Comments: {post.comments.length}</p>
            <p className="post-owner">Posted By: {post.owner.name}</p>
        </div>
    )
}