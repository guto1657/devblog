//imports
import { screen } from "@testing-library/react";
//styles
import { renderTheme } from "../../../styles/render-theme";
//components
import { TextComponent } from "./";

describe("<TextComponent />", () => {
    describe("Rendering", () => {
        it("should render TextComponent", () => {
            renderTheme(<TextComponent>example</TextComponent>);
            const text = screen.getByText("example");

            expect(text).toBeInTheDocument();
        });

        it("should match snapshot", () => {
            const { container } = renderTheme(
                <TextComponent>example</TextComponent>
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
