//Imports
import P from "prop-types";
import { useState } from "react";
//Components
import { Input } from "../Input";
import { TextEditor } from "../TextEditor";
import { Button } from "../../Layout/Button";
import { FormHeader } from "../FormHeader";
import { FormContainer } from "../FormContainer";
import { ImageBox } from "../../Layout/ImageBox";
import { TextComponent } from "../../Layout/TextComponent";

export const PostForm = ({
    handleSubmit,
    postData,
    btnText,
    headingText,
    subHeadingText = "",
}) => {
    //initial states
    const [post, setPost] = useState(postData || {});
    const [preview, setPreview] = useState();

    //function to handle on input change and set post object value
    const handleOnChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    //function to handle on text editor change
    const handleContentChange = (contentValue) => {
        setPost({ ...post, content: contentValue });
    };

    //function to handle on file change
    const handleOnFileChange = (e) => {
        setPreview(e.target.files[0]);
        setPost({ ...post, image: e.target.files[0] });
    };

    //function to handle submit
    const handleOnSubmit = (e) => {
        e.preventDefault();
        handleSubmit(post);
    };

    return (
        <FormContainer onSubmitFn={handleOnSubmit}>
            <FormHeader
                headingText={headingText}
                subHeadingText={subHeadingText}
            />
            {preview ? (
                <>
                    <TextComponent>
                        <strong>Preview:</strong>
                    </TextComponent>
                    <ImageBox
                        src={URL.createObjectURL(preview)}
                        altText={post.title}
                    />
                </>
            ) : (
                post.image && (
                    <>
                        <TextComponent>
                            <strong>Preview:</strong>
                        </TextComponent>
                        <ImageBox src={post.image} altText={post.title} />
                    </>
                )
            )}

            <Input
                inputType="file"
                labelText="Imagem do Post:"
                inputName="image"
                onChangeFn={handleOnFileChange}
            />
            <Input
                inputType="text"
                placeholderText="Título do post"
                labelText="Título do post:"
                inputName="title"
                onChangeFn={handleOnChange}
                inputValue={post.title || ""}
            />
            <TextEditor
                handleOnChangeFn={handleContentChange}
                defaultValue={post.content || ""}
            />
            <Input
                inputType="text"
                placeholderText="Adicionar tags ex: #tag1 #tag2"
                labelText="Tags do post:"
                inputName="tags"
                onChangeFn={handleOnChange}
                inputValue={
                    Array.isArray(post.tags) && postData
                        ? post.tags.join(" ")
                        : ""
                }
            />

            <Button
                type="submit"
                text={btnText}
                maxWidth
                variant="success"
                uppercase
            />
        </FormContainer>
    );
};

//PropTypes validation
PostForm.propTypes = {
    postData: P.object,
    handleSubmit: P.func,
    btnText: P.string.isRequired,
    headingText: P.string.isRequired,
    subHeadingText: P.string,
};
