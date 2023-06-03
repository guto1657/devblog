//Imports
import React from "react";
import P from "prop-types";
//Styles
import * as Styled from "./styles.js";

export const TextComponent = ({ children }) => {
    return <Styled.Text>{children}</Styled.Text>;
};

//PropTypes validation
TextComponent.propTypes = {
    children: P.node.isRequired,
};
