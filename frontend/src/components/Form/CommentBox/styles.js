//imports
import styled, { css } from "styled-components";
//components styles
import { InputComponent } from "../Input/styles";
import { ButtonContainer as Button } from "../../Layout/Button/styles";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    & ${Button} {
        padding: 12px 16px;
    }
`;

export const CommentInput = styled(InputComponent)`
    ${({ theme }) => css`
        border: 1px solid ${theme.colors.gray};
        transition: ${theme.transition.tran_03};
        padding: 12px 7px;
        width: 90%;
        border-radius: 5px;
        font-size: 1em;
        margin-right: 7px;

        &:focus {
            border: 1px solid ${theme.colors.primaryColor};
            transition: ${theme.transition.tran_03};
        }
    `}
`;
