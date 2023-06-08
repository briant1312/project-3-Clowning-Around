import PostListItem from "../PostListItem/PostListItem"
import { useState, useEffect, useRef, useCallback } from "react"
import * as postsAPI from "../../utilities/posts-api"

export default function PostList({ user }) {
    const [posts, setPosts] = useState([])

    const pageRef = useRef(1);
    const endOfResultsRef = useRef(false);
    const isLoadingRef = useRef(false);

    useEffect(() => {
        async function getPosts() {
            try {
                isLoadingRef.current = true
                const posts = await postsAPI.index(pageRef.current)
                setPosts(posts)
                pageRef.current = 2;
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
                const newPosts = await postsAPI.index(pageRef.current)
                if(!newPosts.length) endOfResultsRef.current = true;
                setPosts([...posts, ...newPosts])
                pageRef.current = pageRef.current + 1;
                isLoadingRef.current = false
            } catch (err) {
                console.error(err)
                isLoadingRef.current = false
            }
        }
    }, [posts])

    useEffect(() => {
        if(endOfResultsRef.current) return;
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [handleScroll])

    return (
        <div className="post-container">
            {posts && posts.map((post) => (
                <PostListItem key={post._id} post={post} user={user} />
            ))}
        </div>
    )
}