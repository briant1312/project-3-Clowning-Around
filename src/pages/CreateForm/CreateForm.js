import React from 'react'
import { useState } from 'react'

export default function CreateForm() {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const handleTitleChange = (event) => {
        setTitle (event.target.value)

    }

    const handleTextChange = (event) => {
        setText (event.target.value)
    }

    return (
        <div className='create-container'>
            <form>
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
