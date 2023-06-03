//Imports
import React from "react";
//Styles
import * as styled from "./styles";

export const Footer = () => {
    const currentDate = new Date();

    return (
        <styled.FooterWrapper>
            <styled.FooterHeading>
                Escreva sobre o que você tem interesse!
            </styled.FooterHeading>
            <styled.CopyrightText>
                DevBlog - Gustavo Matos © {currentDate.getFullYear()}
            </styled.CopyrightText>
        </styled.FooterWrapper>
    );
};
