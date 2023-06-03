//imports
import { fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
//styles
import { renderTheme } from "../../../styles/render-theme";
import { theme } from "../../../styles/theme";
//contexts
import { Context as UserContext } from "../../../context/UserContext";
//components
import { Navbar } from "./";

let logoutMock = jest.fn();

describe("<Navbar />", () => {
    describe("Rendering", () => {
        beforeEach(() => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: false,
                            logout: logoutMock,
                        }}
                    >
                        <Navbar />
                    </UserContext.Provider>
                </BrowserRouter>
            );
        });

        it("should render Navbar", () => {
            const heading = screen.getByRole("link", { name: "Dev Blog" });

            expect(heading).toBeInTheDocument();
        });

        it("should render Navbar with menu hidden when screen is less then 720px", () => {
            expect(
                screen.getByLabelText("Close Icon").parentElement
            ).toHaveStyleRule("right", "-300px", {
                media: theme.media.lteMedium,
            });
        });
    });

    describe("Menu functionality", () => {
        beforeEach(() => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: false,
                            logout: logoutMock,
                        }}
                    >
                        <Navbar />
                    </UserContext.Provider>
                </BrowserRouter>
            );
        });

        it("should open menu when hamburger icon is clicked on mobile", () => {
            const menuElem = screen.getByLabelText("Close Icon").parentElement;

            expect(menuElem).toHaveStyleRule("right", "-300px", {
                media: theme.media.lteMedium,
            });

            const hamburgerIcon = screen.getByLabelText("Hamburger Icon");

            fireEvent.click(hamburgerIcon);

            expect(menuElem).toHaveStyleRule("right", "0", {
                media: theme.media.lteMedium,
            });
        });

        it("should close menu when close icon is clicked on mobile", () => {
            const menuElem = screen.getByLabelText("Close Icon").parentElement;
            const hamburgerIcon = screen.getByLabelText("Hamburger Icon");
            const closeIcon = screen.getByLabelText("Close Icon");

            expect(menuElem).toHaveStyleRule("right", "-300px", {
                media: theme.media.lteMedium,
            });

            fireEvent.click(hamburgerIcon);

            expect(menuElem).toHaveStyleRule("right", "0", {
                media: theme.media.lteMedium,
            });

            fireEvent.click(closeIcon);

            expect(menuElem).toHaveStyleRule("right", "-300px", {
                media: theme.media.lteMedium,
            });
        });
    });

    describe("Authenticated functionality", () => {
        beforeEach(() => {
            logoutMock = jest.fn();
        });

        afterEach(() => {
            logoutMock.mockClear();
        });

        it("should show authenticated links when user is authenticated", () => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{ authenticated: true, logout: logoutMock }}
                    >
                        <Navbar />
                    </UserContext.Provider>
                </BrowserRouter>
            );

            const newPostLink = screen.getByRole("link", {
                name: /Novo post/i,
            });
            const dashboardLink = screen.getByRole("link", {
                name: /Dashboard/i,
            });

            const logOutLink = screen.getByText(/Sair/i);

            expect(newPostLink).toBeInTheDocument();
            expect(dashboardLink).toBeInTheDocument();
            expect(logOutLink).toBeInTheDocument();
        });

        it("should call logout function on logout span click and close menuBar on mobile", () => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{ authenticated: true, logout: logoutMock }}
                    >
                        <Navbar />
                    </UserContext.Provider>
                </BrowserRouter>
            );

            const menuElem = screen.getByLabelText("Close Icon").parentElement;
            const hamburgerIcon = screen.getByLabelText("Hamburger Icon");
            const logOutLink = screen.getByText(/Sair/i);

            expect(menuElem).toHaveStyleRule("right", "-300px", {
                media: theme.media.lteMedium,
            });

            fireEvent.click(hamburgerIcon);

            expect(menuElem).toHaveStyleRule("right", "0", {
                media: theme.media.lteMedium,
            });

            fireEvent.click(logOutLink);

            expect(logoutMock).toHaveBeenCalledTimes(1);
            expect(menuElem).toHaveStyleRule("right", "-300px", {
                media: theme.media.lteMedium,
            });
        });

        it("should call logout function on logout span click", () => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{ authenticated: true, logout: logoutMock }}
                    >
                        <Navbar />
                    </UserContext.Provider>
                </BrowserRouter>
            );

            const logOutLink = screen.getByText(/Sair/i);

            fireEvent.click(logOutLink);

            expect(logoutMock).toHaveBeenCalledTimes(1);
        });

        it("should hide authenticated links when user is not authenticated", () => {
            renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{ authenticated: false, logout: logoutMock }}
                    >
                        <Navbar />
                    </UserContext.Provider>
                </BrowserRouter>
            );

            const newPostLink = screen.queryByRole("link", {
                name: /Novo post/i,
            });
            const dashboardLink = screen.queryByRole("link", {
                name: /Dashboard/i,
            });

            const logOutLink = screen.queryByText(/Sair/i);

            expect(newPostLink).not.toBeInTheDocument();
            expect(dashboardLink).not.toBeInTheDocument();
            expect(logOutLink).not.toBeInTheDocument();
        });
    });

    describe("Snapshot", () => {
        it("should match snapshot", () => {
            const { container } = renderTheme(
                <BrowserRouter>
                    <UserContext.Provider
                        value={{ authenticated: false, logout: logoutMock }}
                    >
                        <Navbar />
                    </UserContext.Provider>
                </BrowserRouter>
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
