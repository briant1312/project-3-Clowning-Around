import { Link } from "react-router-dom"
import * as postsAPI from '../../utilities/posts-api'
import { useState } from "react"

export default function PostItem({post}) {
    const [likeTotal, setLikeTotal] = useState(post.likes.length - post.dislikes.length)

    async function likePost() {
        const updatedPost = await postsAPI.likePost(post._id)
        setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
    }

    async function dislikePost() {
        const updatedPost = await postsAPI.dislikePost(post._id)
        setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
    }

    return (
        <div className="post-item">
            <Link to={`/view/${post._id}`}><div>{post.title}</div></Link>
            <button onClick={likePost}>Like</button>
                {likeTotal}
            <button onClick={dislikePost}>Dislike</button>
        </div>
    )
}