//Imports
import React from "react";
import P from "prop-types";
//Styles
import * as styled from "./styles";
//Hooks
import { useLocation } from "react-router-dom";

export const NavLink = ({ path, text, onclickFn }) => {
    //hooks
    const { pathname } = useLocation();
    const isActive = pathname === path;

    return (
        <styled.Nav_Link
            to={path}
            className={isActive ? "active" : ""}
            onClick={onclickFn}
        >
            {text}
        </styled.Nav_Link>
    );
};

//PropTypes validation
NavLink.propTypes = {
    path: P.string.isRequired,
    text: P.string.isRequired,
    onclickFn: P.func.isRequired,
};
