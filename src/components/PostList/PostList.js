import PostListItem from "../PostListItem/PostListItem"
import { useState, useEffect } from "react"
import Paginate from "../Paginate/Paginate"

export default function PostList({posts, user}) {
    const [displayed, setDisplayed] = useState(posts.slice(0,10))

    useEffect(() => {
        setDisplayed(posts.slice(0,10))
    }, [posts])

    return (
        <div className="post-container">
            {displayed.map((post, index) => (
                <PostListItem key={index} post={post} user={user}/>
            ))}
            <Paginate 
                setDisplayed={setDisplayed}
                numPerPage={10}
                pagenatedItems={posts}
            />
        </div>
    )
}