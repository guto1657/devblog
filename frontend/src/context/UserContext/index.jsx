//imports
import React from "react";
import { createContext } from "react";
//hooks
import { useAuth } from "../../hooks/UseAuth";

export const Context = createContext();

export const UserProvider = ({ children }) => {
    const { authenticated, loading, register, login, logout, checkUser } =
        useAuth();

    return (
        <Context.Provider
            value={{
                authenticated,
                loading,
                register,
                login,
                logout,
                checkUser,
            }}
        >
            {children}
        </Context.Provider>
    );
};
