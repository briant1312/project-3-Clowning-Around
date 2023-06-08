import Comment from "../Comment/Comment"

export default function CommentList({comments, user, setComments}) {
    return (
        <div>{
            comments && comments.map((comment, index) => (
                <Comment setComments={setComments} user={user} comment={comment} key={index} />
            ))
        }</div>

    )
}