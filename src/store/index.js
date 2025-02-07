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
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(usersApi.middleware)
            .concat(postsApi.middleware)
            .concat(commentsApi.middleware)
    }
})

setupListeners(store.dispatch);

export {
    useSignUpQuery,
    useLogInQuery
} from "./apis/usersApi"

export {
    useLazyFetchAllPostsQuery,
    useLazyFetchPostQuery,
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