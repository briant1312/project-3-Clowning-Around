import PostListItem from "../PostListItem/PostListItem"
import { useState, useEffect, useRef, useCallback } from "react"
import * as postsAPI from "../../utilities/posts-api"

export default function PostList({ user }) {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [endOfResults, setEndOfResults] = useState(false)

    const isLoadingRef = useRef(false);

    useEffect(() => {
        async function getPosts() {
            try {
                isLoadingRef.current = true
                const posts = await postsAPI.index(page)
                setPosts(posts)
                setPage(2)
                isLoadingRef.current = false
            } catch (err) {
                console.error(err)
                isLoadingRef.current = false
            }
        }

        getPosts()
        window.scrollTo(0, 0)
    }, [])

    const handleScroll = useCallback(async () => {
        if(isLoadingRef.current) return
        const scrollHeight = window.scrollY
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        if(totalHeight - scrollHeight < 100) {
            try {
                isLoadingRef.current = true
                const newPosts = await postsAPI.index(page)
                if(!newPosts.length) setEndOfResults(true)
                setPosts([...posts, ...newPosts])
                setPage(prev => prev + 1)
                isLoadingRef.current = false
            } catch (err) {
                console.error(err)
                isLoadingRef.current = false
            }
        }
    }, [page, posts])

    useEffect(() => {
        if(endOfResults) return;
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [page, endOfResults, handleScroll])

    return (
        <div className="post-container">
            {posts && posts.map((post) => (
                <PostListItem key={post._id} post={post} user={user} />
            ))}
        </div>
    )
}