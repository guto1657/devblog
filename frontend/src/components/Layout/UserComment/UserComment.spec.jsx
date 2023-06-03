//imports
import { fireEvent, screen } from "@testing-library/react";
//styles
import { renderTheme } from "../../../styles/render-theme";
import { theme } from "../../../styles/theme";
//components
import { UserComment } from "./";

let props = {
    userName: "John Doe",
    creationDate: "2023-04-29",
    commentText: "Lorem ipsum dolor sit amet",
    imageSrc: "https://example.com/user.jpg",
    showActions: false,
    removeCommentFn: jest.fn(),
    editCommentFn: jest.fn(),
    successEditFn: jest.fn(),
    commentId: "1",
    postId: "1",
};

describe("<UserComment />", () => {
    describe("Rendering", () => {
        it("should render UserComment", () => {
            renderTheme(<UserComment {...props} />);

            expect(screen.getByText(props.userName));
            expect(screen.getByText(props.creationDate));
            expect(screen.getByText(props.commentText));
            expect(screen.getByRole("img")).toHaveAttribute(
                "src",
                props.imageSrc
            );
        });

        it("should not render user actions of edit and remove when showActions is false", () => {
            renderTheme(<UserComment {...props} />);

            expect(
                screen.queryByLabelText("Edit Icon")
            ).not.toBeInTheDocument();
            expect(
                screen.queryByLabelText("Remove Icon")
            ).not.toBeInTheDocument();
        });

        it("should render user actions of edit and remove when showActions is true", () => {
            renderTheme(<UserComment {...props} showActions={true} />);

            expect(screen.getByLabelText("Edit Icon")).toBeInTheDocument();
            expect(screen.getByLabelText("Remove Icon")).toBeInTheDocument();
        });

        it("should increase ProfileImageContainer width on mobile", () => {
            renderTheme(<UserComment {...props} />);

            expect(
                screen.getByRole("img", { name: "User Image" }).parentElement
                    .parentElement
            ).toHaveStyleRule("width", "10%", {
                media: theme.media.lteMedium,
            });
        });

        it("should decrease CommentContainer width on mobile", () => {
            renderTheme(<UserComment {...props} />);

            expect(
                screen.getByText(props.userName).parentElement
            ).toHaveStyleRule("width", "90%", {
                media: theme.media.lteMedium,
            });
        });

        it("should match snapshot", () => {
            const { container } = renderTheme(<UserComment {...props} />);

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe("Functionality", () => {
        beforeEach(() => {
            renderTheme(<UserComment {...props} showActions={true} />);
        });

        it("should render edit textarea when edit icon is clicked", () => {
            fireEvent.click(screen.getByLabelText("Edit Icon"));

            expect(
                screen.getByPlaceholderText("Edite seu comentário aqui..")
            ).toBeInTheDocument();
        });

        it("should call removeCommentFn when remove icon is clicked", () => {
            fireEvent.click(screen.getByLabelText("Remove Icon"));

            expect(props.removeCommentFn).toHaveBeenCalledTimes(1);
        });

        it("should close edit textarea on close icon click", () => {
            fireEvent.click(screen.getByLabelText("Edit Icon"));

            expect(
                screen.getByPlaceholderText("Edite seu comentário aqui..")
            ).toBeInTheDocument();

            fireEvent.click(screen.getByLabelText("Close Icon"));

            expect(
                screen.queryByPlaceholderText("Edite seu comentário aqui..")
            ).not.toBeInTheDocument();
        });

        it("should call edit function on proceed icon click and close edit textarea", () => {
            fireEvent.click(screen.getByLabelText("Edit Icon"));

            expect(
                screen.getByPlaceholderText("Edite seu comentário aqui..")
            ).toBeInTheDocument();

            fireEvent.click(screen.getByLabelText("Proceed Icon"));

            expect(props.editCommentFn).toHaveBeenCalledTimes(1);

            expect(
                screen.queryByPlaceholderText("Edite seu comentário aqui..")
            ).not.toBeInTheDocument();
        });

        it("should call successEditFn", () => {
            const newCommentText = "New Comment Text";

            jest.spyOn(props, "editCommentFn").mockImplementation(
                props.successEditFn
            );

            fireEvent.click(screen.getByLabelText("Edit Icon"));

            expect(
                screen.getByPlaceholderText("Edite seu comentário aqui..")
            ).toBeInTheDocument();

            fireEvent.change(
                screen.getByPlaceholderText("Edite seu comentário aqui.."),
                { target: { value: newCommentText } }
            );

            fireEvent.click(screen.getByLabelText("Proceed Icon"));

            expect(props.successEditFn).toHaveBeenCalledTimes(1);
        });
    });
});
