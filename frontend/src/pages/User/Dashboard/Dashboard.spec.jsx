//imports
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
//styles
import { renderTheme } from "../../../styles/render-theme";
//components
import { Dashboard } from ".";
//data mocks
import { commentsMock, postsMock, currentUserMock } from "./dataMock";
//contexts
import { Context as UserContext } from "../../../context/UserContext";
import { PostContext } from "../../../context/PostContext";
import { CommentContext } from "../../../context/CommentContext";

// mock useNavigate
let mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUsedNavigate,
}));

//mock scrollTo
Object.defineProperty(window, "scrollTo", { value: jest.fn() });

describe("<Dashboard/>", () => {
    let userContextValues = {};
    let postContextValues = {};
    let commentContextValues = {};

    beforeEach(() => {
        //contexts values mock
        userContextValues = {
            authenticated: true,
            checkUser: jest.fn().mockReturnValue(
                Promise.resolve({
                    ...currentUserMock,
                })
            ),
        };

        postContextValues = {
            removePost: jest.fn(),
            getUserPosts: jest
                .fn()
                .mockReturnValue(Promise.resolve([...postsMock])),
        };

        commentContextValues = {
            getUserComments: jest
                .fn()
                .mockReturnValue(Promise.resolve([...commentsMock])),
            removeComment: jest.fn(),
            editComment: jest.fn(),
        };

        //clear all "mockedUsedNavigate" calls
        mockedUsedNavigate.mockClear();
    });

    describe("Rendering", () => {
        it("should render Dashboard Component", async () => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider value={{ ...userContextValues }}>
                        <PostContext.Provider value={{ ...postContextValues }}>
                            <CommentContext.Provider
                                value={{ ...commentContextValues }}
                            >
                                <Dashboard />
                            </CommentContext.Provider>
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(userContextValues.checkUser).toHaveBeenCalledTimes(1);
                expect(postContextValues.getUserPosts).toHaveBeenCalledTimes(1);
                expect(
                    commentContextValues.getUserComments
                ).toHaveBeenCalledTimes(1);
            });

            expect(
                screen.getByRole("img", {
                    name: currentUserMock.currentUser.name,
                })
            ).toHaveAttribute("src", currentUserMock.currentUser.image);
            expect(
                screen.getByRole("heading", {
                    name: currentUserMock.currentUser.name,
                })
            ).toBeInTheDocument();
            expect(screen.getByLabelText("Cog Icon")).toBeInTheDocument();
            expect(
                screen.getByRole("heading", {
                    name: currentUserMock.currentUser.email,
                })
            ).toBeInTheDocument();
            expect(
                screen.getByRole("heading", {
                    name: currentUserMock.currentUser.email,
                })
            ).toBeInTheDocument();
            expect(
                screen.getByRole("heading", {
                    name: `Data de entrada: 5 de Abril 2023`,
                })
            ).toBeInTheDocument();
            expect(screen.getAllByLabelText("View Option")).toHaveLength(2);
        });

        it("should not render Dashboard Component if authenticated is false", () => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{ ...userContextValues, authenticated: false }}
                    >
                        <PostContext.Provider value={{ ...postContextValues }}>
                            <CommentContext.Provider
                                value={{ ...commentContextValues }}
                            >
                                <Dashboard />
                            </CommentContext.Provider>
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            expect(
                screen.queryByRole("img", {
                    name: currentUserMock.currentUser.name,
                })
            ).not.toBeInTheDocument();
            expect(
                screen.queryByRole("heading", {
                    name: currentUserMock.currentUser.name,
                })
            ).not.toBeInTheDocument();
            expect(screen.queryByLabelText("Cog Icon")).not.toBeInTheDocument();
            expect(
                screen.queryByRole("heading", {
                    name: currentUserMock.currentUser.email,
                })
            ).not.toBeInTheDocument();
            expect(
                screen.queryByRole("heading", {
                    name: currentUserMock.currentUser.email,
                })
            ).not.toBeInTheDocument();
            expect(
                screen.queryByRole("heading", {
                    name: `Data de entrada: 5 de Abril 2023`,
                })
            ).not.toBeInTheDocument();
            expect(screen.queryAllByRole("View Option")).not.toHaveLength(2);
        });

        it("should render no posts message when getUserPosts return an empty array", async () => {
            postContextValues.getUserPosts = jest
                .fn()
                .mockReturnValue(Promise.resolve([]));
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider value={{ ...userContextValues }}>
                        <PostContext.Provider
                            value={{
                                ...postContextValues,
                            }}
                        >
                            <CommentContext.Provider
                                value={{ ...commentContextValues }}
                            >
                                <Dashboard />
                            </CommentContext.Provider>
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(userContextValues.checkUser).toHaveBeenCalledTimes(1);
                expect(postContextValues.getUserPosts).toHaveBeenCalledTimes(1);
                expect(
                    commentContextValues.getUserComments
                ).toHaveBeenCalledTimes(1);
            });

            expect(
                screen.getByRole("heading", {
                    name: "Você ainda não tem nenhum post.",
                })
            ).toBeInTheDocument();
        });
        it("should render no comments message when getUserComments return an empty array", async () => {
            commentContextValues.getUserComments = jest
                .fn()
                .mockReturnValue(Promise.resolve([]));
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider value={{ ...userContextValues }}>
                        <PostContext.Provider
                            value={{
                                ...postContextValues,
                            }}
                        >
                            <CommentContext.Provider
                                value={{ ...commentContextValues }}
                            >
                                <Dashboard />
                            </CommentContext.Provider>
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(userContextValues.checkUser).toHaveBeenCalledTimes(1);
                expect(postContextValues.getUserPosts).toHaveBeenCalledTimes(1);
                expect(
                    commentContextValues.getUserComments
                ).toHaveBeenCalledTimes(1);
            });

            //change dashboard view option
            act(() => {
                fireEvent.click(screen.getAllByLabelText("View Option")[1]);
            });

            expect(
                screen.getByRole("heading", {
                    name: "Você ainda não tem nenhum comentário.",
                })
            ).toBeInTheDocument();
        });

        it("should match snapshot", async () => {
            const { container } = renderTheme(
                <BrowserRouter>
                    <UserContext.Provider value={{ ...userContextValues }}>
                        <PostContext.Provider value={{ ...postContextValues }}>
                            <CommentContext.Provider
                                value={{ ...commentContextValues }}
                            >
                                <Dashboard />
                            </CommentContext.Provider>
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(userContextValues.checkUser).toHaveBeenCalledTimes(1);
                expect(postContextValues.getUserPosts).toHaveBeenCalledTimes(1);
                expect(
                    commentContextValues.getUserComments
                ).toHaveBeenCalledTimes(1);
            });

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe("Functionality", () => {
        beforeEach(async () => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider value={{ ...userContextValues }}>
                        <PostContext.Provider value={{ ...postContextValues }}>
                            <CommentContext.Provider
                                value={{ ...commentContextValues }}
                            >
                                <Dashboard />
                            </CommentContext.Provider>
                        </PostContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(userContextValues.checkUser).toHaveBeenCalledTimes(1);
                expect(postContextValues.getUserPosts).toHaveBeenCalledTimes(1);
                expect(
                    commentContextValues.getUserComments
                ).toHaveBeenCalledTimes(1);
            });
        });

        it("should change view option on button click", async () => {
            //Posts view option active
            expect(screen.getAllByLabelText("View Option")[0]).toHaveClass(
                "active"
            );
            expect(screen.getAllByText(/post title/)).toHaveLength(3);
            expect(screen.getAllByLabelText("View Option")[1]).not.toHaveClass(
                "active"
            );

            //change dashboard view option
            act(() => {
                fireEvent.click(screen.getAllByLabelText("View Option")[1]);
            });

            //Comments view option active
            expect(screen.getAllByLabelText("View Option")[0]).not.toHaveClass(
                "active"
            );
            expect(screen.getAllByLabelText("View Option")[1]).toHaveClass(
                "active"
            );
            expect(screen.getAllByText(/this is a comment/)).toHaveLength(2);
        });

        it("should call redirect function on read post button click", async () => {
            //posts on screen
            expect(screen.getAllByText(/post title/)).toHaveLength(3);

            //click on the first row read post button
            act(() => {
                fireEvent.click(
                    screen
                        .getByText(postsMock[0].title)
                        .parentElement.querySelectorAll("button")[0]
                );
            });

            await waitFor(() => {
                expect(mockedUsedNavigate).toHaveBeenCalledWith(
                    `/post/${postsMock[0]._id}`
                );
            });
        });
        it("should call redirect function on edit post button click", async () => {
            //posts on screen
            expect(screen.getAllByText(/post title/)).toHaveLength(3);

            //click on the first row read post button
            act(() => {
                fireEvent.click(
                    screen
                        .getByText(postsMock[0].title)
                        .parentElement.querySelectorAll("button")[1]
                );
            });
            await waitFor(() => {
                expect(mockedUsedNavigate).toHaveBeenCalledWith(
                    `/post/edit/${postsMock[0]._id}`
                );
            });
        });
        it("should call removePost function on remove post button click", async () => {
            //posts on screen
            expect(screen.getAllByText(/post title/)).toHaveLength(3);

            //click on the first row read post button
            act(() => {
                fireEvent.click(
                    screen
                        .getByText(postsMock[0].title)
                        .parentElement.querySelectorAll("button")[2]
                );
            });
            await waitFor(() => {
                expect(postContextValues.removePost).toHaveBeenCalledTimes(1);
            });
        });

        it("should redirect to post page on see comment button click", async () => {
            //change dashboard view option
            act(() => {
                fireEvent.click(screen.getAllByLabelText("View Option")[1]);
            });

            act(() => {
                fireEvent.click(
                    screen
                        .getByText(commentsMock[0].commentText)
                        .parentElement.querySelectorAll("button")[0]
                );
            });

            await waitFor(() => {
                expect(mockedUsedNavigate).toHaveBeenCalledWith(
                    `/post/${commentsMock[0].post._id}`
                );
            });
        });

        it("should display save button and cancel button on edit comment button click", async () => {
            //change dashboard view option
            act(() => {
                fireEvent.click(screen.getAllByLabelText("View Option")[1]);
            });

            act(() => {
                fireEvent.click(
                    screen
                        .getByText(commentsMock[0].commentText)
                        .parentElement.querySelectorAll("button")[1]
                );
            });

            expect(
                screen.getByRole("button", { name: "Salvar" })
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: "Cancelar" })
            ).toBeInTheDocument();
        });

        it("should hide save button and cancel button on cancel comment edit button click", async () => {
            //change dashboard view option
            act(() => {
                fireEvent.click(screen.getAllByLabelText("View Option")[1]);
            });

            act(() => {
                fireEvent.click(
                    screen
                        .getByText(commentsMock[0].commentText)
                        .parentElement.querySelectorAll("button")[1]
                );
            });

            expect(
                screen.getByRole("button", { name: "Salvar" })
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: "Cancelar" })
            ).toBeInTheDocument();

            act(() => {
                fireEvent.click(
                    screen.getByRole("button", { name: "Cancelar" })
                );
            });

            expect(
                screen.queryByRole("button", { name: "Salvar" })
            ).not.toBeInTheDocument();
            expect(
                screen.queryByRole("button", { name: "Cancelar" })
            ).not.toBeInTheDocument();
        });

        it("should call editComment on save comment edit button click", async () => {
            //change dashboard view option
            act(() => {
                fireEvent.click(screen.getAllByLabelText("View Option")[1]);
            });

            act(() => {
                fireEvent.click(
                    screen
                        .getByText(commentsMock[0].commentText)
                        .parentElement.querySelectorAll("button")[1]
                );
            });

            expect(
                screen.getByRole("button", { name: "Salvar" })
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: "Cancelar" })
            ).toBeInTheDocument();

            act(() => {
                fireEvent.click(screen.getByRole("button", { name: "Salvar" }));
            });

            await waitFor(() => {
                expect(commentContextValues.editComment).toHaveBeenCalledTimes(
                    1
                );
            });
        });

        it("should call removeComment function on remove comment button click", async () => {
            //change dashboard view option
            act(() => {
                fireEvent.click(screen.getAllByLabelText("View Option")[1]);
            });

            act(() => {
                fireEvent.click(
                    screen
                        .getByText(commentsMock[0].commentText)
                        .parentElement.querySelectorAll("button")[2]
                );
            });

            await waitFor(() => {
                expect(
                    commentContextValues.removeComment
                ).toHaveBeenCalledTimes(1);
            });
        });
    });
});
