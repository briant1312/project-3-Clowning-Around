import * as usersAPI from "./users-api"

export async function signUp(userData) {
    try {
        const token = await usersAPI.signUp(userData)

        // for right now, thos won't be a token but we will be 
        // returning one eventually
        if(!token) throw new Error('')
        localStorage.setItem('token', token)
        return getUser()
    } catch(err) {
        throw new Error('')
    }
}

export function getToken() {
    // get the token from local storage
    // get the tokens payload
    //check if the token has expired
    // if it hasn't return the token
    const token = localStorage.getItem('token') 
    if(!token) return null
    // part 1 of the token is the header
    // part 2 of the token is the payload
    // part 3 of the token is signature
    const payload = token.split('.')[1]
    // JWTs are base64 encoded
    // we need to decode it to make it usable
    // javascript has a built in function for decoding base64
    // called atob()
    // atob is deprecated in node not in frontend js
    const decodedPayload = atob(payload)
    const parsedPayload = JSON.parse(decodedPayload)
    // JWTs exp is expressed in seconds, not milliseconds, so convert
    if(parsedPayload.exp < Date.now() / 1000) {
        // token has expired - remove it
        localStorage.removeItem('token')
        return null
    } else {
        return token
    }
}

export function getUser() {
    const token = getToken()
    if(token) {
        const payload = token.split('.')[1]
        const decodedPayload = atob(payload)
        const parsedPayload = JSON.parse(decodedPayload)
        return parsedPayload.user
    } else {
        return null
    }
}

export function logOut() {
    localStorage.removeItem('token')
}

export async function logIn(credentials) {
    try {
        const token = await usersAPI.logIn(credentials)
        if(!token) throw new Error('')
        localStorage.setItem('token', token)
        return getUser()
    } catch(err) {
        throw new Error(err)
    }
}

export function checkToken() {
    return usersAPI.checkToken()
        .then(dateStr => new Date(dateStr))
        .catch(console.error)
}