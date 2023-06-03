//imports
import styled, { css } from "styled-components";
//components styles
import { TextComponent } from "../../Layout/TextComponent";

export const Container = styled.div`
    ${({ theme }) => css`
        margin-bottom: 1em;
    `}
`;

export const Text = styled(TextComponent)`
    margin-top: 0.3em;
`;
