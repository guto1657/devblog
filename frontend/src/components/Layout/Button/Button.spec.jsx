//imports
import { fireEvent, screen } from "@testing-library/react";
//styles
import { renderTheme } from "../../../styles/render-theme";
import { theme } from "../../../styles/theme";
//components
import { Button } from "./";

describe("<Button />", () => {
    let mockFn = jest.fn();

    describe("Rendering", () => {
        it("should render Button", () => {
            renderTheme(<Button text="example" />);
            const ButtonElm = screen.getByRole("button", { name: "example" });

            expect(ButtonElm).toBeInTheDocument();
        });

        it("should render Button with uppercase Text when uppercase is true", () => {
            renderTheme(<Button text="example" uppercase />);
            const ButtonElm = screen.getByRole("button", { name: "example" });

            expect(ButtonElm).toHaveStyleRule("text-transform", "uppercase");
        });

        it("should render Button with width equal to 100% when maxWidth is true", () => {
            renderTheme(<Button text="example" maxWidth={true} />);
            const ButtonElm = screen.getByRole("button", { name: "example" });

            expect(ButtonElm).toHaveStyleRule("width", "100%");
        });

        it("should render Button with correct type when type is defined", () => {
            renderTheme(<Button text="example" type={"submit"} />);
            const ButtonElm = document.querySelector("button[type=submit]");

            expect(ButtonElm).toBeInTheDocument();
        });

        it("should render small Button when small is true", () => {
            renderTheme(<Button text="example" small={true} />);
            const ButtonElm = screen.getByRole("button", { name: "example" });

            expect(ButtonElm).toHaveStyleRule(
                "font-size",
                theme.font.sizes.small
            );
        });

        it("should render Button with default style when variant is default", () => {
            renderTheme(<Button text="example" variant="default" />);
            const ButtonElm = screen.getByRole("button", { name: "example" });

            expect(ButtonElm).toHaveStyleRule(
                "background",
                theme.colors.primaryColor
            );
        });

        it("should render Button with outline style when variant is outline", () => {
            renderTheme(<Button text="example" variant="outline" />);
            const ButtonElm = screen.getByRole("button", { name: "example" });

            expect(ButtonElm).toHaveStyleRule("background", "transparent");
        });

        it("should render Button with success style when variant is success", () => {
            renderTheme(<Button text="example" variant="success" />);
            const ButtonElm = screen.getByRole("button", { name: "example" });

            expect(ButtonElm).toHaveStyleRule(
                "background",
                theme.colors.success
            );
        });

        it("should render Button with danger style when variant is danger", () => {
            renderTheme(<Button text="example" variant="danger" />);
            const ButtonElm = screen.getByRole("button", { name: "example" });

            expect(ButtonElm).toHaveStyleRule(
                "background",
                theme.colors.danger
            );
        });

        it("should match snapshot", () => {
            const { container } = renderTheme(
                <Button text="example" onClickFn={mockFn} />
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe("Functionality", () => {
        it("should call Function on Button Click", () => {
            renderTheme(<Button text="example" onClickFn={mockFn} />);
            const ButtonElm = screen.getByRole("button", { name: "example" });
            fireEvent.click(ButtonElm);
            expect(mockFn).toHaveBeenCalledTimes(1);
        });
    });
});
