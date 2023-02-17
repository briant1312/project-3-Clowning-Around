import sendRequest from "./users-api";
const BASE_URL = "/api/post"

export async function index() {
    const posts = await sendRequest(BASE_URL)
    return posts
}

export async function show(postId) {
    const post = await sendRequest(`/${BASE_URL}/${postId}`)
    return post
}

export async function create(postData) {
    const post = await sendRequest(BASE_URL, 'POST', postData)
    return post
}