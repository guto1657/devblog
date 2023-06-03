//imports
import styled, { css } from "styled-components";

export const Text = styled.p`
    ${({ theme }) => css`
        font-size: ${theme.font.sizes.default};
        line-height: ${theme.font.line_height.default};
    `}
`;
