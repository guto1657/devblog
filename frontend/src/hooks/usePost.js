//imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//hooks
import useFlashMessage from "./UseFlashMessage";
//helpers
import { getToken } from "../helpers/getToken";

export const usePost = () => {
    //initial states
    const [isLoading, setIsLoading] = useState(false);
    //hook
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();

    //function to create post
    const createPost = async (post) => {
        // Get the current token
        const token = getToken();

        let msgType = "success";
        let msgText = "";
        setIsLoading(true);

        try {
            const formData = new FormData();

            Object.keys(post).forEach((key) => {
                formData.append(key, post[key]);
            });

            const response = await fetch(
                `${process.env.VITE_APP_API}/posts/create`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const responseError = await response.json();
                throw new Error(responseError.message);
            }

            const responseJson = await response.json();

            msgText = responseJson.message;
        } catch (err) {
            msgType = "error";
            msgText = err.message;
            console.log(err);
        }

        setIsLoading(false);

        if (msgType !== "error") {
            navigate("/home");
        }

        setFlashMessage(msgText, msgType);
    };

    //function to edit post
    const editPost = async (post) => {
        // Get the current token
        const token = getToken();

        let msgType = "success";
        let msgText = "";
        setIsLoading(true);

        try {
            const formData = new FormData();

            Object.keys(post).forEach((key) => {
                formData.append(key, post[key]);
            });

            const response = await fetch(
                `${process.env.VITE_APP_API}/posts/update/${post._id}`,
                {
                    method: "PATCH",
                    body: formData,
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const responseError = await response.json();
                throw new Error(responseError.message);
            }

            const responseJson = await response.json();

            msgText = responseJson.message;
        } catch (err) {
            msgType = "error";
            msgText = err.message;
            console.log(err);
        }

        setIsLoading(false);

        if (msgType == "success") {
            navigate("/users/dashboard");
        }

        setFlashMessage(msgText, msgType);
    };

    //function to remove post
    const removePost = async (postId, successCallbackFn) => {
        // Get the current token
        const token = getToken();

        let msgType = "success";
        let msgText;

        try {
            const response = await fetch(
                `${process.env.VITE_APP_API}/posts/remove/${postId}`,
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

    //function to get all user posts
    const getUserPosts = async () => {
        try {
            // Get the current token
            const token = getToken();

            const response = await fetch(
                `${process.env.VITE_APP_API}/posts/myposts`,
                {
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
            console.log(err);
        }
    };

    //function get all posts
    const getAllPosts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.VITE_APP_API}/posts/all`
            );
            const data = await response.json();

            setIsLoading(false);
            return data;
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            return null;
        }
    };

    //function to get post by Id
    async function getPostById(postId) {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.VITE_APP_API}/posts/post/${postId}`
            );

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
            }

            const data = await response.json();

            setIsLoading(false);
            return data;
        } catch (err) {
            setIsLoading(false);
            return null;
        }
    }

    return {
        isLoading,
        createPost,
        editPost,
        removePost,
        getUserPosts,
        getAllPosts,
        getPostById,
    };
};
