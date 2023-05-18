import sendRequest from "./users-api";
const BASE_URL = process.env.REACT_APP_BASE_URL + "comment"

export async function createComment(postId, comment) {
    try {
        const post = await sendRequest(`${BASE_URL}/${postId}`, 'POST', comment)
        return post
    } catch(err) {
        console.error(err)
    }
}

export async function deleteComment(postId, commentId) {
    try {
        await sendRequest(`${BASE_URL}/${postId}`, 'DELETE', commentId)
        return 
    } catch (err) {
        console.error(err)
    }
}

//Adding Like and Dislike to Comments 

export async function likeComment(postId,commentId) {
    try {
        const likedComment = await sendRequest(`${BASE_URL}/likes/${postId}`,'PATCH', commentId)
        return likedComment
    } catch(err) {
        console.error(err)
    }
}

//Body needs to include the comment.id

export async function dislikeComment(postId,commentId) {
   try {
        const dislikedComment = await sendRequest(`${BASE_URL}/dislikes/${postId}`,'PATCH', commentId)
        return dislikedComment
   } catch(err) {
    console.error(err)
   }
}