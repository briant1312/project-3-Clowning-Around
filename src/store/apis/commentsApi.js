import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const commentsApi = createApi({
    reducerPath: "comments",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL + "comment"
    }),
    endpoints(builder) {
        return {
            createComment: builder.mutation({
                query: (postId, comment) => {
                    return {
                        url: `/${postId}`,
                        method: "POST",
                        body: JSON.stringify(comment)
                    }
                }
            }),
            deleteComment: builder.mutation({
                query: (postId, commentId) => {
                    return {
                        url: `/${postId}`,
                        method: "DELETE",
                        body: JSON.stringify(commentId)
                    }
                }
            }),
            likeComment: builder.mutation({
                query: (postId, commentId) => {
                    return {
                        url: `/likes/${postId}`,
                        method: "PATCH",
                        body: JSON.stringify(commentId)
                    }
                }
            }),
            dislikeComment: builder.mutation({
                query: (postId, commentId) => {
                    return {
                        url: `/dislikes/${postId}`,
                        method: "PATCH",
                        body: JSON.stringify(commentId)
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