import PostShowItem from '../../components/PostShowItem/PostShowItem'

export default function ShowPage({ user }) {

    function handleClick() {
        window.scrollTo(0, 0)
    }

    return (
        <div className="show-page">
            <PostShowItem user={user} />
            <p onClick={handleClick} className='back-to-top'>Back to Top</p>
        </div>
    )
}