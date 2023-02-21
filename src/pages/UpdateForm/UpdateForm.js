import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as postsAPI from "../../utilities/posts-api"

export default function UpdateForm() {
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
        try {
          const post = await postsAPI.show(postId)
          setTitle(post.title)
          setText(post.text)
        } catch(err) {
          console.error(err)
        }
      }
      getPost(postId)
      window.scrollTo(0, 0)
    }, [postId])

    async function handleSubmit(event) {
        try {
          event.preventDefault()
          const postData = {title, text}
          const updatedPost = await postsAPI.update(postId, postData)
          navigate(`/view/${updatedPost._id}`)
        } catch(err) {
          console.error(err)
        }
    }

  return (
    <div className='create-container'>
            <form className="update-post-form" onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    value={title}
                    onChange={handleTitleChange}
                ></input>
                <textarea
                    name='text'
                    value={text}
                    onChange={handleTextChange}
                ></textarea>
                <button className="button" type='submit'>Submit</button>
            </form>
        </div>
  )
}

