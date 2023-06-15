import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { setHeaders } from "../../utilities/users-api";

const postsApi = createApi({
    reducerPath: "posts",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL + "post"
    }),
    endpoints(builder) {
        return {
            fetchAllPosts: builder.query({
                query: (page) => {
                    const headers = setHeaders()
                    return {
                        url: `/?page=${page}`,
                        method: "GET",
                        headers
                    }
                }
            }),
            fetchPost: builder.query({
                query: (postId) => {
                    const headers = setHeaders()
                    return {
                        url: `/${postId}`,
                        method: "GET",
                        headers
                    }
                }
            }),
            createPost: builder.mutation({
                query: (postData) => {
                    const headers = setHeaders()
                    return {
                        url: "/",
                        method: "POST",
                        body: JSON.stringify(postData),
                        headers
                    }
                }
            }),
            deletePost: builder.mutation({
                query: (postId) => {
                    const headers = setHeaders()
                    return {
                        url: `/${postId}`,
                        method: "DELETE",
                        headers
                    }
                }
            }),
            updatePost: builder.mutation({
                query: ({ postId, postData }) => {
                    const headers = setHeaders()
                    return {
                        url: `/${postId}`,
                        method: "PATCH",
                        body: JSON.stringify(postData),
                        headers
                    }
                }
            }),
            likePost: builder.mutation({
                query: (postId) => {
                    const headers = setHeaders()
                    return {
                        url: `/likes/${postId}`,
                        method: "PATCH",
                        headers
                    }
                }
            }),
            dislikePost: builder.mutation({
                query: (postId) => {
                    const headers = setHeaders()
                    return {
                        url: `/dislikes/${postId}`,
                        method: "PATCH",
                        headers
                    }
                }
            }),
        }
    }
})

export const {
    useLazyFetchAllPostsQuery,
    useLazyFetchPostQuery,
    useCreatePostMutation,
    useDeletePostMutation,
    useUpdatePostMutation,
    useLikePostMutation,
    useDislikePostMutation
} = postsApi;

export { postsApi }