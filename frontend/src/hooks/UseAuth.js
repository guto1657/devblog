//imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//hooks
import useFlashMessage from "./UseFlashMessage";

export const useAuth = () => {
    //initial states
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    //hooks
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();

    //check if user has token
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setAuthenticated(true);
        }
    }, []);

    //function to register user
    async function register(user) {
        setLoading(true);
        let msgType = "success";
        let msgText = "Cadastro realizado com sucesso!";

        try {
            const response = await fetch(
                `${process.env.VITE_APP_API}/users/register`,
                {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
            }

            const data = await response.json();

            authUser(data);
        } catch (err) {
            msgType = "error";
            msgText = err.message;
            console.log(err.message);
        }
        setLoading(false);
        setFlashMessage(msgText, msgType);
    }

    //Function to login user
    async function login(user) {
        setLoading(true);
        let msgType = "success";
        let msgText = "Login realizado com sucesso!";

        try {
            const response = await fetch(
                `${process.env.VITE_APP_API}/users/login`,
                {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                const responseError = await response.json();
                throw new Error(responseError.message);
            }

            const data = await response.json();

            authUser(data);
        } catch (err) {
            msgType = "error";
            msgText = err.message;
            console.log(err.message);
        }

        setLoading(false);
        setFlashMessage(msgText, msgType);
    }

    //function to logout user
    function logout() {
        let msgType = "success";
        let msgText = "Logout realizado com sucesso!";

        setAuthenticated(false);
        localStorage.removeItem("token");
        navigate("/");
        setFlashMessage(msgText, msgType);
    }

    //function to check current user
    async function checkUser() {
        try {
            const token = localStorage.getItem("token") || "";
            const response = await fetch(
                `${process.env.VITE_APP_API}/users/checkuser`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                            token ? JSON.parse(token) : ""
                        }`,
                    },
                }
            );

            if (!response.ok) {
                const responseError = await response.json();
                throw new Error(responseError.message);
            }

            const data = await response.json();

            return data;
        } catch (err) {
            console.log(err.message);
        }
    }

    //function to authenticated user and save token in LocalStorage
    function authUser(data) {
        setAuthenticated(true);
        localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/");
    }

    return { authenticated, loading, register, login, logout, checkUser };
};
