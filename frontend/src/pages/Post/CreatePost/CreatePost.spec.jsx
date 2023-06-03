//imports
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
//styles
import { renderTheme } from "../../../styles/render-theme";
//contexts
import { Context as UserContext } from "../../../context/UserContext";
import { PostContext } from "../../../context/PostContext";
//components
import { CreatePost } from "./index";

describe("<CreatePost />", () => {
    //user context values mock
    let mockAuthenticated;
    //post context values mock
    let mockIsLoading;
    let mockCreatePost;

    beforeEach(() => {
        mockAuthenticated = true;
        mockIsLoading = false;
        mockCreatePost = jest.fn();
    });

    describe("Rendering", () => {
        it("should render CreatePost Component", () => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: mockAuthenticated,
                        }}
                    >
                        <PostContext.Provider
                            value={{
                                isLoading: mockIsLoading,
                                createPost: mockCreatePost,
                            }}
                        >
                            <CreatePost />
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );
            const postForm =
                document.querySelector("form").parentElement.parentElement;
            const imageInput = document.querySelector('input[name="image"]');
            const titleInput = document.querySelector('input[name="title"]');
            const contentEditor = document.querySelector(".ql-editor");
            const tagsInput = document.querySelector('input[name="tags"]');
            const createPostButton = screen.getByRole("button", {
                name: "Criar Post",
            });

            expect(postForm).toBeInTheDocument();
            expect(imageInput).toBeInTheDocument();
            expect(titleInput).toBeInTheDocument();
            expect(contentEditor).toBeInTheDocument();
            expect(tagsInput).toBeInTheDocument();
            expect(createPostButton).toBeInTheDocument();
        });

        it("should render PostForm with headingText and subHeadingText correct value", () => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: mockAuthenticated,
                        }}
                    >
                        <PostContext.Provider
                            value={{
                                isLoading: mockIsLoading,
                                createPost: mockCreatePost,
                            }}
                        >
                            <CreatePost />
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );
            const heading = screen.getByRole("heading", { name: "Criar Post" });
            const subHeading = screen.getByText(
                "Escreva e compartilhe o seu conhecimento!"
            );

            expect(heading).toBeInTheDocument();
            expect(subHeading).toBeInTheDocument();
        });

        it("should not render CreatePost component when authenticated is false", () => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: false,
                        }}
                    >
                        <PostContext.Provider
                            value={{
                                isLoading: mockIsLoading,
                                createPost: mockCreatePost,
                            }}
                        >
                            <CreatePost />
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );
            const postForm = screen.queryByLabelText("post-form");
            const createPostButton = screen.queryByRole("button", {
                name: "Criar Post",
            });

            expect(postForm).not.toBeInTheDocument();
            expect(createPostButton).not.toBeInTheDocument();
        });

        it("should render loading when isLoading is true", () => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: mockIsLoading,
                        }}
                    >
                        <PostContext.Provider
                            value={{
                                isLoading: true,
                                createPost: mockCreatePost,
                            }}
                        >
                            <CreatePost />
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );
            expect(screen.getByLabelText("Loader-wrapper")).toBeInTheDocument();
        });

        it("should match snapshot", () => {
            const { container } = renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: mockAuthenticated,
                        }}
                    >
                        <PostContext.Provider
                            value={{
                                isLoading: mockIsLoading,
                                createPost: mockCreatePost,
                            }}
                        >
                            <CreatePost />
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );
            expect(container.firstChild).toMatchSnapshot();
        });
    });
    describe("Functionality", () => {
        it("should call create post function on button click ", () => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: mockAuthenticated,
                        }}
                    >
                        <PostContext.Provider
                            value={{
                                isLoading: mockIsLoading,
                                createPost: mockCreatePost,
                            }}
                        >
                            <CreatePost />
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            const createPostButton = screen.getByRole("button", {
                name: "Criar Post",
            });

            act(() => {
                fireEvent.click(createPostButton);
            });

            expect(mockCreatePost).toHaveBeenCalledTimes(1);
        });
    });
});
