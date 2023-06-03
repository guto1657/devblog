//imports
import { screen } from "@testing-library/react";
//styles
import { renderTheme } from "../../../styles/render-theme";
//components
import { FormHeader } from "./";

describe("<FormHeader />", () => {
    describe("Rendering", () => {
        it("should render FormHeader", () => {
            renderTheme(
                <FormHeader
                    headingText="heading test"
                    subHeadingText="subHeading test"
                />
            );

            const heading = screen.getByRole("heading", {
                name: "heading test",
            });
            const subHeading = screen.getByText("subHeading test");

            expect(heading).toBeInTheDocument();
            expect(subHeading).toBeInTheDocument();
        });

        it("should match snapshot", () => {
            const { container } = renderTheme(
                <FormHeader
                    headingText="heading test"
                    subHeadingText="subHeading test"
                />
            );
            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
