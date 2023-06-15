import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { setHeaders } from "../../utilities/users-api";

const commentsApi = createApi({
    reducerPath: "comments",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL + "comment"
    }),
    endpoints(builder) {
        return {
            createComment: builder.mutation({
                query: (postId, comment) => {
                    const headers = setHeaders
                    return {
                        url: `/${postId}`,
                        method: "POST",
                        body: JSON.stringify(comment),
                        headers
                    }
                }
            }),
            deleteComment: builder.mutation({
                query: (postId, commentId) => {
                    const headers = setHeaders
                    return {
                        url: `/${postId}`,
                        method: "DELETE",
                        body: JSON.stringify(commentId),
                        headers
                    }
                }
            }),
            likeComment: builder.mutation({
                query: (postId, commentId) => {
                    const headers = setHeaders
                    return {
                        url: `/likes/${postId}`,
                        method: "PATCH",
                        body: JSON.stringify(commentId),
                        headers
                    }
                }
            }),
            dislikeComment: builder.mutation({
                query: (postId, commentId) => {
                    const headers = setHeaders
                    return {
                        url: `/dislikes/${postId}`,
                        method: "PATCH",
                        body: JSON.stringify(commentId),
                        headers
                    }
                }
            }),
        }
    }
})

export const {
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useLikeCommentMutation,
    useDislikeCommentMutation
} = commentsApi

export { commentsApi }