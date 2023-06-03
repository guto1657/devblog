//imports
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//styles
import { renderTheme } from "../../../styles/render-theme";
//components
import { TextEditor } from "./";

describe("<TextEditor />", () => {
    describe("Rendering", () => {
        it("should render TextEditor with label", () => {
            renderTheme(<TextEditor />);
            const labelElement = screen.getByText("Conteúdo do Post:");
            expect(labelElement).toBeInTheDocument();
        });

        it("should render default value", () => {
            const defaultValue = "Hello World!";
            renderTheme(<TextEditor defaultValue={defaultValue} />);
            expect(document.querySelector(".ql-editor p").innerHTML).toBe(
                defaultValue
            );
        });
        it("should match snapshot", () => {
            const { container } = renderTheme(<TextEditor />);
            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe("Functionality", () => {
        let newValue = "Hello Quill!";

        it("updates textEditor value when user types", async () => {
            renderTheme(<TextEditor />);
            const editor = document.querySelector(".ql-editor");

            userEvent.type(editor, newValue);

            await waitFor(() => {
                expect(editor.innerHTML).toContain(`<p>${newValue}</p>`);
            });
        });
        it("call function on change", async () => {
            const mockFn = jest.fn();
            renderTheme(<TextEditor handleOnChangeFn={mockFn} />);

            const editor = document.querySelector(".ql-editor");

            await act(async () => {
                await userEvent.type(editor, newValue);
            });

            await waitFor(() => {
                expect(mockFn).toHaveBeenCalledTimes(12);
            });
        });
    });
});
