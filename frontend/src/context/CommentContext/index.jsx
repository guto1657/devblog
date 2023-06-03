//imports
import React from "react";
import { createContext } from "react";
//hooks
import { useComment } from "../../hooks/useComment";

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
    const {
        isLoading,
        createComment,
        editComment,
        removeComment,
        getCommentsByPostId,
        getUserComments,
    } = useComment();

    return (
        <CommentContext.Provider
            value={{
                isLoading,
                createComment,
                editComment,
                removeComment,
                getCommentsByPostId,
                getUserComments,
            }}
        >
            {children}
        </CommentContext.Provider>
    );
};
