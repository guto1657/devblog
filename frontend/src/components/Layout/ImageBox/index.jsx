//imports
import P from "prop-types";
//styles
import * as Styled from "./styles";

export const ImageBox = ({ src, altText, rounded = false }) => {
    return (
        <Styled.Container>
            <Styled.ImageElm rounded={rounded} src={src} alt={altText} />
        </Styled.Container>
    );
};

// PropTypes validation
ImageBox.propTypes = {
    src: P.string.isRequired,
    altText: P.string.isRequired,
    rounded: P.bool,
};
