import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const usersApi = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL + "users"
    }),
    endpoints(builder) {
        return {
            signUp: builder.query({
                query: (userData) => {
                    return {
                        url: "/",
                        method: "POST",
                        body: JSON.stringify(userData)
                    }
                }
            }),
            logIn: builder.query({
                query: (credentials) => {
                    return {
                        url: "/log-in",
                        method: "POST",
                        body: JSON.stringify(credentials)
                    }
                }
            })
        }
    }
})

export const {
    useSignUpQuery,
    useLogInQuery
} = { usersApi }

export { usersApi }