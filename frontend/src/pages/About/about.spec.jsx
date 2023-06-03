//imports
import React from "react";
import { screen } from "@testing-library/react";
//styles
import { renderTheme } from "../../styles/render-theme";
import { theme } from "../../styles/theme";
//components
import { About } from "./";

describe("<About />", () => {
    describe("Rendering", () => {
        beforeEach(() => {
            renderTheme(<About />);
        });

        it("should render the About component", () => {
            const headingElem = screen.getByRole("heading", {
                name: /Sobre o DevBlog/i,
            });
            const textElem = screen.getByText(
                /Este é um projeto de blog full-stack, que utiliza tecnologias tanto no front-end quanto no back-end./i
            );

            expect(headingElem).toBeInTheDocument();
            expect(textElem).toBeInTheDocument();
        });

        it("should apply the correct styles to the AboutContainer component", () => {
            const headingElem = screen.getByRole("heading", {
                name: /Sobre o DevBlog/i,
            });

            expect(headingElem.parentElement).toHaveStyle("max-width: 60%;");
        });

        it("should apply the correct mobile styles to the AboutContainer component", () => {
            const headingElem = screen.getByRole("heading", {
                name: /Sobre o DevBlog/i,
            });

            expect(headingElem.parentElement).toHaveStyleRule(
                "max-width",
                "100%",
                {
                    media: theme.media.lteMedium,
                }
            );
        });

        describe("Snapshot", () => {
            it("should match snapshot", () => {
                const { container } = renderTheme(<About />);

                expect(container.firstChild).toMatchSnapshot();
            });
        });
    });
});
