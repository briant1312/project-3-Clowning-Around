import React from 'react'
import { useState } from 'react'
import * as commentAPI from '../../utilities/comment-api'
import { useParams } from 'react-router-dom'

export default function CommentInput({user, setComments}) {
    const [text, setText] = useState("")
    const {postId} = useParams()

    function handleChange(event) {
        setText(event.target.value)
    }

    async function handleSubmit() {
        const newComment = {text, owner: user._id}
        const post = await commentAPI.createComment(postId, newComment)
        setComments(post.comments)
        setText("")
    }

  return (
    <>
    <textarea
    value={text}
    placeholder='Enter Comment Here'
    onChange={handleChange}
    >{text}</textarea>
    <button onClick={handleSubmit}>Submit</button>
    </>
  )
}
