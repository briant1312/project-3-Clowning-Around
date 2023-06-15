import * as postsAPI from '../../utilities/posts-api'
import { useNavigate } from 'react-router-dom'
import CommentList from '../../components/CommentList/CommentList'
import CommentInput from '../../components/CommentInput/CommentInput'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TbArrowBigUpFilled, TbArrowBigDownFilled } from "react-icons/tb"
import useSounds from '../../hooks/useSounds'

export default function PostShowItem({ user }) {
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [likeTotal, setLikeTotal] = useState(0)
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const { bikeHornSound, sadHonkSound } = useSounds()

    const { postId } = useParams()

    useEffect(function () {
        async function getPost(postId) {
            try {
                const post = await postsAPI.show(postId)
                setPost(post)
                setComments(post.comments)
                setLikeTotal(post.likes.length - post.dislikes.length)
                setUserLiked(post.likes.includes(user._id))
                setUserDisliked(post.dislikes.includes(user._id))
            } catch (err) {
                console.error(err)
            }
        }
        getPost(postId)
        window.scrollTo(0, 0)
    }, [postId, user])

    const navigate = useNavigate()

    async function handleDelete() {
        try {
            await postsAPI.deletePost(postId)
            navigate('/')
        } catch (err) {
            console.error(err)
        }
    }

    async function likePost() {
        try {
            const updatedPost = await postsAPI.likePost(post._id)
            setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
            setUserLiked(updatedPost.likes.includes(user._id))
            setUserDisliked(updatedPost.dislikes.includes(user._id))
            bikeHornSound()
        } catch (err) {
            console.error(err)
        }
    }

    async function dislikePost() {
        try {
            const updatedPost = await postsAPI.dislikePost(post._id)
            setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
            setUserLiked(updatedPost.likes.includes(user._id))
            setUserDisliked(updatedPost.dislikes.includes(user._id))
            sadHonkSound()
        } catch (err) {
            console.error(err)
        }
    }

    function handleUpdate() {
        navigate(`/update/${post._id}`)
    }

    return (
        <>
            <div className="post">
                <h2>{post.title}</h2>
                <p>{post.text}</p>
                <div className="owner-button-container">
                    {
                        post.owner?._id === user._id &&
                        <button className='button' onClick={handleUpdate}>Update</button>
                    }
                    {
                        post.owner?._id === user._id &&
                        <button className='button' onClick={handleDelete}>Delete</button>
                    }
                </div>
                <div className="likes-container">
                    <span
                        className='like-button'
                        onClick={likePost}
                        style={{ color: userLiked && "blue" }}
                    >
                        <TbArrowBigUpFilled />
                    </span>
                    <span>{likeTotal}</span>
                    <span
                        className='dislike-button'
                        onClick={dislikePost}
                        style={{ color: userDisliked && "orangered" }}
                    >
                        <TbArrowBigDownFilled />
                    </span>
                </div>
                <p className='post-owner'>Posted By: {post.owner && post.owner.name}</p>
            </div>
            <CommentInput setComments={setComments} user={user} />
            <h3>Comments</h3>
            <CommentList setPost={setPost} setComments={setComments} user={user} comments={comments} />
        </>
    )
}
