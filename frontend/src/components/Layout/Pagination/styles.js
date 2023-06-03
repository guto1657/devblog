//imports
import styled, { css } from "styled-components";

export const PostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const PaginationWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
    margin-top: 1em;
`;

export const PaginationPage = styled.div`
    ${({ theme }) => css`
        padding: 7px;
        height: 40px;
        width: 40px;
        border-radius: 4px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2em;
        transition: ${theme.transition.tran_03};
        cursor: pointer;
        margin-right: 0.3em;
        background: transparent;
        color: ${theme.colors.primaryColor};
        border: 1px solid ${theme.colors.primaryColor};
        transition: ${theme.transition.tran_03};

        &.active {
            background: ${theme.colors.primaryColor};
            color: ${theme.colors.white};
            cursor: default;
            pointer-events: none;
        }

        &:hover {
            background: ${theme.colors.primaryColor};
            color: ${theme.colors.white};
            transition: ${theme.transition.tran_03};
        }
    `}
`;

export const PaginationNavigate = styled.div`
    ${({ theme }) => css`
        background: ${theme.colors.primaryColor};
        padding: 7px;
        height: 40px;
        width: 40px;
        transition: ${theme.transition.tran_03};
        background: transparent;
        color: ${theme.colors.primaryColor};
        border: 1px solid ${theme.colors.primaryColor};
        border-radius: 4px;
        text-align: center;
        display: flex;
        align-items: center;
        transition: ${theme.transition.tran_03};
        justify-content: center;
        font-size: 30px;
        cursor: pointer;
        transition: ${theme.transition.tran_03};

        &:hover {
            background: ${theme.colors.primaryColor};
            color: ${theme.colors.white};
            transition: ${theme.transition.tran_03};
        }

        &:first-child {
            margin-right: 0.3em;
        }
    `}
`;
