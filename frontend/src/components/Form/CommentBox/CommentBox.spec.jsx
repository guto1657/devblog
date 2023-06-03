//imports
import { fireEvent, screen } from "@testing-library/react";
//styles
import { renderTheme } from "../../../styles/render-theme";
//components
import { CommentBox } from "./";

describe("<CommentBox />", () => {
    let mockClickFn = jest.fn();
    let placeHolderText = "placeholder test";

    describe("Rendering", () => {
        beforeEach(() => {
            renderTheme(
                <CommentBox
                    onClickFn={mockClickFn}
                    placeHolderText={placeHolderText}
                />
            );
        });

        it("should render CommentBox", () => {
            const input = screen.getByPlaceholderText(placeHolderText);
            const button = screen.getByRole("button", { name: "Comentar" });

            expect(input).toBeInTheDocument();
            expect(button).toBeInTheDocument();
        });

        it("should render CommentBox with correct placeHolderText", () => {
            const input = screen.getByPlaceholderText(placeHolderText);

            expect(input).toBeInTheDocument();
        });
    });

    describe("Functionality", () => {
        it("should call onClickFn on button click", () => {
            renderTheme(
                <CommentBox
                    onClickFn={mockClickFn}
                    placeHolderText={placeHolderText}
                />
            );
            const button = screen.getByRole("button", { name: "Comentar" });

            fireEvent.click(button);

            expect(mockClickFn).toHaveBeenCalledTimes(1);
        });
    });

    describe("Snapshot", () => {
        it("should match snapshot", () => {
            const { container } = renderTheme(
                <CommentBox
                    onClickFn={mockClickFn}
                    placeHolderText={placeHolderText}
                />
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
