//imports
import styled, { css } from "styled-components";

export const HomeContainer = styled.div`
    ${({ theme }) => css`
        width: 600px;
        margin: 3em auto 0;

        @media ${theme.media.lteMedium} {
            max-width: 100%;
        }
    `}
`;

export const MessageWrapper = styled.div`
    margin-top: 5em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;
