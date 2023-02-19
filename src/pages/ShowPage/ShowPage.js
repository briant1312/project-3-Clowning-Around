import React, { useState, useEffect } from 'react'
import Post from '../../components/Post/Post'
import CommentList from '../../components/CommentList/CommentList'
import { useParams } from 'react-router-dom'
import * as postsAPI from "../../utilities/posts-api"
import CommentInput from '../../components/CommentInput/CommentInput'

function ShowPage({user}) {
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [likeTotal, setLikeTotal] = useState(0 && post.likes.length - post.dislikes.length)


  const { postId } = useParams()

  useEffect(function() {
    async function getPost(postId) {
      const post = await postsAPI.show(postId)
      setPost(post)
      setComments(post.comments)
      setLikeTotal(post.likes.length - post.dislikes.length)
    }
    getPost(postId)
  }, [])

  async function likePost() {
    const updatedPost = await postsAPI.likePost(post._id)
    setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
}

async function dislikePost() {
    const updatedPost = await postsAPI.dislikePost(post._id)
    setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
}

  return (
    <>
    <Post 
      likeTotal={likeTotal}
      user={user} 
      post={post}
      likePost={likePost}
      dislikePost={dislikePost}
    />
    <CommentInput setComments={setComments} user={user} />
    <CommentList setPost={setPost} setComments={setComments} user={user} comments={comments}/>
    </>
  )
}

export default ShowPage