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