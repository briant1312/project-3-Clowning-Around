import PostItem from "../PostItem/PostItem"

export default function PostList({posts}) {
    return (
        <div className="post-container">
            {posts.map((post, index) => (
                <PostItem key={index} post={post}/>
            ))}
        </div>
    )
}