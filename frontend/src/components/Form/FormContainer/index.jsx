//Imports
import React from "react";
import P from "prop-types";
//Styles
import * as Styled from "./styles";

export const FormContainer = ({ children, onSubmitFn }) => {
    return (
        <Styled.Container>
            <Styled.Form onSubmit={onSubmitFn}>{children}</Styled.Form>
        </Styled.Container>
    );
};

//PropTypes validation
FormContainer.propTypes = {
    children: P.node.isRequired,
    onSubmitFn: P.func.isRequired,
};
