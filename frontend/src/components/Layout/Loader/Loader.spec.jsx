//imports
import { screen } from "@testing-library/react";
//styles
import { renderTheme } from "../../../styles/render-theme";
//components
import { Loader } from "./";

describe("<Loader />", () => {
    it("should render Loader", () => {
        renderTheme(<Loader />);
        const LoaderElm = screen.getByLabelText("Loading-dots");

        expect(LoaderElm).toBeInTheDocument();
    });

    it("should render Loader with pulsating dot animation", () => {
        renderTheme(<Loader />);
        const LoaderElm = screen.getByLabelText("Loading-dots");

        expect(LoaderElm).toHaveStyleRule(
            "animation",
            "bblFadInOut 1.8s infinite ease-in-out"
        );
    });

    it("should match snapshot", () => {
        const { container } = renderTheme(<Loader />);

        expect(container.firstChild).toMatchSnapshot();
    });
});
