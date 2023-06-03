//Imports
import P from "prop-types";
//Styles
import * as Styled from "./styles";
//Components
import { Heading } from "../../Layout/Heading";

export const FormHeader = ({ headingText, subHeadingText }) => {
    return (
        <Styled.Container>
            <Heading type="h2" size="big" text={headingText} />
            <Styled.Text>{subHeadingText}</Styled.Text>
        </Styled.Container>
    );
};

//PropTypes validation
FormHeader.propTypes = {
    headingText: P.string.isRequired,
    subHeadingText: P.string.isRequired,
};
