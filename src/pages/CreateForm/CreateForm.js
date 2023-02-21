import React from 'react'
import { useState } from 'react'
import * as postsAPI from '../../utilities/posts-api'
import { useNavigate } from "react-router-dom"


export default function CreateForm({user}) {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    window.scrollTo(0, 0)

    const navigate = useNavigate()

    const handleTitleChange = (event) => {
        setTitle (event.target.value)
    }

    const handleTextChange = (event) => {
        setText (event.target.value)
    }

    async function handleSubmit(event) {
        try {
            event.preventDefault()
            const postData = {title, text, owner: user._id}
            await postsAPI.create(postData)
            navigate('/')
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <div className='create-container'>
            <form className='create-post-form' onSubmit={handleSubmit}>
            <h3 className='new-post-title'>Create New Post</h3>
                <input
                    type='text'
                    name='title'
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Title"
                ></input>
                <textarea
                    name='text'
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Text"
                ></textarea>
                <button className='button' type='submit'>Submit</button>
            </form>
        </div>
    )
}
