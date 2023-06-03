//imports
import React from "react";
import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
//styles
import { renderTheme } from "../../styles/render-theme";
import { theme } from "../../styles/theme";
//components
import { Page404 } from "./";

describe("<Page404 />", () => {
    describe("Rendering", () => {
        beforeEach(() => {
            renderTheme(
                <BrowserRouter>
                    <Page404 />
                </BrowserRouter>
            );
        });

        it("should render the Page404 component", () => {
            const headingElem = screen.getByRole("heading", {
                name: /404: Página não encontrada/i,
            });
            const textElem = screen.getByText(
                /A página solicitada não pode ser encontrada/i
            );
            const buttonElem = screen.getByRole("button", {
                name: /Voltar para home/i,
            });

            expect(headingElem).toBeInTheDocument();
            expect(textElem).toBeInTheDocument();
            expect(buttonElem).toBeInTheDocument();
        });

        it("should apply the correct styles to the Container component", () => {
            const headingElem = screen.getByRole("heading", {
                name: /404: Página não encontrada/i,
            });

            expect(headingElem.parentElement).toHaveStyle("max-width: 60%;");
        });

        it("should apply the correct mobile styles to the Container component", () => {
            const headingElem = screen.getByRole("heading", {
                name: /404: Página não encontrada/i,
            });

            expect(headingElem.parentElement).toHaveStyleRule(
                "max-width",
                "100%",
                {
                    media: theme.media.lteMedium,
                }
            );
        });
    });

    describe("Snapshot", () => {
        it("should match snapshot", () => {
            const { container } = renderTheme(
                <BrowserRouter>
                    <Page404 />
                </BrowserRouter>
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
