import PostList from "../../components/PostList/PostList"
import { useState, useEffect } from "react"
import * as postsAPI from "../../utilities/posts-api"


function HomePage({ user }) {
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

  function handleClick() {
    window.scrollTo(0, 0)
  }


  return (
    <div>
      <PostList posts={posts} user={user}/>
      <p onClick={handleClick} className="back-to-top">Back to Top</p>
    </div>
  )
}

export default HomePage