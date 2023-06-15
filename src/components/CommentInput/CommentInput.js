import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCreateCommentMutation } from '../../store'

export default function CommentInput({ user, setComments }) {
    const [text, setText] = useState("")
    const { postId } = useParams()
    const [createComment] = useCreateCommentMutation()

    function handleChange(event) {
        setText(event.target.value)
    }

    function handleSubmit() {
        const comment = { text, owner: user._id }
        createComment({ postId, comment })
            .unwrap()
            .then(comments => {
                setComments(comments)
                setText("")
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <textarea
                value={text}
                placeholder='Enter Comment Here'
                onChange={handleChange}
                className="new-comment-input"
            >
                {text}
            </textarea>
            <button className='new-comment-submit button' onClick={handleSubmit}>Submit</button>
        </>
    )
}
