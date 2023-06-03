//imports
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
//styles
import { renderTheme } from "../../../styles/render-theme";
//components
import { Post } from "./";

describe("<Post />", () => {
    describe("Rendering", () => {
        beforeEach(() => {
            renderTheme(
                <BrowserRouter>
                    <Post
                        imgSrc={"image.png"}
                        headingText={"heading example"}
                        author={"author example"}
                        tags={["#test1", "#test2"]}
                        postData={"2023-04-05T19:27:03.125+00:00"}
                        id="1"
                    />
                </BrowserRouter>
            );
        });

        it("should render Post", () => {
            const heading = screen.getByRole("heading", {
                name: "heading example",
            });

            expect(heading).toBeInTheDocument();
        });

        it("should render Post with correct alt value", () => {
            const postImage = document.querySelector("img");

            expect(postImage.alt).toContain("heading example");
        });

        it("should render Post with correct src value", () => {
            const postImage = document.querySelector("img");

            expect(postImage.src).toContain("image.png");
        });

        it("should render Post author with correct name and data", () => {
            // Regex to include optional whitespace around characters.
            const authorText = screen.getByText(
                /Por:\s*author example\s*-\s*5 de Abril 2023/
            );

            expect(authorText).toBeInTheDocument();
        });

        it("should render each post tag of array", () => {
            expect(screen.getByText("test1")).toBeInTheDocument();
            expect(screen.getByText("test2")).toBeInTheDocument();
        });

        test("should render TagText with a before style rule", () => {
            const tagText = screen.getByText("test1");

            expect(tagText).toHaveStyleRule("content", '"#"', {
                modifier: "&::before",
            });
            expect(tagText).toHaveStyleRule("font-weight", "bold", {
                modifier: "&::before",
            });
        });
    });

    describe("Functionality", () => {
        it("should call function on button click to redirect to post page", () => {
            //function mock
            const navigateMock = jest.fn();
            /* doMock method to replace "react-router-dom" module and then 
            replace useNavigate hook to navigateMock */
            jest.doMock("react-router-dom", () => ({
                ...jest.requireActual("react-router-dom"),
                useNavigate: () => navigateMock,
            }));

            renderTheme(
                <BrowserRouter>
                    <Post
                        imgSrc={"image.png"}
                        headingText={"heading example"}
                        author={"author example"}
                        tags={["#test1", "#test2"]}
                        postData={"2023-04-05T19:27:03.125+00:00"}
                        id="1"
                    />
                </BrowserRouter>
            );

            const buttonElm = screen.getByRole("button", { name: "Ler" });

            fireEvent.click(buttonElm);

            // waitFor to wait navigateMock be called
            waitFor(() => {
                expect(navigateMock).toHaveBeenCalledWith("/post/1");
            });
        });
    });

    describe("Snapshot", () => {
        it("should match snapshot", () => {
            const { container } = renderTheme(
                <BrowserRouter>
                    <Post
                        imgSrc={"image.png"}
                        headingText={"heading example"}
                        author={"author example"}
                        tags={["#test1", "#test2"]}
                        postData={"2023-04-05T19:27:03.125+00:00"}
                        id="1"
                    />
                </BrowserRouter>
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
