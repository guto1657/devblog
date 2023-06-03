//imports
import styled, { css } from "styled-components";
//components
import { Text as TextComponent } from "../../../components/Layout/TextComponent/styles";
import { ImageElm } from "../ImageBox/styles";
import { InputComponent } from "../../Form/Input/styles";
//react icons
import { IoCheckmark } from "react-icons/io5";
import { MdEdit, MdClose } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export const Container = styled.div`
    ${({ theme }) => css`
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin: 2em 0;
        padding: 0 7px;
        position: relative;
    `}
`;

export const ProfileImageContainer = styled.div`
    ${({ theme }) => css`
        min-width: 7%;
        width: 7%;
        height: 100%;
        margin: 0 1em 0 0;

        ${ImageElm} {
            width: 100%;
            height: 100%;
            margin: 0;
        }

        @media ${theme.media.lteMedium} {
            width: 10%;
            min-width: 10%;
        }
    `}
`;

export const CommentContainer = styled.div`
    ${({ theme }) => css`
        width: 93%;
        border-bottom: 1px solid ${theme.colors.gray};
        padding-bottom: 1em;

        & > ${TextComponent} {
            margin-top: 1.2em;
            display: block;
            width: 100%;
            word-wrap: break-word;
        }

        @media ${theme.media.lteMedium} {
            width: 90%;
        }
    `}
`;

export const ActionsWrapper = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const RemoveIcon = styled(FaTrash)`
    ${({ theme }) => css`
        cursor: pointer;
        transition: ${theme.transition.tran_03};
        font-size: ${theme.font.sizes.default};

        &:hover {
            color: ${theme.colors.danger};
            transition: ${theme.transition.tran_03};
        }
    `}
`;

export const EditIcon = styled(MdEdit)`
    ${({ theme }) => css`
        cursor: pointer;
        margin-right: 0.5em;
        transition: ${theme.transition.tran_03};
        font-size: ${theme.font.sizes.default};

        &:hover {
            color: ${theme.colors.success};
            transition: ${theme.transition.tran_03};
        }
    `}
`;

export const EditInput = styled(InputComponent)`
    border: none;
    width: 100%;
    margin-top: 1.2em;

    &:focus {
        border: none;
    }
`;

export const ProceedIcon = styled(IoCheckmark)`
    ${({ theme }) => css`
        cursor: pointer;
        margin-right: 0.5em;
        transition: ${theme.transition.tran_03};
        color: ${theme.colors.success};
        font-size: ${theme.font.sizes.medium};

        &:hover {
            transition: ${theme.transition.tran_03};
            color: ${theme.colors.primaryColor};
        }
    `}
`;

export const CloseIcon = styled(MdClose)`
    ${({ theme }) => css`
        cursor: pointer;
        transition: ${theme.transition.tran_03};
        color: ${theme.colors.danger};
        font-size: ${theme.font.sizes.medium};

        &:hover {
            transition: ${theme.transition.tran_03};
            color: ${theme.colors.primaryColor};
        }
    `}
`;
