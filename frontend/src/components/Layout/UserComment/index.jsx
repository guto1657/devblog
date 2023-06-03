//Imports
import P from "prop-types";
import { useEffect, useRef, useState } from "react";
//Styles
import * as Styled from "./styles";
//Components
import { Heading } from "../Heading";
import { TextComponent } from "../TextComponent";
import { ImageBox } from "../ImageBox";

export const UserComment = ({
    userName,
    creationDate,
    commentText,
    imageSrc,
    showActions = false,
    removeCommentFn,
    editCommentFn,
    commentId,
    successEditFn,
    postId,
}) => {
    /*set the initial state for isActiveEdit to false, to indicate that the user 
    is not currently editing the comment
    */
    const [isActiveEdit, setIsActiveEdit] = useState(false);
    //ref
    const inputRef = useRef(null);

    //function to set active comment edit
    const handleActiveEdit = async () => {
        setIsActiveEdit(true);
    };

    //function to set disabled comment edit
    const handleDisableEdit = () => {
        setIsActiveEdit(false);
    };

    useEffect(() => {
        //set focus to input when user wants to edit comment
        if (isActiveEdit && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isActiveEdit, inputRef]);

    return (
        <Styled.Container>
            <Styled.ProfileImageContainer>
                <ImageBox src={imageSrc} altText="User Image" />
            </Styled.ProfileImageContainer>
            <Styled.CommentContainer>
                <Heading text={userName} type="h6" size="medium" />
                <Heading text={creationDate} size="small" bold={false} />
                {isActiveEdit ? (
                    <Styled.EditInput
                        defaultValue={commentText}
                        ref={inputRef}
                        placeholder="Edite seu comentário aqui.."
                    />
                ) : (
                    <TextComponent>{commentText}</TextComponent>
                )}
            </Styled.CommentContainer>
            {showActions === true && isActiveEdit === true && (
                <>
                    <Styled.ActionsWrapper>
                        <Styled.ProceedIcon
                            onClick={() => {
                                editCommentFn(
                                    postId,
                                    commentId,
                                    inputRef.current.value,
                                    successEditFn
                                );
                                setIsActiveEdit(false);
                            }}
                            aria-label="Proceed Icon"
                        />
                        <Styled.CloseIcon
                            onClick={handleDisableEdit}
                            aria-label="Close Icon"
                        />
                    </Styled.ActionsWrapper>
                </>
            )}
            {showActions === true && isActiveEdit === false && (
                <>
                    <Styled.ActionsWrapper>
                        <Styled.EditIcon
                            onClick={handleActiveEdit}
                            aria-label="Edit Icon"
                        />
                        <Styled.RemoveIcon
                            onClick={() => removeCommentFn(commentId)}
                            aria-label="Remove Icon"
                        />
                    </Styled.ActionsWrapper>
                </>
            )}
        </Styled.Container>
    );
};

//PropTypes validation
UserComment.propTypes = {
    userName: P.string.isRequired,
    creationDate: P.string.isRequired,
    commentText: P.string.isRequired,
    imageSrc: P.string.isRequired,
    commentId: P.string.isRequired,
    showActions: P.bool,
    removeCommentFn: P.func,
    successEditFn: P.func,
    postId: P.string.isRequired,
};
