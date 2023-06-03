//Imports
import { useState } from "react";
//Hooks
import useFlashMessage from "./UseFlashMessage";
//Helpers
import { getToken } from "../helpers/getToken";

export const useComment = () => {
    //initial states
    const [isLoading] = useState(false);
    //hook
    const { setFlashMessage } = useFlashMessage();

    //FUNCTION TO CREATE COMMENTS
    const createComment = async (postId, commentText, successCallbackFn) => {
        // Get the current token
        const token = getToken();

        let msgType = "success";
        let msgText;

        try {
            const response = await fetch(
                `${process.env.VITE_APP_API}/comments/create`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        postId: postId,
                        commentText: commentText,
                    }),
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
            }

            const data = await response.json();

            msgText = data.message;
        } catch (err) {
            msgType = "error";
            msgText = err.message;
            console.log(err.message);
        }

        setFlashMessage(msgText, msgType);

        if (msgType === "success" && successCallbackFn) {
            successCallbackFn();
        }
    };

    //FUNCTION TO EDIT COMMENT
    const editComment = async (
        postId,
        commentId,
        newCommentText,
        successCallbackFn
    ) => {
        // Get the current token
        const token = getToken();

        let msgType = "success";
        let msgText;

        try {
            const response = await fetch(
                `${process.env.VITE_APP_API}/comments/update/${commentId}`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        postId: postId,
                        commentText: newCommentText,
                    }),
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
            }

            const data = await response.json();

            msgText = data.message;
        } catch (err) {
            msgType = "error";
            msgText = err.message;
            console.log(err.message);
        }

        setFlashMessage(msgText, msgType);

        if (msgType === "success" && successCallbackFn) {
            successCallbackFn();
        }
    };

    //FUNCTION TO REMOVE COMMENT
    const removeComment = async (commentId, successCallbackFn) => {
        // Get the current token
        const token = getToken();

        let msgType = "success";
        let msgText;

        try {
            const response = await fetch(
                `${process.env.VITE_APP_API}/comments/remove/${commentId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
            }

            const data = await response.json();

            msgText = data.message;
        } catch (err) {
            msgType = "error";
            msgText = err.message;
            console.log(err.message);
        }

        setFlashMessage(msgText, msgType);

        if (msgType === "success" && successCallbackFn) {
            successCallbackFn();
        }
    };

    //FUNCTION TO GET COMMENTS BY POST ID
    const getCommentsByPostId = async (postId) => {
        try {
            const response = await fetch(
                `${process.env.VITE_APP_API}/comments/post/${postId}`
            );

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
            }

            const data = await response.json();

            return data;
        } catch (err) {
            console.log(err.message);
        }
    };

    //GET USER COMMENTS
    const getUserComments = async () => {
        try {
            // Get the current token
            const token = getToken();

            const response = await fetch(
                `${process.env.VITE_APP_API}/comments/mycomments`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
            }

            const data = await response.json();

            return data;
        } catch (err) {
            console.log(err.message);
        }
    };

    return {
        isLoading,
        createComment,
        editComment,
        removeComment,
        getCommentsByPostId,
        getUserComments,
    };
};
