//imports
import styled, { css } from "styled-components";
//components styles
import { ButtonContainer as Button } from "../../../components/Layout/Button/styles";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Form = styled.form`
    ${({ theme }) => css`
        width: 450px;
        margin-top: 3em;

        & > ${Button} {
            margin-top: 1em;
        }

        @media ${theme.media.lteMedium} {
            width: 100%;
            min-width: 0;
            max-width: 100%;
        }
    `}
`;
