import { Link } from "react-router-dom"

export default function PostItem({post}) {
    return (
        <Link to={`/view/${post._id}`}><div>{post.title}</div></Link>
    )
}