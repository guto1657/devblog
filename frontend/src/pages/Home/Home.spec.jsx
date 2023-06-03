//imports
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
//styles
import { renderTheme } from "../../styles/render-theme";
//contexts
import { PostContext } from "../../context/PostContext";
//components
import { Home } from "./";
//mocks
import { postsMock } from "./postsMock";

//scrollTo Mock
Object.defineProperty(window.global, "scrollTo", { value: jest.fn() });

describe("<Home />", () => {
    let mockGetAllPosts;
    let mockIsLoading;

    beforeEach(() => {
        mockGetAllPosts = jest.fn();
        mockIsLoading = false;
    });

    describe("Rendering", () => {
        it("should render Home with 5 posts if no filter is applied", async () => {
            mockGetAllPosts.mockReturnValue(Promise.resolve(postsMock));
            renderTheme(
                <BrowserRouter>
                    <PostContext.Provider
                        value={{
                            isLoading: mockIsLoading,
                            getAllPosts: mockGetAllPosts,
                        }}
                    >
                        <Home />
                    </PostContext.Provider>
                </BrowserRouter>
            );

            //wait for GetAllPosts function to be called
            await waitFor(() => {
                expect(mockGetAllPosts).toHaveBeenCalledTimes(1);
            });

            //home heading
            expect(
                screen.getByRole("heading", {
                    name: "Veja os nossos posts mais recentes",
                })
            ).toBeInTheDocument();
            //search input
            expect(
                screen.getByPlaceholderText("Pesquisar por tags...")
            ).toBeInTheDocument();
            //search button
            expect(
                screen.getByRole("button", {
                    name: "Pesquisar",
                })
            ).toBeInTheDocument();
            //5 posts headings + home heading
            expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(
                6
            );
            //next page button
            expect(screen.getByLabelText("Next Page")).toBeInTheDocument();
            //pagination buttons
            expect(screen.getAllByLabelText("Pagination Button")).toHaveLength(
                2
            );
        });
        it("should render Home loading text if loading is true", async () => {
            mockGetAllPosts.mockReturnValue(Promise.resolve(postsMock));
            renderTheme(
                <BrowserRouter>
                    <PostContext.Provider
                        value={{
                            isLoading: true,
                            getAllPosts: mockGetAllPosts,
                        }}
                    >
                        <Home />
                    </PostContext.Provider>
                </BrowserRouter>
            );

            //wait for GetAllPosts function to be called
            await waitFor(() => {
                expect(mockGetAllPosts).toHaveBeenCalledTimes(1);
            });

            expect(
                screen.getByRole("heading", { name: "Carregando..." })
            ).toBeInTheDocument();
        });

        it("should render error text if fetch fails to get data", async () => {
            mockGetAllPosts.mockReturnValue(Promise.resolve(null));
            renderTheme(
                <BrowserRouter>
                    <PostContext.Provider
                        value={{
                            isLoading: false,
                            getAllPosts: mockGetAllPosts,
                        }}
                    >
                        <Home />
                    </PostContext.Provider>
                </BrowserRouter>
            );

            //wait for GetAllPosts function to be called
            await waitFor(() => {
                expect(mockGetAllPosts).toHaveBeenCalledTimes(1);
            });

            expect(
                screen.getByRole("heading", {
                    name: /Não foi possível carregar os posts no momento. Por favor, tente novamente mais tarde./,
                    level: 2,
                })
            ).toBeInTheDocument();
        });

        it("should render no posts found text if there are no posts", async () => {
            mockGetAllPosts.mockReturnValue(Promise.resolve([]));
            renderTheme(
                <BrowserRouter>
                    <PostContext.Provider
                        value={{
                            isLoading: false,
                            getAllPosts: mockGetAllPosts,
                        }}
                    >
                        <Home />
                    </PostContext.Provider>
                </BrowserRouter>
            );

            //wait for GetAllPosts function to be called
            await waitFor(() => {
                expect(mockGetAllPosts).toHaveBeenCalledTimes(1);
            });

            expect(
                screen.getByRole("heading", {
                    name: /Nenhum post encontrado/,
                    level: 2,
                })
            ).toBeInTheDocument();
        });
        it("should match snapshot", async () => {
            mockGetAllPosts.mockReturnValue(Promise.resolve(postsMock));
            const { container } = renderTheme(
                <BrowserRouter>
                    <PostContext.Provider
                        value={{
                            isLoading: false,
                            getAllPosts: mockGetAllPosts,
                        }}
                    >
                        <Home />
                    </PostContext.Provider>
                </BrowserRouter>
            );

            //wait for GetAllPosts function to be called
            await waitFor(() => {
                expect(mockGetAllPosts).toHaveBeenCalledTimes(1);
            });

            expect(container).toMatchSnapshot();
        });
    });
    describe("Functionality", () => {
        it("should update search input value on change", async () => {
            mockGetAllPosts.mockReturnValue(Promise.resolve(postsMock));
            renderTheme(
                <BrowserRouter>
                    <PostContext.Provider
                        value={{
                            isLoading: false,
                            getAllPosts: mockGetAllPosts,
                        }}
                    >
                        <Home />
                    </PostContext.Provider>
                </BrowserRouter>
            );

            //wait for GetAllPosts function to be called
            await waitFor(() => {
                expect(mockGetAllPosts).toHaveBeenCalledTimes(1);
            });

            const searchInput = screen.getByPlaceholderText(
                "Pesquisar por tags..."
            );

            fireEvent.change(searchInput, { target: { value: "test" } });

            expect(searchInput).toHaveValue("test");
        });
        it("should filter posts when user search for a single tag ", async () => {
            mockGetAllPosts.mockReturnValue(Promise.resolve(postsMock));
            renderTheme(
                <BrowserRouter>
                    <PostContext.Provider
                        value={{
                            isLoading: false,
                            getAllPosts: mockGetAllPosts,
                        }}
                    >
                        <Home />
                    </PostContext.Provider>
                </BrowserRouter>
            );

            //wait for GetAllPosts function to be called
            await waitFor(() => {
                expect(mockGetAllPosts).toHaveBeenCalledTimes(1);
            });

            const searchInput = screen.getByPlaceholderText(
                "Pesquisar por tags..."
            );

            const searchButton = screen.getByRole("button", {
                name: "Pesquisar",
            });

            fireEvent.change(searchInput, { target: { value: "tag1" } });

            act(() => {
                userEvent.click(searchButton);
            });

            await waitFor(() => {
                //it should display 4 posts with tag1 + home heading
                expect(
                    screen.getAllByRole("heading", { level: 3 })
                ).toHaveLength(5);
            });
        });
        it("should filter posts when user search for multiple tags ", async () => {
            mockGetAllPosts.mockReturnValue(Promise.resolve(postsMock));
            renderTheme(
                <BrowserRouter>
                    <PostContext.Provider
                        value={{
                            isLoading: false,
                            getAllPosts: mockGetAllPosts,
                        }}
                    >
                        <Home />
                    </PostContext.Provider>
                </BrowserRouter>
            );

            //wait for GetAllPosts function to be called
            await waitFor(() => {
                expect(mockGetAllPosts).toHaveBeenCalledTimes(1);
            });

            const searchInput = screen.getByPlaceholderText(
                "Pesquisar por tags..."
            );
            const searchButton = screen.getByRole("button", {
                name: "Pesquisar",
            });

            let searchedTags = "tag1 tag3";

            fireEvent.change(searchInput, { target: { value: searchedTags } });

            act(() => {
                userEvent.click(searchButton);
            });

            await waitFor(() => {
                //it should display (2) posts with tag1 and tag3 + home heading
                expect(
                    screen.getAllByRole("heading", { level: 3 })
                ).toHaveLength(3);
            });
        });

        it("should display error message on screen when no posts found with searched tag ", async () => {
            mockGetAllPosts.mockReturnValue(Promise.resolve(postsMock));
            renderTheme(
                <BrowserRouter>
                    <PostContext.Provider
                        value={{
                            isLoading: false,
                            getAllPosts: mockGetAllPosts,
                        }}
                    >
                        <Home />
                    </PostContext.Provider>
                </BrowserRouter>
            );

            //wait for GetAllPosts function to be called
            await waitFor(() => {
                expect(mockGetAllPosts).toHaveBeenCalledTimes(1);
            });

            const searchInput = screen.getByPlaceholderText(
                "Pesquisar por tags..."
            );
            const searchButton = screen.getByRole("button", {
                name: "Pesquisar",
            });

            let searchedTags = "potato";

            fireEvent.change(searchInput, { target: { value: searchedTags } });

            act(() => {
                userEvent.click(searchButton);
            });

            await waitFor(() => {
                expect(
                    screen.getByRole("heading", {
                        name: 'Nenhum post encontrado com a(s) tag(s) " #potato"',
                    })
                );
            });
        });
    });
});
