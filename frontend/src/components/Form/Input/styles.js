//imports
import styled, { css } from "styled-components";

export const FormControl = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
`;

export const LabelComponent = styled.label`
    display: block;
    margin-bottom: 0.3em;
    font-weight: 700;
`;

export const InputComponent = styled.input`
    ${({ theme }) => css`
        padding: 7px 0;
        outline: none;
        border: none;
        border-bottom: 1px solid ${theme.colors.gray};
        background-color: transparent;
        font-size: ${theme.font.sizes.default};
        transition: ${theme.transition.tran_05};

        &:focus {
            border-bottom: 1px solid ${theme.colors.primaryColor};
            transition: ${theme.transition.tran_03};
        }
    `}
`;
