//imports
import { screen } from "@testing-library/react";
//styles
import { renderTheme } from "../../../styles/render-theme";
//components
import { ImageBox } from "./";

describe("<ImageBox />", () => {
    describe("Rendering", () => {
        beforeEach(() => {
            renderTheme(<ImageBox src="test.jpg" altText="alt test" />);
        });

        it("should render ImageBox", () => {
            const imageElm = screen.getByAltText("alt test");

            expect(imageElm).toBeInTheDocument();
        });

        it("should render ImageBox with src attribute", () => {
            const imageElm = screen.getByAltText("alt test");

            expect(imageElm).toHaveAttribute("src", "test.jpg");
        });
    });

    describe("Functionality", () => {
        it("should round image when rounded prop is true", () => {
            renderTheme(<ImageBox src="test.jpg" altText="alt test" rounded />);

            const imageElm = screen.getByAltText("alt test");

            expect(imageElm).toHaveStyleRule("border-radius", "50%");
        });

        it("should not round image when rounded prop is false", () => {
            renderTheme(<ImageBox src="test.jpg" altText="alt test" />);

            const imageElm = screen.getByAltText("alt test");

            expect(imageElm).toHaveStyleRule("border-radius", "7px");
        });
    });

    describe("Snapshot", () => {
        it("should match snapshot", () => {
            const { container } = renderTheme(
                <ImageBox src="test.jpg" altText="alt test" />
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
