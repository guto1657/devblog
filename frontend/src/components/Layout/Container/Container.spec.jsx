//imports
import { screen } from "@testing-library/react";
//styles
import { renderTheme } from "../../../styles/render-theme";
//components
import { Container } from "./";

describe("<Container />", () => {
    describe("Rendering", () => {
        it("should render Container", () => {
            renderTheme(
                <Container>
                    <h1>example</h1>
                </Container>
            );
            const heading = screen.getByRole("heading", { name: "example" });

            expect(heading).toBeInTheDocument();
        });
        it("should match snapshot", () => {
            const { container } = renderTheme(
                <Container>
                    <h1>example</h1>
                </Container>
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
