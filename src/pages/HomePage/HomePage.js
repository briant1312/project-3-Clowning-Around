import PostList from "../../components/PostList/PostList"
import { useState, useEffect } from "react"
import * as postsAPI from "../../utilities/posts-api"


function HomePage() {
    const [posts, setPosts] = useState([])

    useEffect(function() {
        async function getPosts(){
            const posts = await postsAPI.index()
            setPosts(posts)
        }
        getPosts()
    }, [])


  return (
    <>
    <PostList posts={posts}/>
    </>
  )
}

export default HomePage