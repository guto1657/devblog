//imports
import { fireEvent, screen } from "@testing-library/react";
//styles
import { renderTheme } from "../../../styles/render-theme";
//components
import { Input } from "./";

describe("<Input />", () => {
    let mockFn = jest.fn();

    describe("Rendering", () => {
        it("should render Input Component", () => {
            renderTheme(
                <Input
                    inputName="example"
                    onChangeFn={mockFn}
                    labelText="Example"
                    inputType="text"
                    placeholderText="placeholder example"
                />
            );
            const InputElem = screen.getByPlaceholderText(
                "placeholder example"
            );

            expect(InputElem).toBeInTheDocument();
        });

        it("should render label Component with correct labelText", () => {
            renderTheme(
                <Input
                    inputName="example"
                    onChangeFn={mockFn}
                    labelText="Example"
                    inputType="text"
                    placeholderText="placeholder example"
                />
            );
            const labelElem = screen.getByLabelText("Example");

            expect(labelElem).toBeInTheDocument();
        });

        it("should render Input Component with correct name", () => {
            renderTheme(
                <Input
                    inputName="example"
                    onChangeFn={mockFn}
                    labelText="Example"
                    inputType="text"
                    placeholderText="placeholder example"
                />
            );
            const InputElem = document.getElementsByName("example")[0];

            expect(InputElem).toBeInTheDocument();
        });

        it("should render Input Component with correct type", () => {
            renderTheme(
                <Input
                    inputName="example"
                    onChangeFn={mockFn}
                    labelText="Example"
                    inputType="text"
                    placeholderText="placeholder example"
                />
            );
            const InputElem = document.querySelector("input[type=text]");

            expect(InputElem).toBeInTheDocument();
        });

        it("should render Input Component with default value when InputValue is defined", () => {
            renderTheme(
                <Input
                    inputName="example"
                    onChangeFn={mockFn}
                    labelText="Example"
                    inputType="text"
                    placeholderText="placeholder example"
                    inputValue="potato"
                />
            );
            const InputElem = screen.getByPlaceholderText(
                "placeholder example"
            );

            expect(InputElem.value).toBe("potato");
        });

        it("should not render Input Component with default value when InputValue is not defined", () => {
            renderTheme(
                <Input
                    inputName="example"
                    onChangeFn={mockFn}
                    labelText="Example"
                    inputType="text"
                    placeholderText="placeholder example"
                />
            );
            const InputElem = screen.getByPlaceholderText(
                "placeholder example"
            );

            expect(InputElem.value).toBe("");
        });

        it("should match snapshot", () => {
            const { container } = renderTheme(
                <Input
                    inputName="example"
                    onChangeFn={mockFn}
                    labelText="Example"
                    inputType="text"
                    placeholderText="placeholder example"
                />
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe("Functionality", () => {
        it("should call Input function on input change", () => {
            renderTheme(
                <Input
                    inputName="example"
                    onChangeFn={mockFn}
                    labelText="Example"
                    inputType="text"
                    placeholderText="placeholder example"
                />
            );
            const InputElem = screen.getByPlaceholderText(
                "placeholder example"
            );

            fireEvent.change(InputElem, { target: { value: "Test" } });

            expect(mockFn).toHaveBeenCalledTimes(1);
        });
    });
});
