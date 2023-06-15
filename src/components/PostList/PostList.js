import PostListItem from "../PostListItem/PostListItem"
import { useState, useEffect, useRef, useCallback } from "react"
import { useLazyFetchAllPostsQuery } from "../../store"

export default function PostList({ user }) {
    const [posts, setPosts] = useState([])
    const [ fetchAllPosts, { isFetching, error }] = useLazyFetchAllPostsQuery();

    const pageRef = useRef(1);
    const endOfResultsRef = useRef(false);
    const isLoadingRef = useRef(false);

    useEffect(() => {
        async function getPosts() {
            try {
                isLoadingRef.current = true
                const { data } = await fetchAllPosts(pageRef.current)
                setPosts(data)
                pageRef.current = 2;
                isLoadingRef.current = false
            } catch (err) {
                console.error(err)
                isLoadingRef.current = false
            }
        }

        getPosts()
        window.scrollTo(0, 0)
    }, [fetchAllPosts])

    const handleScroll = useCallback(async () => {
        if(isLoadingRef.current) return
        isLoadingRef.current = true
        const scrollHeight = window.scrollY
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        if(totalHeight - scrollHeight < 100) {
            try {
                const { data } = await fetchAllPosts(pageRef.current)
                if(!data.length) endOfResultsRef.current = true;
                setPosts([...posts, ...data])
                pageRef.current = pageRef.current + 1;
                isLoadingRef.current = false
                window.removeEventListener("scroll", handleScroll)
            } catch (err) {
                console.error(err)
                isLoadingRef.current = false
            }
        } else isLoadingRef.current = false
    }, [posts, fetchAllPosts])

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
            {isFetching && <div>Loading...</div>}
            {error && <div>Error loading content. Please refresh the page</div>}
        </div>
    )
}