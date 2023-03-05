import { getToken } from "./users-service"
// const BASE_URL = "https://clowning-around-server.onrender.com/api/users"
const BASE_URL = "/api/users"


export async function signUp(userData) {
    try {
        return sendRequest(BASE_URL, 'POST', userData)
    } catch(err) {
        console.error(err)
    }
}

export async function logIn(credentials) {
    try {
        return sendRequest(`${BASE_URL}/log-in`, 'POST', credentials)
    } catch(err) {
        console.error(err)
    }
}

export default async function sendRequest(url, method='GET', payload=null) {
    try {
        const options = { method }
        if(payload) {
            options.headers = { 'Content-Type': 'application/json'}
            options.body = JSON.stringify(payload)
        }
        const token = getToken()
        if(token) {
            options.headers = options.headers || {}
            options.headers.Authorization = `Bearer ${token}`
        }
        const res = await fetch(url, options)
        if(res.ok) {
            if(res.status === 204) {
                return res
            } else {
                return res.json()
            }
        } else {
            throw new Error("Bad Request")
        }
    } catch(err) {
        console.error(err)
    }
}

export async function checkToken() {
    try {
        return sendRequest(BASE_URL + '/check-token')
    } catch(err) {
        console.error(err)
    }
}