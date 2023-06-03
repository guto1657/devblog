//imports
import { fireEvent, screen } from "@testing-library/react";
//styles
import { renderTheme } from "../../../styles/render-theme";
import { theme } from "../../../styles/theme";
//components
import { SearchBox } from "./";

describe("<SearchBox />", () => {
    const mockFnChange = jest.fn();
    const mockFnClick = jest.fn();

    beforeEach(() => {
        renderTheme(
            <SearchBox OnChangeFn={mockFnChange} OnClickFn={mockFnClick} />
        );
    });

    describe("Rendering", () => {
        it("should render SearchBox", () => {
            const heading = screen.getByRole("heading", {
                name: "Veja os nossos posts mais recentes",
            });

            expect(heading).toBeInTheDocument();
        });

        it("should render SearchWrapper component with 90% of width", () => {
            const buttonElem = screen.getByRole("button", {
                name: "Pesquisar",
            });

            expect(buttonElem.parentElement).toHaveStyleRule("width", "90%");
        });

        it("should render SearchWrapper component with 100% of width on mobile ", () => {
            const buttonElem = screen.getByRole("button", {
                name: "Pesquisar",
            });

            expect(buttonElem.parentElement).toHaveStyleRule("width", "100%", {
                media: theme.media.lteMedium,
            });
        });

        it("should render button component with 20% of width ", () => {
            const buttonElem = screen.getByRole("button", {
                name: "Pesquisar",
            });

            expect(buttonElem).toHaveStyle("width: 20%;");
        });

        it("should render input component with 78% of width", () => {
            const inputElement = screen.getByPlaceholderText(
                "Pesquisar por tags..."
            );

            expect(inputElement).toHaveStyleRule("width", "78%");
        });

        it("should render input component with 60% of width on mobile", () => {
            const inputElement = screen.getByPlaceholderText(
                "Pesquisar por tags..."
            );

            expect(inputElement).toHaveStyleRule("width", "60%", {
                media: theme.media.lteMedium,
            });
        });

        it("should match snapshot", () => {
            const { container } = renderTheme(
                <SearchBox OnChangeFn={mockFnChange} OnClickFn={mockFnClick} />
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe("Functionality", () => {
        it("should call on change function when input is typed", () => {
            const inputElement = screen.getByPlaceholderText(
                "Pesquisar por tags..."
            );

            fireEvent.change(inputElement, { target: { value: "test" } });

            expect(mockFnChange).toHaveBeenCalledTimes(1);
        });
    });

    describe("Functionality", () => {
        it("should call on click function when button is clicked", () => {
            const buttonElem = screen.getByRole("button", {
                name: "Pesquisar",
            });

            fireEvent.click(buttonElem);

            expect(mockFnClick).toHaveBeenCalledTimes(1);
        });
    });
});
