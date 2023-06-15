import { useNavigate } from 'react-router-dom'
import CommentList from '../../components/CommentList/CommentList'
import CommentInput from '../../components/CommentInput/CommentInput'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TbArrowBigUpFilled, TbArrowBigDownFilled } from "react-icons/tb"
import useSounds from '../../hooks/useSounds'
import { 
    useLazyFetchPostQuery, 
    useLikePostMutation, 
    useDislikePostMutation, 
    useDeletePostMutation 
} from '../../store'

export default function PostShowItem({ user }) {
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [likeTotal, setLikeTotal] = useState(0)
    const [userLiked, setUserLiked] = useState(false)
    const [userDisliked, setUserDisliked] = useState(false)
    const [ fetchPost, { isFetching, error } ] = useLazyFetchPostQuery()
    const [ likePost ] = useLikePostMutation()
    const [ dislikePost ] = useDislikePostMutation()
    const [ deletePost ] = useDeletePostMutation()
    const { bikeHornSound, sadHonkSound } = useSounds()

    const { postId } = useParams()

    useEffect(function () {
        window.scrollTo(0, 0)
        async function getPost(postId) {
            try {
                const { data } = await fetchPost(postId)
                setPost(data)
                setComments(data.comments)
                setLikeTotal(data.likes.length - data.dislikes.length)
                setUserLiked(data.likes.includes(user._id))
                setUserDisliked(data.dislikes.includes(user._id))
            } catch (err) {
                console.error(err)
            }
        }
        getPost(postId)
    }, [postId, user, fetchPost])

    const navigate = useNavigate()

    function handleDelete() {
        deletePost(postId)
            .unwrap()
            .then(() => navigate('/'))
            .catch(err => console.error(err))
    }

    function handleLikePost() {
        bikeHornSound()
        likePost(postId)
            .unwrap()
            .then(updatedPost => {
                setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
                setUserLiked(updatedPost.likes.includes(user._id))
                setUserDisliked(updatedPost.dislikes.includes(user._id))
            })
            .catch(err => console.error(err))
    }

    function handleDislikePost() {
        sadHonkSound()
        dislikePost(postId)
            .unwrap()
            .then(updatedPost => {
                setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
                setUserLiked(updatedPost.likes.includes(user._id))
                setUserDisliked(updatedPost.dislikes.includes(user._id))
            })
            .catch(err => console.error(err))
    }

    function handleUpdate() {
        navigate(`/update/${post._id}`)
    }

    return (
        <>
            <div className="post">
                { isFetching && <div>Loading Post...</div>}
                {error && <div>Error loading post. Please refresh page.</div>}
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
                        onClick={handleLikePost}
                        style={{ color: userLiked && "blue" }}
                    >
                        <TbArrowBigUpFilled />
                    </span>
                    <span>{likeTotal}</span>
                    <span
                        className='dislike-button'
                        onClick={handleDislikePost}
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
