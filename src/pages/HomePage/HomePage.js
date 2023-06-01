import PostList from "../../components/PostList/PostList"

export default function HomePage({ user }) {

    function handleClick() {
        window.scrollTo(0, 0)
    }

    return (
        <div>
            <PostList user={user} />
            <p onClick={handleClick} className="back-to-top">Back to Top</p>
        </div>
    )
}