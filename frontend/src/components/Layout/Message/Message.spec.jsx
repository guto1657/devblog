//imports
import { screen, waitFor, act } from "@testing-library/react";
//styles
import { theme } from "../../../styles/theme";
import { renderTheme } from "../../../styles/render-theme";
//hooks
import useFlashMessage from "../../../hooks/UseFlashMessage";
//components
import { Message } from "./";

//jest fakeTimers
jest.useFakeTimers();

describe("<Message />", () => {
    describe("Rendering", () => {
        it("should render message with success type", () => {
            jest.useFakeTimers();
            renderTheme(<Message />);
            act(() => {
                useFlashMessage().setFlashMessage("message", "success");
            });

            expect(document.querySelector(".success")).toBeInTheDocument();

            expect(document.querySelector(".success")).toHaveStyle({
                "background-color": theme.colors.success,
            });
        });

        it("should render message with error type", () => {
            jest.useFakeTimers();
            renderTheme(<Message />);
            act(() => {
                useFlashMessage().setFlashMessage("message", "error");
            });

            expect(document.querySelector(".error")).toBeInTheDocument();

            expect(document.querySelector(".error")).toHaveStyle({
                "background-color": theme.colors.danger,
            });
        });

        it("should match snapshot", () => {
            const { container } = renderTheme(<Message />);
            act(() => {
                useFlashMessage().setFlashMessage("message", "success");
            });

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe("Functionality", () => {
        test("should show message and hide after timeout", async () => {
            //render component
            renderTheme(<Message />);

            // set message and type
            act(() => {
                useFlashMessage().setFlashMessage("Text message", "success");
            });

            // check if message is being displayed
            expect(screen.getByText("Text message")).toBeInTheDocument();

            //wait for message to dissapear
            act(() => {
                jest.advanceTimersByTime(4000);
            });

            // check if message was removed
            await waitFor(() => {
                expect(
                    screen.queryByText("Test message")
                ).not.toBeInTheDocument();
            });
        });
    });
});
