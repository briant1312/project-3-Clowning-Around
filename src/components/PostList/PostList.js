import PostListItem from "../PostListItem/PostListItem"
import { useState, useEffect } from "react"
import Paginate from "../Paginate/Paginate"
import * as postsAPI from "../../utilities/posts-api"

export default function PostList({ user }) {
    const [displayed, setDisplayed] = useState()
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

    useEffect(() => {
        setDisplayed(posts.slice(0, 10))
    }, [posts])

    return (
        <div className="post-container">
            {displayed && displayed.map((post, index) => (
                <PostListItem key={index} post={post} user={user} />
            ))}
            <Paginate
                setDisplayed={setDisplayed}
                numPerPage={10}
                pagenatedItems={posts}
            />
        </div>
    )
}