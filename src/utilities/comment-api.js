import sendRequest from "./users-api";
const BASE_URL = "/api/comment"

export async function createComment(postId, comment) {
    const post = await sendRequest(`${BASE_URL}/${postId}`, 'POST', comment)
    return post
}

export async function deleteComment(postId, commentId) {
    await sendRequest(`${BASE_URL}/${postId}`, 'DELETE', commentId)
    return 
}

//Adding Like and Dislike to Comments 

export async function likeComment(postId,commentId) {
    const likedComment = await sendRequest(`${BASE_URL}/likes/${postId}`,'PATCH', commentId)
    return likedComment
}

//Body needs to include the comment.id

export async function dislikeComment(postId,commentId) {
   const dislikedComment = await sendRequest(`${BASE_URL}/dislikes/${postId}`,'PATCH', commentId)
    return dislikedComment
}