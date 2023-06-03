//imports
import { screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Router from "react-router-dom";
//components
import { ReadPost } from "./";
//styles
import { renderTheme } from "../../../styles/render-theme";
//contexts
import { Context as UserContext } from "../../../context/UserContext";
import { PostContext } from "../../../context/PostContext";
import { CommentContext } from "../../../context/CommentContext";
//mock data
import { commentsMock, currentUserMock, postMock } from "./dataMock";

//mock useParams
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

//spy on useParams
jest.spyOn(Router, "useParams").mockReturnValue({ id: "1234" });

//mock scrollTop
Object.defineProperty(window.global, "scrollTo", { value: jest.fn() });

describe("<ReadPost />", () => {
    let mockCheckUser;
    let mockGetPostById;
    let mockCreateComment;
    let mockEditComment;
    let mockRemoveComment;
    let mockGetCommentsByPostId;

    beforeEach(() => {
        mockCheckUser = jest.fn();
        mockGetPostById = jest.fn();
        mockCreateComment = jest.fn();
        mockEditComment = jest.fn();
        mockRemoveComment = jest.fn();
        mockGetCommentsByPostId = jest.fn();
    });

    describe("Rendering", () => {
        it("should render ReadPost", async () => {
            mockGetPostById.mockReturnValueOnce(Promise.resolve(postMock));
            mockCheckUser.mockReturnValueOnce(Promise.resolve(null));
            mockGetCommentsByPostId.mockReturnValueOnce(
                Promise.resolve(commentsMock)
            );

            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: false,
                            checkUser: mockCheckUser,
                        }}
                    >
                        <PostContext.Provider
                            value={{
                                getPostById: mockGetPostById,
                            }}
                        >
                            <CommentContext.Provider
                                value={{
                                    createComment: mockCreateComment,
                                    editComment: mockEditComment,
                                    removeComment: mockRemoveComment,
                                    getCommentsByPostId:
                                        mockGetCommentsByPostId,
                                }}
                            >
                                <ReadPost />
                            </CommentContext.Provider>
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(mockGetPostById).toHaveBeenCalledTimes(1);
                expect(mockGetCommentsByPostId).toHaveBeenCalledTimes(1);
                expect(mockCheckUser).toHaveBeenCalledTimes(1);
            });

            const postHeading = screen.getByRole("heading", {
                name: postMock.title,
            });
            const authorText = screen.getByText(
                /Por:\s*john doe\s*-\s*5 de Abril 2023/
            );
            const postImage = screen.getByRole("img", { name: postMock.title });
            const postContent = screen.getByText(
                postMock.content.replace("<p>", "").replace("</p>", "")
            );
            const SignUpButton = screen.getByText(
                "Crie uma conta para comentar."
            );
            const postTagText1 = screen.getByText("tag1");
            const postTagText2 = screen.getByText("tag2");
            const commentText1 = screen.getByText("this is a comment 01");
            const commentText2 = screen.getByText("this is a comment 01");

            expect(postHeading).toBeInTheDocument();
            expect(authorText).toBeInTheDocument();
            expect(postImage).toBeInTheDocument();
            expect(postImage).toHaveAttribute("src", postMock.image);
            expect(postContent).toBeInTheDocument();
            expect(postTagText1).toBeInTheDocument();
            expect(postTagText2).toBeInTheDocument();
            expect(SignUpButton).toBeInTheDocument();
            expect(commentText1).toBeInTheDocument();
            expect(commentText2).toBeInTheDocument();
        });
        it("should render comment input when user is authenticated", async () => {
            mockGetPostById.mockReturnValueOnce(Promise.resolve(postMock));
            mockCheckUser.mockReturnValueOnce(Promise.resolve(currentUserMock));
            mockGetCommentsByPostId.mockReturnValueOnce(
                Promise.resolve(commentsMock)
            );

            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: true,
                            checkUser: mockCheckUser,
                        }}
                    >
                        <PostContext.Provider
                            value={{
                                getPostById: mockGetPostById,
                            }}
                        >
                            <CommentContext.Provider
                                value={{
                                    createComment: mockCreateComment,
                                    editComment: mockEditComment,
                                    removeComment: mockRemoveComment,
                                    getCommentsByPostId:
                                        mockGetCommentsByPostId,
                                }}
                            >
                                <ReadPost />
                            </CommentContext.Provider>
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(mockGetPostById).toHaveBeenCalledTimes(1);
                expect(mockGetCommentsByPostId).toHaveBeenCalledTimes(1);
                expect(mockCheckUser).toHaveBeenCalledTimes(1);
            });

            const commentInput = screen.getByPlaceholderText(
                "Deixe seu comentário aqui..."
            );

            expect(commentInput).toBeInTheDocument();
        });
        it("should render comment input with different placeholder Text", async () => {
            mockGetPostById.mockReturnValueOnce(Promise.resolve(postMock));
            mockCheckUser.mockReturnValueOnce(Promise.resolve(currentUserMock));
            mockGetCommentsByPostId.mockReturnValueOnce(Promise.resolve([]));

            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: true,
                            checkUser: mockCheckUser,
                        }}
                    >
                        <PostContext.Provider
                            value={{
                                getPostById: mockGetPostById,
                            }}
                        >
                            <CommentContext.Provider
                                value={{
                                    createComment: mockCreateComment,
                                    editComment: mockEditComment,
                                    removeComment: mockRemoveComment,
                                    getCommentsByPostId:
                                        mockGetCommentsByPostId,
                                }}
                            >
                                <ReadPost />
                            </CommentContext.Provider>
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(mockGetPostById).toHaveBeenCalledTimes(1);
                expect(mockGetCommentsByPostId).toHaveBeenCalledTimes(1);
                expect(mockCheckUser).toHaveBeenCalledTimes(1);
            });

            const commentInput = screen.getByPlaceholderText(
                "Seja o primeiro a comentar!"
            );

            expect(commentInput).toBeInTheDocument();
        });
        it("should not render pege if post data fails to fetch", async () => {
            mockGetPostById.mockReturnValueOnce(Promise.resolve(null));
            mockCheckUser.mockReturnValueOnce(Promise.resolve(currentUserMock));
            mockGetCommentsByPostId.mockReturnValueOnce(Promise.resolve([]));

            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: true,
                            checkUser: mockCheckUser,
                        }}
                    >
                        <PostContext.Provider
                            value={{
                                getPostById: mockGetPostById,
                            }}
                        >
                            <CommentContext.Provider
                                value={{
                                    createComment: mockCreateComment,
                                    editComment: mockEditComment,
                                    removeComment: mockRemoveComment,
                                    getCommentsByPostId:
                                        mockGetCommentsByPostId,
                                }}
                            >
                                <ReadPost />
                            </CommentContext.Provider>
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(mockGetPostById).toHaveBeenCalledTimes(1);
                expect(mockGetCommentsByPostId).toHaveBeenCalledTimes(1);
                expect(mockCheckUser).toHaveBeenCalledTimes(1);
            });

            const postHeading = screen.queryByRole("heading", {
                name: postMock.title,
            });
            const authorText = screen.queryByText(
                /Por:\s*john doe\s*-\s*5 de Abril 2023/
            );
            const postImage = screen.queryByRole("img", {
                name: postMock.title,
            });
            const postContent = screen.queryByText(
                postMock.content.replace("<p>", "").replace("</p>", "")
            );
            const SignUpButton = screen.queryByText(
                "Crie uma conta para comentar."
            );
            const postTagText1 = screen.queryByText("tag1");
            const postTagText2 = screen.queryByText("tag2");
            const commentText1 = screen.queryByText("this is a comment 01");
            const commentText2 = screen.queryByText("this is a comment 01");

            expect(postHeading).not.toBeInTheDocument();
            expect(authorText).not.toBeInTheDocument();
            expect(postImage).not.toBeInTheDocument();
            expect(postContent).not.toBeInTheDocument();
            expect(postTagText1).not.toBeInTheDocument();
            expect(postTagText2).not.toBeInTheDocument();
            expect(SignUpButton).not.toBeInTheDocument();
            expect(commentText1).not.toBeInTheDocument();
            expect(commentText2).not.toBeInTheDocument();
        });
    });
    it("should match snapshot", async () => {
        mockGetPostById.mockReturnValueOnce(Promise.resolve(postMock));
        mockCheckUser.mockReturnValueOnce(Promise.resolve(null));
        mockGetCommentsByPostId.mockReturnValueOnce(
            Promise.resolve(commentsMock)
        );

        const { container } = renderTheme(
            <BrowserRouter>
                <UserContext.Provider
                    value={{
                        authenticated: false,
                        checkUser: mockCheckUser,
                    }}
                >
                    <PostContext.Provider
                        value={{
                            getPostById: mockGetPostById,
                        }}
                    >
                        <CommentContext.Provider
                            value={{
                                createComment: mockCreateComment,
                                editComment: mockEditComment,
                                removeComment: mockRemoveComment,
                                getCommentsByPostId: mockGetCommentsByPostId,
                            }}
                        >
                            <ReadPost />
                        </CommentContext.Provider>
                    </PostContext.Provider>
                </UserContext.Provider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(mockGetPostById).toHaveBeenCalledTimes(1);
            expect(mockGetCommentsByPostId).toHaveBeenCalledTimes(1);
            expect(mockCheckUser).toHaveBeenCalledTimes(1);
        });

        expect(container).toMatchSnapshot();
    });
});
