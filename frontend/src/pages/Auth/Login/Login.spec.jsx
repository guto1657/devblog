//imports
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
//styles
import { renderTheme } from "../../../styles/render-theme";
//contexts
import { Context } from "../../../context/UserContext/index";
//components
import { Login } from "./index";

describe("<Login />", () => {
    let mockLoginFn;
    let mockAuthenticated;
    let mockLoading;

    beforeEach(() => {
        mockLoginFn = jest.fn();
        mockAuthenticated = false;
        mockLoading = false;
    });

    describe("Rendering", () => {
        it("should render Login Component", () => {
            renderTheme(
                <BrowserRouter>
                    <Context.Provider
                        value={{
                            login: mockLoginFn,
                            authenticated: mockAuthenticated,
                            loading: mockLoading,
                        }}
                    >
                        <Login />
                    </Context.Provider>
                </BrowserRouter>
            );
            const emailInput = screen.getByLabelText("Email:");
            const passwordInput = screen.getByLabelText("Senha:");
            const loginButton = screen.getByRole("button", { name: "Entrar" });

            expect(emailInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
            expect(loginButton).toBeInTheDocument();
        });

        it("should render FormHeader with headingText and subHeadingText props", () => {
            renderTheme(
                <BrowserRouter>
                    <Context.Provider
                        value={{
                            login: mockLoginFn,
                            authenticated: mockAuthenticated,
                            loading: mockLoading,
                        }}
                    >
                        <Login />
                    </Context.Provider>
                </BrowserRouter>
            );
            const heading = screen.getByRole("heading", { name: "Entrar" });
            const subHeading = screen.getByText(
                "Faça login para acessar sua conta"
            );

            expect(heading).toBeInTheDocument();
            expect(subHeading).toBeInTheDocument();
        });

        it("should render Loader Component when loading prop is true", () => {
            renderTheme(
                <BrowserRouter>
                    <Context.Provider
                        value={{
                            login: mockLoginFn,
                            authenticated: mockAuthenticated,
                            loading: true,
                        }}
                    >
                        <Login />
                    </Context.Provider>
                </BrowserRouter>
            );
            const loader = screen.getByLabelText("Loader-wrapper");

            expect(loader).toBeInTheDocument();
        });

        it("should match snapshot", () => {
            const { container } = renderTheme(
                <BrowserRouter>
                    <Context.Provider
                        value={{
                            login: mockLoginFn,
                            authenticated: mockAuthenticated,
                            loading: mockLoading,
                        }}
                    >
                        <Login />
                    </Context.Provider>
                </BrowserRouter>
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe("Functionality", () => {
        it("should call login function with user object on form submit", () => {
            renderTheme(
                <BrowserRouter>
                    <Context.Provider
                        value={{
                            login: mockLoginFn,
                            authenticated: mockAuthenticated,
                            loading: mockLoading,
                        }}
                    >
                        <Login />
                    </Context.Provider>
                </BrowserRouter>
            );
            const emailInput = screen.getByLabelText("Email:");
            const passwordInput = screen.getByLabelText("Senha:");
            const loginButton = screen.getByRole("button", { name: "Entrar" });

            fireEvent.change(emailInput, {
                target: { value: "test@test.com" },
            });
            fireEvent.change(passwordInput, {
                target: { value: "password123" },
            });
            fireEvent.click(loginButton);

            expect(mockLoginFn).toHaveBeenCalledTimes(1);
            expect(mockLoginFn).toHaveBeenCalledWith({
                email: "test@test.com",
                password: "password123",
            });
        });

        it("should update user state on input change", () => {
            renderTheme(
                <BrowserRouter>
                    <Context.Provider
                        value={{
                            login: mockLoginFn,
                            authenticated: mockAuthenticated,
                            loading: mockLoading,
                        }}
                    >
                        <Login />
                    </Context.Provider>
                </BrowserRouter>
            );
            const emailInput = screen.getByLabelText("Email:");
            const passwordInput = screen.getByLabelText("Senha:");
            fireEvent.change(emailInput, {
                target: { value: "test@test.com" },
            });
            fireEvent.change(passwordInput, { target: { value: "test123" } });

            expect(emailInput.value).toBe("test@test.com");
            expect(passwordInput.value).toBe("test123");
        });

        it("should call login function with correct user data on form submit", () => {
            const mockLoginFn = jest.fn();

            renderTheme(
                <BrowserRouter>
                    <Context.Provider
                        value={{
                            login: mockLoginFn,
                            authenticated: mockAuthenticated,
                            loading: mockLoading,
                        }}
                    >
                        <Login />
                    </Context.Provider>
                </BrowserRouter>
            );
            const emailInput = screen.getByLabelText("Email:");
            const passwordInput = screen.getByLabelText("Senha:");
            const submitButton = screen.getByRole("button", { name: "Entrar" });

            fireEvent.change(emailInput, {
                target: { value: "test@test.com" },
            });
            fireEvent.change(passwordInput, { target: { value: "test123" } });
            fireEvent.click(submitButton);

            expect(mockLoginFn).toHaveBeenCalledTimes(1);
            expect(mockLoginFn).toHaveBeenCalledWith({
                email: "test@test.com",
                password: "test123",
            });
        });

        it("should redirect to home page if user is already authenticated", () => {
            renderTheme(
                <BrowserRouter>
                    <Context.Provider
                        value={{
                            login: mockLoginFn,
                            authenticated: true,
                            loading: mockLoading,
                        }}
                    >
                        <Login />
                    </Context.Provider>
                </BrowserRouter>
            );
            expect(
                screen.queryByRole("button", { name: "Entrar" })
            ).not.toBeInTheDocument();
        });
    });
});
