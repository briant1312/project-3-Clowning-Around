import React, { useState, useEffect } from 'react'
import Post from '../../components/Post/Post'
import CommentList from '../../components/CommentList/CommentList'
import { useParams } from 'react-router-dom'
import * as postsAPI from "../../utilities/posts-api"
import CommentInput from '../../components/CommentInput/CommentInput'

function ShowPage({user}) {
  const [post, setPost] = useState({})

  const { postId } = useParams()

  useEffect(function() {
    async function getPost(postId) {
      const post = await postsAPI.show(postId)
      setPost(post)
    }
    getPost(postId)
  }, [])

  return (
    <>
    <Post user={user} post={post}/>
    <CommentInput user={user} />
    <CommentList comments={post.comments}/>
    </>
  )
}

export default ShowPage