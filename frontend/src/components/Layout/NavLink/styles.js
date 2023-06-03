//imports
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const Nav_Link = styled(Link)`
    ${({ theme }) => css`
        font-size: ${theme.font.sizes.default};
        padding: 0.4em 0.5em;
        color: ${theme.colors.primaryColor};
        font-weight: 500;
        transition: ${theme.transition.tran_03};
        text-transform: capitalize;

        &:hover {
            opacity: 0.8;
            transition: ${theme.transition.tran_03};
        }

        &.active {
            background-color: ${theme.colors.primaryColor};
            color: ${theme.colors.white};
            border-radius: 3px;
            cursor: default;

            &:hover {
                opacity: 1;
            }

            @media ${theme.media.lteMedium} {
                cursor: auto;
            }
        }

        @media ${theme.media.lteMedium} {
            color: ${theme.colors.white};
            font-size: ${theme.font.sizes.medium};
        }
    `}
`;
