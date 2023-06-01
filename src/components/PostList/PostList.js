import PostListItem from "../PostListItem/PostListItem"
import { useState, useEffect } from "react"
import * as postsAPI from "../../utilities/posts-api"

export default function PostList({ user }) {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [endOfResults, setEndOfResults] = useState(false)

    let isLoading = false

    useEffect(() => {
        async function getPosts() {
            try {
                isLoading = true
                const posts = await postsAPI.index(page)
                setPosts(posts)
                setPage(2)
                isLoading = false
            } catch (err) {
                console.error(err)
                isLoading = false
            }
        }

        getPosts()
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if(endOfResults) return;
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [page, endOfResults])

    async function handleScroll() {
        if(isLoading) return
        const scrollHeight = window.scrollY
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        if(totalHeight - scrollHeight < 25) {
            try {
                isLoading = true
                const newPosts = await postsAPI.index(page)
                if(!newPosts.length) setEndOfResults(true)
                setPosts([...posts, ...newPosts])
                setPage(prev => prev + 1)
                isLoading = false
            } catch (err) {
                console.error(err)
                isLoading = false
            }
        }
    }   

    return (
        <div className="post-container">
            {posts && posts.map((post) => (
                <PostListItem key={post._id} post={post} user={user} />
            ))}
        </div>
    )
}