//imports
import { screen } from "@testing-library/react";
//styles
import { renderTheme } from "../../../styles/render-theme";
//components
import { Footer } from "./";

describe("<Footer />", () => {
    describe("Rendering", () => {
        it("should render Footer", () => {
            renderTheme(<Footer />);

            const heading = screen.getByRole("heading", {
                name: "Escreva sobre o que você tem interesse!",
            });

            expect(heading).toBeInTheDocument();
        });

        it("should match snapshot", () => {
            const { container } = renderTheme(<Footer />);

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe("Functionality", () => {
        it("should render Footer copyright text with current year", () => {
            renderTheme(<Footer />);
            const currentYear = new Date().getFullYear();

            const currentYearText = screen.getByText(
                `DevBlog - Gustavo Matos © ${currentYear}`
            );

            expect(currentYearText).toBeInTheDocument();
        });
    });
});
