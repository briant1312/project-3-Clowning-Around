import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const postsApi = createApi({
    reducerPath: "posts",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL + "post"
        // i might be able to use fetchFn to run sendrequest
        // once i make that into a custom hook
    }),
    endpoints(builder) {
        return {
            fetchAllPosts: builder.query({
                query: (page) => {
                    return {
                        url: `/?page=${page}`,
                        method: "GET"
                    }
                }
            }),
            fetchPost: builder.query({
                query: (postId) => {
                    return {
                        url: `/${postId}`,
                        method: "GET"
                    }
                }
            }),
            createPost: builder.mutation({
                query: (postData) => {
                    return {
                        url: "/",
                        method: "POST",
                        body: JSON.stringify(postData)
                    }
                }
            }),
            deletePost: builder.mutation({
                query: (postId) => {
                    return {
                        url: `/${postId}`,
                        method: "DELETE"
                    }
                }
            }),
            updatePost: builder.mutation({
                query: (postId, postData) => {
                    return {
                        url: `/${postId}`,
                        method: "PATCH",
                        body: JSON.stringify(postData)
                    }
                }
            }),
            likePost: builder.mutation({
                query: (postId) => {
                    return {
                        url: `/likes/${postId}`,
                        method: "PATCH"
                    }
                }
            }),
            dislikePost: builder.mutation({
                query: (postId) => {
                    return {
                        url: `/dislikes/${postId}`,
                        method: "PATCH"
                    }
                }
            }),
        }
    }
})

export const {
    useFetchAllPostsQuery,
    useFetchPostQuery,
    useCreatePostMutation,
    useDeletePostMutation,
    useUpdatePostMutation,
    useLikePostMutation,
    useDislikePostMutation
} = postsApi;

export { postsApi }