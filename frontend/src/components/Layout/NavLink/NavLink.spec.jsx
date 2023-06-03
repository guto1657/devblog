//imports
import { fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import "jest-styled-components";
//styles
import { renderTheme } from "../../../styles/render-theme";
import { theme } from "../../../styles/theme";

//components
import { NavLink } from "./";

describe("<NavLink />", () => {
    let mockFn = jest.fn();

    describe("Rendering", () => {
        it("should render NavLink", () => {
            renderTheme(
                <BrowserRouter>
                    <NavLink path="/test" text="example" onclickFn={mockFn} />
                </BrowserRouter>
            );
            const linkElem = screen.getByRole("link", { name: "example" });

            expect(linkElem).toBeInTheDocument();
        });

        it("should match snapshot", () => {
            const { container } = renderTheme(
                <BrowserRouter>
                    <NavLink path="/test" text="example" onclickFn={mockFn} />
                </BrowserRouter>
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe("Functionality", () => {
        it("should call function on NavLink click", () => {
            renderTheme(
                <BrowserRouter>
                    <NavLink path="/test" text="example" onclickFn={mockFn} />
                </BrowserRouter>
            );
            const linkElem = screen.getByRole("link", { name: "example" });

            fireEvent.click(linkElem);

            expect(mockFn).toBeCalledTimes(1);
        });

        it("should change NavLink style when screen is less then 720px", () => {
            renderTheme(
                <BrowserRouter>
                    <NavLink path="/test" text="example" onclickFn={mockFn} />
                </BrowserRouter>
            );
            const linkElem = screen.getByRole("link", { name: "example" });

            expect(linkElem).toHaveStyleRule(
                "font-size",
                theme.font.sizes.medium,
                {
                    media: theme.media.lteMedium,
                }
            );
        });

        it("should change NavLink style to active if Route is equal to NavLink is path", () => {
            const mockFn = jest.fn();

            const history = createMemoryHistory();
            history.push("/test");

            renderTheme(
                <BrowserRouter history={history}>
                    <NavLink path="/test" text="example" onclickFn={mockFn} />
                </BrowserRouter>
            );
            const linkElem = screen.getByRole("link", { name: "example" });

            expect(linkElem).toHaveClass("active");
            expect(linkElem).toHaveStyle(
                `background-color: ${theme.colors.primaryColor}`
            );
        });
    });
});
