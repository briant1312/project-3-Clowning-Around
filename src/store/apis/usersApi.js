import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { setHeaders } from "../../utilities/users-api";

const usersApi = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL + "users"
    }),
    endpoints(builder) {
        return {
            signUp: builder.query({
                query: (userData) => {
                    const headers = setHeaders
                    return {
                        url: "/",
                        method: "POST",
                        body: JSON.stringify(userData),
                        headers
                    }
                }
            }),
            logIn: builder.query({
                query: (credentials) => {
                    const headers = setHeaders
                    return {
                        url: "/log-in",
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers
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