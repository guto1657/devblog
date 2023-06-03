//imports
import { fireEvent, screen } from "@testing-library/react";
//styles
import { renderTheme } from "../../../styles/render-theme";
//components
import { PostForm } from "./index";

describe("<PostForm />", () => {
    let mockFn = jest.fn();

    describe("Rendering", () => {
        it("should render PostForm component", () => {
            renderTheme(
                <PostForm
                    handleSubmit={mockFn}
                    btnText="Submit"
                    headingText="Create Post"
                />
            );

            const imageInputElem = screen.getByLabelText("Imagem do Post:");
            const titleInputElem = screen.getByLabelText("Título do post:");
            const textEditorElem = document.querySelector(".ql-editor");
            const tagsInputElem = screen.getByLabelText("Tags do post:");
            const buttonElem = screen.getByRole("button", { name: "Submit" });
            const formHeading = screen.getByRole("heading", {
                name: "Create Post",
            });

            expect(imageInputElem).toBeInTheDocument();
            expect(titleInputElem).toBeInTheDocument();
            expect(textEditorElem).toBeInTheDocument();
            expect(tagsInputElem).toBeInTheDocument();
            expect(buttonElem).toBeInTheDocument();
            expect(formHeading).toBeInTheDocument();
        });

        it("should match snapshot", () => {
            const { container } = renderTheme(
                <PostForm
                    handleSubmit={mockFn}
                    btnText="Submit"
                    headingText="Create Post"
                />
            );

            expect(container).toMatchSnapshot();
        });
    });

    describe("Functionality", () => {
        it("should call handleSubmit function when form is submitted", () => {
            renderTheme(
                <PostForm
                    handleSubmit={mockFn}
                    btnText="Submit"
                    headingText="Create Post"
                />
            );
            const btnElem = screen.getByRole("button", { name: "Submit" });
            fireEvent.submit(btnElem);

            expect(mockFn).toHaveBeenCalledTimes(1);
        });

        it("should update post state when title input is changed", () => {
            renderTheme(
                <PostForm
                    handleSubmit={mockFn}
                    btnText="Submit"
                    headingText="Create Post"
                />
            );
            const titleInputElem = screen.getByLabelText("Título do post:");
            fireEvent.change(titleInputElem, {
                target: { value: "New title" },
            });

            expect(titleInputElem.value).toBe("New title");
        });

        it("should render inputs with default value when postData is passed", () => {
            const postMock = {
                title: "title test",
                content: "content test",
                tags: ["#test1", "#test2"],
                image: "teste.jpg",
            };

            renderTheme(
                <PostForm
                    handleSubmit={mockFn}
                    btnText="Submit"
                    headingText="Create Post"
                    postData={postMock}
                />
            );
            const titleInputElem = screen.getByLabelText("Título do post:");
            const tagsInputElem = screen.getByLabelText("Tags do post:");
            const textEditorElm = document.querySelector(".ql-editor");
            const imageElm = document.querySelector("img");

            expect(imageElm).toHaveAttribute("src", postMock.image);
            expect(titleInputElem.value).toBe(postMock.title);
            expect(textEditorElm.innerHTML).toBe(`<p>${postMock.content}</p>`);
            expect(tagsInputElem.value).toBe("#test1 #test2");
        });

        it("should render FormHeader subHeading Text when subHeadingText prop is defined", () => {
            renderTheme(
                <PostForm
                    handleSubmit={mockFn}
                    btnText="Submit"
                    headingText="Create Post"
                    subHeadingText="SubHeading example"
                />
            );

            const subHeading = screen.getByText("SubHeading example");

            expect(subHeading).toBeInTheDocument();
        });
    });
});
