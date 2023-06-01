import PostListItem from "../PostListItem/PostListItem"
import { useState, useEffect } from "react"
import * as postsAPI from "../../utilities/posts-api"

export default function PostList({ user }) {
    const [posts, setPosts] = useState([])

    useEffect(function () {
        async function getPosts() {
            try {
                const posts = await postsAPI.index()
                setPosts(posts)
            } catch (err) {
                console.error(err)
            }
        }
        getPosts()
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="post-container">
            {posts && posts.map((post) => (
                <PostListItem key={post._id} post={post} user={user} />
            ))}
        </div>
    )
}