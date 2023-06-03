//imports
import { fireEvent, screen } from "@testing-library/react";
//styles
import { renderTheme } from "../../../styles/render-theme";
import { theme } from "../../../styles/theme";
//components
import { FormContainer } from "./";

describe("<FormContainer />", () => {
    let fnMock = jest.fn();

    describe("Rendering", () => {
        it("should render FormContainer", () => {
            renderTheme(
                <FormContainer onSubmitFn={fnMock}>
                    <input type="text" placeholder="example" />
                </FormContainer>
            );
            const InputElem = screen.getByPlaceholderText("example");

            expect(InputElem).toBeInTheDocument();
        });

        it("should match snapshot", () => {
            const { container } = renderTheme(
                <FormContainer onSubmitFn={fnMock}>
                    <input type="text" placeholder="example" />
                </FormContainer>
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe("Functionality", () => {
        beforeEach(() => {
            renderTheme(
                <FormContainer onSubmitFn={fnMock}>
                    <input type="text" placeholder="example" />
                    <button type="submit">example</button>
                </FormContainer>
            );
        });

        it("should call a function on form submit", () => {
            const submitButton = screen.getByRole("button", {
                name: "example",
            });
            fireEvent.submit(submitButton);

            expect(fnMock).toBeCalledTimes(1);
        });

        it("should change Form width on mobile", () => {
            const formElement = document.querySelector("form");

            expect(formElement).toHaveStyleRule("width", "100%", {
                media: theme.media.lteMedium,
            });
        });
    });
});
