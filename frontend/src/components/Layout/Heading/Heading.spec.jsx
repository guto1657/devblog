//imports
import { screen } from "@testing-library/react";
//styles
import { renderTheme } from "../../../styles/render-theme";
import { theme } from "../../../styles/theme";
//components
import { Heading } from "./";

describe("<Heading />", () => {
    it("should render Heading", () => {
        renderTheme(<Heading text={"example"} />);
        const heading = screen.getByRole("heading", { name: "example" });

        expect(heading).toBeInTheDocument();
    });

    it("should render Heading with bold when bold prop is true", () => {
        renderTheme(<Heading text={"example"} bold />);
        const heading = screen.getByRole("heading", { name: "example" });

        expect(heading).toHaveStyleRule("font-weight", "bold");
    });
    it("should render Heading without bold when bold prop is false", () => {
        renderTheme(<Heading text={"example"} bold={false} />);
        const heading = screen.getByRole("heading", { name: "example" });

        expect(heading).toHaveStyleRule("font-weight", "500");
    });
    it("should render Heading without uppercase when uppercase prop is false", () => {
        renderTheme(<Heading text={"example"} />);
        const heading = screen.getByRole("heading", { name: "example" });

        expect(heading).toHaveStyleRule("text-transform", "none");
    });
    it("should render Heading with uppercase when uppercase prop is true", () => {
        renderTheme(<Heading text={"example"} uppercase />);
        const heading = screen.getByRole("heading", { name: "example" });

        expect(heading).toHaveStyleRule("text-transform", "uppercase");
    });
    it("should render Heading as correct type when type is specified", () => {
        renderTheme(<Heading text={"example"} type="h3" />);
        const heading = screen.getByRole("heading", {
            name: "example",
            level: 3,
        });

        expect(heading).toBeInTheDocument();
    });
    it("should render Heading with correct styled when size is specified", () => {
        renderTheme(<Heading text={"example"} size="large" />);
        const heading = screen.getByRole("heading", {
            name: "example",
        });

        expect(heading).toHaveStyleRule("font-size", theme.font.sizes.xxlarge);
    });
    it("should render huge Heading with reduced font size on mobile", () => {
        renderTheme(<Heading text={"example"} size="huge" />);
        const heading = screen.getByRole("heading", {
            name: "example",
        });

        expect(heading).toHaveStyleRule("font-size", theme.font.sizes.xlarge, {
            media: theme.media.lteMedium,
        });
    });
    it("should match snapshot", () => {
        const { container } = renderTheme(<Heading text={"example"} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
