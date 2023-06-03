//Imports
import P from "prop-types";
//Styles
import * as Styled from "./styles";
//Components
import { Button } from "../../Layout/Button";

export const CommentBox = ({ onClickFn, placeHolderText, inputRef = null }) => {
    return (
        <Styled.Container>
            <Styled.CommentInput
                type="text"
                name="commentText"
                placeholder={placeHolderText}
                ref={inputRef}
            />
            <Button text="Comentar" onClickFn={onClickFn} />
        </Styled.Container>
    );
};

//PropTypes validation
CommentBox.propTypes = {
    onClickFn: P.func.isRequired,
    placeHolderText: P.string.isRequired,
    inputRef: P.oneOfType([P.func, P.shape({ current: P.any })]),
};
