//Imports
import P from "prop-types";
//Styles
import * as Styled from "./styles";

export const Button = ({
    text,
    variant = "default",
    type = "button",
    maxWidth = false,
    uppercase = false,
    onClickFn = null,
    small = false,
}) => {
    return (
        <Styled.ButtonContainer
            type={type}
            buttonVariant={variant}
            maxWidth={maxWidth}
            uppercase={uppercase}
            onClick={onClickFn ? onClickFn : undefined}
            isSmall={small}
        >
            {text}
        </Styled.ButtonContainer>
    );
};

//PropTypes validation
Button.propTypes = {
    text: P.string.isRequired,
    type: P.oneOf(["button", "submit", "reset"]),
    variant: P.oneOf(["default", "outline", "success", "danger"]),
    onClickFn: P.func,
    maxWidth: P.bool,
    uppercase: P.bool,
    small: P.bool,
};
