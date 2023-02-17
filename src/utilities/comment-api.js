import sendRequest from "./users-api";
const BASE_URL = "/api/comment"

export async function createComment(postId, comment) {
    await sendRequest(`${BASE_URL}/${postId}`, 'POST', comment)
    return
}