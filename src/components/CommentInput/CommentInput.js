import React from 'react'
import { useState } from 'react'
import * as commentAPI from '../../utilities/comment-api'
import * as postAPI from '../../utilities/posts-api'
import { useParams } from 'react-router-dom'

export default function CommentInput({user, setComments}) {
    const [text, setText] = useState("")
    const {postId} = useParams()

    function handleChange(event) {
        setText(event.target.value)
    }

    async function handleSubmit() {
      try {
        const newComment = {text, owner: user._id}
        await commentAPI.createComment(postId, newComment)
        const post = await postAPI.show(postId)
        setComments(post.comments)
        setText("")
      } catch(err) {
        console.error(err)
      }
    }

  return (
    <>
    <textarea
    value={text}
    placeholder='Enter Comment Here'
    onChange={handleChange}
    className="new-comment-input"
    >{text}</textarea>
    <button className='new-comment-submit button' onClick={handleSubmit}>Submit</button>
    </>
  )
}
