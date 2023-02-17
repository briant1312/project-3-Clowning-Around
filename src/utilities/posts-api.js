import sendRequest from "./users-api";
const BASE_URL = "/api/post"

export async function index() {
    const posts = await sendRequest(BASE_URL)
    return posts
}

export async function show(postId) {
    const post = await sendRequest(`${BASE_URL}/${postId}`)
    return post
}

export async function create(postData) {
    const post = await sendRequest(BASE_URL, 'POST', postData)
    return post
}

export async function deletePost(postId) {
    await sendRequest(`${BASE_URL}/${postId}`, 'DELETE')
    return
}

export async function update(postId, postData) {
    const post = await sendRequest(`${BASE_URL}/${postId}`, 'PATCH', postData)
    return post
}

export async function likePost(postId) {
    const post = await sendRequest(`${BASE_URL}/likes/${postId}`, 'PATCH')
    return post
}

export async function dislikePost(postId) {
    const post = await sendRequest(`${BASE_URL}/dislikes/${postId}`, 'PATCH')
    return post
}