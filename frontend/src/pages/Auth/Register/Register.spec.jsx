//imports
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
//contexts
import { Context } from "../../../context/UserContext/index";
//styles
import { renderTheme } from "../../../styles/render-theme";
//components
import { Register } from "./index";

describe("<Register />", () => {
    let mockRegisterFn;
    let mockAuthenticated;
    let mockLoading;

    beforeEach(() => {
        mockRegisterFn = jest.fn();
        mockAuthenticated = false;
        mockLoading = false;
    });

    describe("Rendering", () => {
        it("should render Register Component", () => {
            renderTheme(
                <BrowserRouter>
                    <Context.Provider
                        value={{
                            register: mockRegisterFn,
                            authenticated: mockAuthenticated,
                            loading: mockLoading,
                        }}
                    >
                        <Register />
                    </Context.Provider>
                </BrowserRouter>
            );

            const nameInput = document.querySelector('input[name="name"]');
            const emailInput = document.querySelector('input[name="email"]');
            const passwordInput = document.querySelector(
                'input[name="password"]'
            );
            const confirmPasswordInput = document.querySelector(
                'input[name="confirmpassword"]'
            );
            const registerButton = document.querySelector(
                'button[type="submit"]'
            );

            expect(nameInput).toBeInTheDocument();
            expect(emailInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
            expect(confirmPasswordInput).toBeInTheDocument();
            expect(registerButton).toBeInTheDocument();
        });

        it("should render FormHeader with headingText and subHeadingText props", () => {
            renderTheme(
                <BrowserRouter>
                    <Context.Provider
                        value={{
                            register: mockRegisterFn,
                            authenticated: mockAuthenticated,
                            loading: mockLoading,
                        }}
                    >
                        <Register />
                    </Context.Provider>
                </BrowserRouter>
            );
            const heading = screen.getByRole("heading", {
                name: "Cadastre-se",
            });
            const subHeading = screen.getByText(
                "Crie sua conta e compartilhe suas histórias"
            );

            expect(heading).toBeInTheDocument();
            expect(subHeading).toBeInTheDocument();
        });

        it("should render Loader Component when loading prop is true", () => {
            renderTheme(
                <BrowserRouter>
                    <Context.Provider
                        value={{
                            register: mockRegisterFn,
                            authenticated: mockAuthenticated,
                            loading: true,
                        }}
                    >
                        <Register />
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
                            register: mockRegisterFn,
                            authenticated: mockAuthenticated,
                            loading: mockLoading,
                        }}
                    >
                        <Register />
                    </Context.Provider>
                </BrowserRouter>
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe("Functionality", () => {
        it("should call register function with user object on form submit", () => {
            renderTheme(
                <BrowserRouter>
                    <Context.Provider
                        value={{
                            register: mockRegisterFn,
                            authenticated: mockAuthenticated,
                            loading: mockLoading,
                        }}
                    >
                        <Register />
                    </Context.Provider>
                </BrowserRouter>
            );
            const nameInput = document.querySelector('input[name="name"]');
            const emailInput = document.querySelector('input[name="email"]');
            const passwordInput = document.querySelector(
                'input[name="password"]'
            );
            const confirmPasswordInput = document.querySelector(
                'input[name="confirmpassword"]'
            );
            const registerButton = screen.getByRole("button", {
                name: "Cadastrar",
            });

            fireEvent.change(nameInput, {
                target: { value: "Test User" },
            });
            fireEvent.change(emailInput, {
                target: { value: "test@test.com" },
            });
            fireEvent.change(passwordInput, {
                target: { value: "password123" },
            });
            fireEvent.change(confirmPasswordInput, {
                target: { value: "password123" },
            });

            fireEvent.click(registerButton);

            expect(mockRegisterFn).toHaveBeenCalledWith({
                name: "Test User",
                email: "test@test.com",
                password: "password123",
                confirmpassword: "password123",
            });
        });

        it("should redirect to home page if user is already authenticated", () => {
            renderTheme(
                <BrowserRouter>
                    <Context.Provider
                        value={{
                            register: mockRegisterFn,
                            authenticated: true,
                            loading: mockLoading,
                        }}
                    >
                        <Register />
                    </Context.Provider>
                </BrowserRouter>
            );
            expect(
                screen.queryByRole("button", { name: "Cadastrar" })
            ).not.toBeInTheDocument();
        });

        it("should update user state on input change", () => {
            renderTheme(
                <BrowserRouter>
                    <Context.Provider
                        value={{
                            register: mockRegisterFn,
                            authenticated: mockAuthenticated,
                            loading: mockLoading,
                        }}
                    >
                        <Register />
                    </Context.Provider>
                </BrowserRouter>
            );

            const nameInput = document.querySelector('input[name="name"]');
            const emailInput = document.querySelector('input[name="email"]');
            const passwordInput = document.querySelector(
                'input[name="password"]'
            );
            const confirmPasswordInput = document.querySelector(
                'input[name="confirmpassword"]'
            );

            fireEvent.change(nameInput, {
                target: { value: "User Test" },
            });
            fireEvent.change(passwordInput, { target: { value: "test123" } });

            fireEvent.change(emailInput, {
                target: { value: "test@test.com" },
            });
            fireEvent.change(passwordInput, { target: { value: "test123" } });

            fireEvent.change(confirmPasswordInput, {
                target: { value: "test123" },
            });

            expect(nameInput.value).toBe("User Test");
            expect(emailInput.value).toBe("test@test.com");
            expect(passwordInput.value).toBe("test123");
            expect(confirmPasswordInput.value).toBe("test123");
        });
    });
});
