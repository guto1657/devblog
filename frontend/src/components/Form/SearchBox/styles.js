//imports
import styled, { css } from "styled-components";
//components styles
import { ButtonContainer as Button } from "../../Layout/Button/styles";
import { Container as Heading } from "../../Layout/Heading/styles";
import { InputComponent } from "../Input/styles";

export const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-bottom: 2em;

    & ${Heading} {
        margin-bottom: 0.5em;
    }
`;

export const SearchWrapper = styled.div`
    ${({ theme }) => css`
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin: 0 auto;

        & ${Button} {
            width: 20%;
            padding: 7px;
            border-radius: 2px;

            @media ${theme.media.lteMedium} {
                width: 35%;
            }
        }

        @media ${theme.media.lteMedium} {
            width: 100%;
        }
    `}
`;

export const SearchInput = styled(InputComponent)`
    ${({ theme }) => css`
        width: 78%;

        @media ${theme.media.lteMedium} {
            width: 60%;
        }
    `}
`;
