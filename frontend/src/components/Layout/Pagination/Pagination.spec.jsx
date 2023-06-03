//imports
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
//styles
import { renderTheme } from "../../../styles/render-theme";
//mocks
import { postsMock } from "./postsMock";
//components
import { Pagination } from "./";

//window.scrollTo mock
const spyScrollTo = jest.fn();
Object.defineProperty(global.window, "scrollTo", { value: spyScrollTo });

describe("<Pagination />", () => {
    describe("Rendering", () => {
        beforeEach(() => {
            renderTheme(
                <BrowserRouter>
                    <Pagination posts={postsMock} postsPerPage={3} />
                </BrowserRouter>
            );
        });

        it("should render Pagination next button", () => {
            const nextElm = screen.getByLabelText("Next Page");

            expect(nextElm).toBeInTheDocument();
        });

        it("should render Pagination previous button", () => {
            const nextElm = screen.getByLabelText("Next Page");

            fireEvent.click(nextElm);

            const previousElm = screen.getByLabelText("Previous Page");

            expect(previousElm).toBeInTheDocument();
        });

        it("should render Pagination pages buttons", () => {
            const paginationButtons =
                screen.getAllByLabelText("Pagination Button");

            expect(paginationButtons).toHaveLength(2);
        });

        it("should match snapshot", () => {
            const { container } = renderTheme(
                <BrowserRouter>
                    <Pagination posts={postsMock} postsPerPage={3} />
                </BrowserRouter>
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });
    describe("Functionality", () => {
        beforeEach(() => {
            renderTheme(
                <BrowserRouter>
                    <Pagination posts={postsMock} postsPerPage={3} />
                </BrowserRouter>
            );
        });

        it("should go to next page when clicking next button", () => {
            const nextButton = screen.getByLabelText("Next Page");
            const paginationButtons =
                screen.getAllByLabelText("Pagination Button");

            fireEvent.click(nextButton);

            expect(paginationButtons[0]).not.toHaveClass("active");
            expect(paginationButtons[1]).toHaveClass("active");
        });

        it("should go to previous page when clicking previous button", () => {
            const nextButton = screen.getByLabelText("Next Page");
            const paginationButtons =
                screen.getAllByLabelText("Pagination Button");

            //go to next page
            fireEvent.click(nextButton);

            expect(paginationButtons[0]).not.toHaveClass("active");
            expect(paginationButtons[1]).toHaveClass("active");

            const previousButton = screen.getByLabelText("Previous Page");

            //go to previous page
            fireEvent.click(previousButton);

            expect(paginationButtons[0]).toHaveClass("active");
            expect(paginationButtons[1]).not.toHaveClass("active");
        });

        it("should go to page 2 when clicking second pagination button", () => {
            const paginationButtons =
                screen.getAllByLabelText("Pagination Button");

            expect(paginationButtons[0]).toHaveClass("active");
            expect(paginationButtons[1]).not.toHaveClass("active");

            fireEvent.click(paginationButtons[1]);

            expect(paginationButtons[0]).not.toHaveClass("active");
            expect(paginationButtons[1]).toHaveClass("active");
        });

        it("should scroll user scroll/window to top on next button click", () => {
            const nextButton = screen.getByLabelText("Next Page");

            fireEvent.click(nextButton);

            waitFor(() => {
                expect(spyScrollTo).toHaveBeenCalledWith({
                    top: 0,
                    behavior: "smooth",
                });
            });
        });

        it("should scroll user scroll/window to top on previous button click", () => {
            const paginationButtons =
                screen.getAllByLabelText("Pagination Button");

            fireEvent.click(paginationButtons[1]);

            const previousButton = screen.getByLabelText("Previous Page");

            fireEvent.click(previousButton);

            waitFor(() => {
                expect(spyScrollTo).toHaveBeenCalledWith({
                    top: 0,
                    behavior: "smooth",
                });
            });
        });

        it("should scroll user scroll/window to top on pagination button click", () => {
            const paginationButtons =
                screen.getAllByLabelText("Pagination Button");

            fireEvent.click(paginationButtons[1]);

            waitFor(() => {
                expect(spyScrollTo).toHaveBeenCalledWith({
                    top: 0,
                    behavior: "smooth",
                });
            });
        });

        it("should hide previous button when user current page is 1", () => {
            const previousButton = screen.queryByLabelText("Previous Page");

            waitFor(() => {
                expect(previousButton).not.toBeInTheDocument();
            });
        });

        it("should hide next button when user current page is equal to total pages", () => {
            const nextButton = screen.queryByLabelText("Next Page");

            //go to next page
            fireEvent.click(nextButton);

            waitFor(() => {
                expect(nextButton).not.toBeInTheDocument();
            });
        });

        it("should render posts correctly in current page", () => {
            let heading = screen.getAllByRole("heading");
            const nextButton = screen.getByLabelText("Next Page");

            expect(heading).toHaveLength(3);

            //go to next page
            fireEvent.click(nextButton);

            heading = screen.getAllByRole("heading");

            expect(heading).toHaveLength(1);
        });
    });
});
