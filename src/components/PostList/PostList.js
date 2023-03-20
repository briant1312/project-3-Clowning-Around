import PostItem from "../PostItem/PostItem"
import { useState, useEffect } from "react"
import Paginate from "../Paginate/Paginate"

export default function PostList({posts}) {
    const [displayed, setDisplayed] = useState(posts.slice(0,10))

    useEffect(() => {
        setDisplayed(posts.slice(0,10))
    }, [posts])

    return (
        <div className="post-container">
            {displayed.map((post, index) => (
                <PostItem key={index} post={post}/>
            ))}
            <Paginate 
                setDisplayed={setDisplayed}
                numPerPage={10}
                pagenatedItems={posts}
            />
        </div>
    )
}