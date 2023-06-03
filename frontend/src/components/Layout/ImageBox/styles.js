//imports
import styled, { css } from "styled-components";

const handleBigStyle = () => css`
    width: 100%;
    height: auto;
`;

export const Container = styled.div`
    ${({ theme }) => css``}
`;

export const ImageElm = styled.img`
    ${({ rounded }) => css`
        width: 150px;
        height: 150px;
        object-fit: cover;
        display: block;
        margin: 1em auto;
        border-radius: ${rounded ? "50%" : "7px"};
    `}
`;
