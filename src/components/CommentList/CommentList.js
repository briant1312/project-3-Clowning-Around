import Comments from "../Comments/Comments"

export default function CommentList({comments}) {
    return (
        <div>{
            comments && comments.map((comment, index) => (
                <Comments comment={comment} key={index} />
            ))
        }</div>

    )
}