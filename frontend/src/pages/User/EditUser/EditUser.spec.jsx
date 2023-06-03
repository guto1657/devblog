//imports
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
//styles
import { renderTheme } from "../../../styles/render-theme";
//contexts
import { Context as UserContext } from "../../../context/UserContext";
//components
import { EditUser } from "./";

//scrollTo mock
const spyScrollTo = jest.fn();
Object.defineProperty(global.window, "scrollTo", { value: spyScrollTo });

//localStorage mock
Object.defineProperty(window, "localStorage", {
    value: {
        getItem: jest
            .fn()
            .mockReturnValue(JSON.stringify({ token: "MockToken" })),
    },
});

describe("<UserEdit />", () => {
    let mockCheckUser;

    beforeEach(() => {
        mockCheckUser = jest.fn();

        mockCheckUser.mockReturnValue(
            Promise.resolve({
                currentUser: {
                    name: "john doe",
                    image: "image.png",
                    email: "john@test.com",
                },
            })
        );
    });

    describe("Rendering", () => {
        it("should render UserEdit", async () => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: true,
                            checkUser: mockCheckUser,
                        }}
                    >
                        <EditUser />
                    </UserContext.Provider>
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(mockCheckUser).toHaveBeenCalledTimes(1);
            });

            const formHeading = screen.getByRole("heading", {
                name: "Editar Dados",
            });
            const formSubHeading = screen.getByText(
                "Atualize suas informações pessoais"
            );
            const imageInput = document.querySelector('input[name="image"]');
            const nameInput = document.querySelector('input[name="name"]');
            const emailInput = document.querySelector('input[name="email"]');
            const passwordInput = document.querySelector(
                'input[name="password"]'
            );
            const confirmPasswordInput = document.querySelector(
                'input[name="confirmpassword"]'
            );
            const EditUserButton = screen.getByRole("button", {
                name: "Atualizar",
            });

            expect(formHeading).toBeInTheDocument();
            expect(formSubHeading).toBeInTheDocument();
            expect(imageInput).toBeInTheDocument();
            expect(nameInput).toBeInTheDocument();
            expect(emailInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
            expect(confirmPasswordInput).toBeInTheDocument();
            expect(EditUserButton).toBeInTheDocument();
        });

        it("should render UserEdit with currentUser data", async () => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: true,
                            checkUser: mockCheckUser,
                        }}
                    >
                        <EditUser />
                    </UserContext.Provider>
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(mockCheckUser).toHaveBeenCalledTimes(1);
            });

            const imageElm = screen.getByRole("img", { name: "john doe" });
            const nameInput = document.querySelector('input[name="name"]');
            const emailInput = document.querySelector('input[name="email"]');

            expect(imageElm).toHaveAttribute("src", "image.png");
            expect(nameInput).toHaveValue("john doe");
            expect(emailInput).toHaveValue("john@test.com");
        });

        it("should not render UserEdit component when authenticated is false", async () => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: false,
                            checkUser: mockCheckUser,
                        }}
                    >
                        <EditUser />
                    </UserContext.Provider>
                </BrowserRouter>
            );

            const formHeading = screen.queryByRole("heading", {
                name: "Editar Dados",
            });
            const formSubHeading = screen.queryByText(
                "Atualize suas informações pessoais"
            );

            const EditUserButton = screen.queryByRole("button", {
                name: "Atualizar",
            });

            expect(formHeading).not.toBeInTheDocument();
            expect(formSubHeading).not.toBeInTheDocument();
            expect(EditUserButton).not.toBeInTheDocument();
        });

        it("should match snapshot", async () => {
            const { container } = renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: true,
                            checkUser: mockCheckUser,
                        }}
                    >
                        <EditUser />
                    </UserContext.Provider>
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(mockCheckUser).toHaveBeenCalledTimes(1);
            });

            expect(container.firstChild).toMatchSnapshot();
        });
    });
    describe("Functionality", () => {
        it("should call EditUser on button click", async () => {
            fetch.mockResponseOnce(JSON.stringify({ message: "Updated" }));

            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: true,
                            checkUser: mockCheckUser,
                        }}
                    >
                        <EditUser />
                    </UserContext.Provider>
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(mockCheckUser).toHaveBeenCalledTimes(1);
            });

            act(() => {
                fireEvent.click(
                    screen.getByRole("button", { name: "Atualizar" })
                );
            });

            await waitFor(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
            });
        });
    });
});
