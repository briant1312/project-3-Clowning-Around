import { useState, useEffect } from "react"
import { useParams } from "react-router"
import * as postsAPI from "../../utilities/posts-api"

export default function Post() {
  const [post, setPost] = useState({})
  let { postId } = useParams()

  useEffect(function() {
    async function getPost(postId) {
      const post = await postsAPI.show(postId)
      setPost(post)
    }
    getPost(postId)
  }, [])

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.text}</p>
    </div>
  )
}
