//imports
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
//styles
import { renderTheme } from "../../../styles/render-theme";
import { theme } from "../../../styles/theme";
//components
import { ScrollToTop } from "./";

//window.scrollTo mock
const spyScrollTo = jest.fn();
Object.defineProperty(global.window, "scrollTo", { value: spyScrollTo });

describe("<ScrollToTop />", () => {
    describe("Rendering", () => {
        beforeEach(() => {
            renderTheme(
                <div style={{ height: "1000px" }}>
                    <ScrollToTop />
                </div>
            );
        });

        it("should render ScrollToTop", () => {
            const scrollToTopIcon = screen.getByLabelText("Scroll to top Icon");

            expect(scrollToTopIcon).toBeInTheDocument();
            expect(scrollToTopIcon.parentElement).toBeInTheDocument();
        });

        it("should render ScrollToTop when user windowY is above 100px", () => {
            const scrollToTopIcon = screen.getByLabelText("Scroll to top Icon");

            act(() => {
                fireEvent.scroll(window, {
                    target: { scrollY: 250 },
                });
            });
            waitFor(() => {
                expect(scrollToTopIcon).toHaveStyleRule(
                    "visibility",
                    "visible"
                );
            });
        });

        it("should not show ScrollToTop when user windowY is less then 100px", () => {
            const scrollToTopIcon =
                screen.queryByLabelText("Scroll to top Icon");

            act(() => {
                fireEvent.scroll(window, {
                    target: { scrollY: 50 },
                });
            });
            waitFor(() => {
                expect(scrollToTopIcon).not.toHaveStyleRule(
                    "visibility",
                    "visible"
                );
            });
        });

        it("should not show ScrollToTop on mobile", () => {
            const scrollToTopIcon =
                screen.queryByLabelText("Scroll to top Icon");

            expect(scrollToTopIcon.parentElement).toHaveStyleRule(
                "display",
                "none",
                { media: theme.media.lteMedium }
            );
        });
    });

    describe("Functionality", () => {
        it("should scroll user scroll/window to top on ScrollToTop click", () => {
            renderTheme(
                <div style={{ height: "1000px" }}>
                    <ScrollToTop />
                </div>
            );

            const scrollToTopIcon =
                screen.queryByLabelText("Scroll to top Icon");

            act(() => {
                fireEvent.scroll(window, {
                    target: { scrollY: 100 },
                });
            });
            act(() => {
                fireEvent.click(scrollToTopIcon);
            });

            waitFor(() => {
                expect(spyScrollTo).toHaveBeenCalledWith({
                    top: 0,
                    behavior: "smooth",
                });
            });
        });
    });

    describe("Snapshot", () => {
        it("should match snapshot", () => {
            const { container } = renderTheme(
                <div style={{ height: "1000px" }}>
                    <ScrollToTop />
                </div>
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
