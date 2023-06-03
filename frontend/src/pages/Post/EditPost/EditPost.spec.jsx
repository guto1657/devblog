//imports
import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
//styles
import { renderTheme } from "../../../styles/render-theme";
//contexts
import { Context as UserContext } from "../../../context/UserContext";
import { PostContext } from "../../../context/PostContext";
//components
import { EditPost } from "./index";

//setting scrollTo mock
const spyScrollTop = jest.fn();
Object.defineProperty(window.global, "scrollTo", { value: spyScrollTop });

//post data mock
const mockPostData = {
    image: "example.png",
    title: "post title",
    content: "<p>post content</p>",
    tags: ["#tag1", "#tag2"],
};

describe("<EditPost />", () => {
    //user context values mock
    let mockAuthenticated;
    //post context values mock
    let mockIsLoading;
    let mockEditPost;
    let mockGetPostById;

    beforeEach(() => {
        mockAuthenticated = true;
        mockIsLoading = false;
        mockEditPost = jest.fn();
        mockGetPostById = jest.fn();

        //returning mock promise from mockGetPostById
        mockGetPostById.mockReturnValue(Promise.resolve(mockPostData));
    });

    describe("Rendering", () => {
        it("should render EditPost Component with default values", async () => {
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
                                EditPost: mockEditPost,
                                getPostById: mockGetPostById,
                            }}
                        >
                            <EditPost />
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            //wait for mockGetPostById to have been called before proceeding
            await waitFor(() => {
                expect(mockGetPostById).toHaveBeenCalledTimes(1);
            });

            const imageInput = document.querySelector('input[name="image"]');
            const titleInput = document.querySelector('input[name="title"]');
            const contentEditor = document.querySelector(".ql-editor");
            const tagsInput = document.querySelector('input[name="tags"]');
            const EditPostButton = screen.getByRole("button", {
                name: "Edite seu post",
            });

            expect(imageInput).toBeInTheDocument();
            expect(titleInput).toBeInTheDocument();
            expect(contentEditor).toBeInTheDocument();
            expect(tagsInput).toBeInTheDocument();
            expect(EditPostButton).toBeInTheDocument();

            //default values
            expect(
                screen.getByRole("img", { name: mockPostData.title })
            ).toHaveAttribute("src", mockPostData.image);
            expect(titleInput.value).toBe(mockPostData.title);
            expect(contentEditor.querySelector("p").innerHTML).toBe(
                mockPostData.content.replace("<p>", "").replace("</p>", "")
            );
            expect(tagsInput.value).toBe(mockPostData.tags.join(" "));
        });

        it("should render PostForm with headingText and subHeadingText correct value", async () => {
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
                                EditPost: mockEditPost,
                                getPostById: mockGetPostById,
                            }}
                        >
                            <EditPost />
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            //wait for mockGetPostById to have been called before proceeding
            await waitFor(() => {
                expect(mockGetPostById).toHaveBeenCalledTimes(1);
            });

            const heading = screen.getByRole("heading", {
                name: "Editar Post",
            });
            const subHeading = screen.getByText("Revise e atualize o seu post");

            expect(heading).toBeInTheDocument();
            expect(subHeading).toBeInTheDocument();
        });

        it("should not render EditPost component when authenticated is false", () => {
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
                                EditPost: mockEditPost,
                                getPostById: mockGetPostById,
                            }}
                        >
                            <EditPost />
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );
            const postForm = screen.queryByLabelText("post-form");
            const EditPostButton = screen.queryByRole("button", {
                name: "Edite seu post",
            });

            expect(postForm).not.toBeInTheDocument();
            expect(EditPostButton).not.toBeInTheDocument();
        });

        it("should render loading when isLoading is true", async () => {
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
                                EditPost: mockEditPost,
                                getPostById: mockGetPostById,
                            }}
                        >
                            <EditPost />
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            expect(screen.getByLabelText("Loader-wrapper")).toBeInTheDocument();
        });

        it("should match snapshot", async () => {
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
                                EditPost: mockEditPost,
                                getPostById: mockGetPostById,
                            }}
                        >
                            <EditPost />
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            //wait for mockGetPostById to have been called before proceeding
            await waitFor(() => {
                expect(mockGetPostById).toHaveBeenCalledTimes(1);
            });

            expect(container.firstChild).toMatchSnapshot();
        });
    });
    describe("Functionality", () => {
        it("should call edit post function on button click ", async () => {
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
                                editPost: mockEditPost,
                                getPostById: mockGetPostById,
                            }}
                        >
                            <EditPost />
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            //wait for mockGetPostById to have been called before proceeding
            await waitFor(() => {
                expect(mockGetPostById).toHaveBeenCalledTimes(1);
            });

            const EditPostButton = screen.getByRole("button", {
                name: "Edite seu post",
            });

            act(() => {
                fireEvent.click(EditPostButton);
            });

            expect(mockEditPost).toHaveBeenCalledTimes(1);
        });
    });
});
