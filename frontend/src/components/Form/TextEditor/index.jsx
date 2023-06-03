//Imports
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import P from "prop-types";
//Styles
import * as styled from "./styles";

export const TextEditor = ({ defaultValue, handleOnChangeFn }) => {
    //initial states
    const [value, setValue] = useState(defaultValue || "");

    //function to handle text value change on text editor
    const handleTextValueChange = (content) => {
        setValue(content);
        if (typeof handleOnChangeFn === "function") {
            handleOnChangeFn(content);
        }
    };

    return (
        <styled.Container>
            <styled.Label>Conteúdo do Post:</styled.Label>
            <ReactQuill value={value} onChange={handleTextValueChange} />
        </styled.Container>
    );
};

//PropTypes validation
TextEditor.propTypes = {
    defaultValue: P.string,
    handleOnChangeFn: P.func,
};
