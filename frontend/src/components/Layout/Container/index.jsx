//Imports
import React from "react";
import P from "prop-types";
//Styles
import * as styled from "./styles.js";

export const Container = ({ children }) => {
    return <styled.Container>{children}</styled.Container>;
};

//PropTypes validation
Container.propTypes = {
    children: P.node,
};
