//imports
import styled, { css } from "styled-components";
//react icons
import { IoClose } from "react-icons/io5";

export const Container = styled.div`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        padding: 25px 30px;
        min-width: 25%;
        border-radius: 7px;
        z-index: 9999;
        font-weight: bold;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: ${theme.transition.tran_03};

        &.success {
            background-color: ${theme.colors.success};
            color: ${theme.colors.white};
        }

        &.error {
            background-color: ${theme.colors.danger};
            color: ${theme.colors.white};
        }

        @media ${theme.media.lteMedium} {
            bottom: 0;
            right: 50%;
            left: 50%;
            min-width: 90%;
            transform: translate(-50%, -50%);
        }
    `}
`;

export const CloseIcon = styled(IoClose)`
    ${({ theme }) => css`
        color: ${theme.colors.white};
        cursor: pointer;
        font-size: 19px;
        margin-left: 0.3em;
    `}
`;

export const MessageText = styled.span`
    display: block;
`;
