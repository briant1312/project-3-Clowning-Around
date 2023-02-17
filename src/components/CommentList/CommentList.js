import Comments from "../Comments/Comments"

export default function CommentList({comments, user, setComments}) {
    return (
        <div>{
            comments && comments.map((comment, index) => (
                <Comments setComments={setComments} user={user} comment={comment} key={index} />
            ))
        }</div>

    )
}