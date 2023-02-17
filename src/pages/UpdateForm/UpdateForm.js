import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as postsAPI from "../../utilities/posts-api"

export default function UpdateForm() {
    const [post, setPost] = useState({})
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const navigate = useNavigate()

    const handleTitleChange = (event) => {
        setTitle (event.target.value)
    }

    const handleTextChange = (event) => {
        setText (event.target.value)
    }

    const { postId } = useParams()
  
    useEffect(function() {
      async function getPost(postId) {
        const post = await postsAPI.show(postId)
        setTitle(post.title)
        setText(post.text)
      }
      getPost(postId)
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()
        const postData = {title, text}
        const updatedPost = await postsAPI.update(postId, postData)
        console.log(updatedPost)
        navigate(`/view/${updatedPost._id}`)
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

