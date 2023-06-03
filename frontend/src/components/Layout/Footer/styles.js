//imports
import styled, { css } from "styled-components";

export const FooterWrapper = styled.footer`
    ${({ theme }) => css`
        height: 250px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: ${theme.colors.footerBackground};
        text-align: center;
    `}
`;
export const FooterHeading = styled.h3`
    ${({ theme }) => css`
        @media ${theme.media.lteMedium} {
            font-size: ${theme.font.sizes.medium};
            line-height: ${theme.font.line_height.h6};
        }
    `}
`;

export const CopyrightText = styled.span`
    display: block;
    margin-top: 0.8em;
`;
