//Imports
import React, { useEffect, useState } from "react";
//Helpers
import bus from "../../../helpers/bus";
//Styles
import * as Styled from "./styles";

export const Message = () => {
    //initial states
    const [visibility, setVisibility] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    //function to hide flash message if user click on close icon
    const handleOnClick = () => {
        setVisibility(false);
    };

    //useEffect to add listener to flash event and display flash message
    useEffect(() => {
        bus.addListener("flash", ({ message, type }) => {
            setVisibility(true);
            setMessage(message);
            setType(type);

            //show flash message for 3.5 seconds
            setTimeout(() => {
                setVisibility(false);
            }, 3500);
        });
    }, []);

    return (
        visibility && (
            <Styled.Container className={type}>
                <Styled.MessageText>{message}</Styled.MessageText>{" "}
                <Styled.CloseIcon onClick={handleOnClick} />
            </Styled.Container>
        )
    );
};
