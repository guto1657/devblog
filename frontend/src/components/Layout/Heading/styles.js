//imports
import styled, { css } from "styled-components";

const headingSize = {
    huge: (theme) => css`
        font-size: ${theme.font.sizes.xhuge};
        line-height: ${theme.font.line_height.h1};
        ${mediaFont(theme)};
    `,
    big: (theme) => css`
        font-size: ${theme.font.sizes.huge};
        line-height: ${theme.font.line_height.h2};
    `,
    large: (theme) => css`
        font-size: ${theme.font.sizes.xxlarge};
        line-height: ${theme.font.line_height.h3};
    `,
    medium: (theme) => css`
        font-size: ${theme.font.sizes.medium};
        line-height: ${theme.font.line_height.h6};
    `,
    small: (theme) => css`
        font-size: ${theme.font.sizes.small};
        line-height: ${theme.font.line_height.small};
    `,
    xsmall: (theme) => css`
        font-size: ${theme.font.sizes.xsmall};
        line-height: ${theme.font.line_height.small};
    `,
};

const mediaFont = (theme) => css`
    @media ${theme.media.lteMedium} {
        font-size: ${theme.font.sizes.xlarge};
        line-height: ${theme.font.line_height.h4};
    }
`;

export const Container = styled.h1`
    ${({ theme, size, uppercase, bold }) => css`
        text-transform: ${uppercase ? "uppercase" : "none"};
        font-weight: ${bold ? "bold" : 500};
        ${headingSize[size](theme)};
    `}
`;
