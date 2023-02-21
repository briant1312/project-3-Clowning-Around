import React, { useState, useEffect } from 'react'
import Post from '../../components/Post/Post'
import CommentList from '../../components/CommentList/CommentList'
import { useParams } from 'react-router-dom'
import * as postsAPI from "../../utilities/posts-api"
import CommentInput from '../../components/CommentInput/CommentInput'
import sadhonkfile from '../../audio/sadhonk.mp3'


function ShowPage({user}) {
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [likeTotal, setLikeTotal] = useState(0 && post.likes.length - post.dislikes.length)
  const honk = new Audio("http://www.bubbasmonkey.com/COWS/bikehorn.wav")
  let sadhonk = new Audio(sadhonkfile)
  sadhonk.playbackRate = 2


  const { postId } = useParams()

  useEffect(function() {
    async function getPost(postId) {
      try {
        const post = await postsAPI.show(postId)
        setPost(post)
        setComments(post.comments)
        setLikeTotal(post.likes.length - post.dislikes.length)
      } catch(err) {
        console.error(err)
      }
    }
    getPost(postId)
    window.scrollTo(0, 0)
  }, [postId])

  async function likePost() {
    try {
      const updatedPost = await postsAPI.likePost(post._id)
      setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
      honk.play()
    } catch(err) {
      console.error(err)
    }
}

async function dislikePost() {
    try {
      const updatedPost = await postsAPI.dislikePost(post._id)
      setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
      sadhonk.play()
    } catch(err) {
      console.error(err)
    }
}

function handleClick() {
  window.scrollTo(0, 0)
}

  return (
    <div className="show-page">
    <Post 
      likeTotal={likeTotal}
      user={user} 
      post={post}
      likePost={likePost}
      dislikePost={dislikePost}
    />
    <CommentInput setComments={setComments} user={user} />
    <h3>Comments</h3>
    <CommentList setPost={setPost} setComments={setComments} user={user} comments={comments}/>
    <p onClick={handleClick} className='back-to-top'>Back to Top</p>
    </div>
  )
}

export default ShowPage