import React from 'react'
import { useState } from 'react'
import * as postsAPI from '../../utilities/posts-api'
import { useNavigate } from "react-router-dom"

export default function CreateForm({user}) {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const navigate = useNavigate()

    const handleTitleChange = (event) => {
        setTitle (event.target.value)
    }

    const handleTextChange = (event) => {
        setText (event.target.value)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const postData = {title, text, owner: user._id}
        const post = await postsAPI.create(postData)
        navigate('/')
    }

    return (
        <div className='create-container'>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type='text'
                    name='title'
                    value={title}
                    onChange={handleTitleChange}
                ></input>
                <label>Text</label>
                <textarea
                    name='text'
                    value={text}
                    onChange={handleTextChange}
                ></textarea>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
