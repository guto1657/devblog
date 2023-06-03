//imports
import React from "react";
import { createContext } from "react";
//hooks
import { usePost } from "../../hooks/usePost";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const {
        isLoading,
        createPost,
        editPost,
        removePost,
        getUserPosts,
        getAllPosts,
        getPostById,
    } = usePost();

    return (
        <PostContext.Provider
            value={{
                isLoading,
                createPost,
                editPost,
                removePost,
                getUserPosts,
                getAllPosts,
                getPostById,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
