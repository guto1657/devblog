//Imports
import P from "prop-types";
//Styles
import * as Styled from "./styles";

export const Heading = ({
    text,
    uppercase = false,
    bold = true,
    size = "huge",
    type = "h1",
}) => {
    return (
        <Styled.Container
            uppercase={uppercase ? 1 : 0}
            bold={bold ? 1 : 0}
            as={type}
            size={size}
        >
            {text}
        </Styled.Container>
    );
};

//PropTypes validation
Heading.propTypes = {
    text: P.string.isRequired,
    uppercase: P.bool,
    bold: P.bool,
    size: P.oneOf(["huge", "big", "large", "medium", "small", "xsmall"]),
    type: P.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
};
