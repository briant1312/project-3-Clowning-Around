import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { usersApi } from "./apis/usersApi";
import { postsApi } from "./apis/postsApi";
import { commentsApi } from "./apis/commentsApi";


export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer
    }
})

setupListeners(store.dispatch);

export {
    useSignUpQuery,
    useLogInQuery
} from "./apis/usersApi"

export {
    useFetchAllPostsQuery,
    useFetchPostQuery,
    useCreatePostMutation,
    useDeletePostMutation,
    useUpdatePostMutation,
    useLikePostMutation,
    useDislikePostMutation
} from "./apis/postsApi"

export {
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useLikeCommentMutation,
    useDislikeCommentMutation
} from "./apis/commentsApi"