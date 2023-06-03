//imports
import styled, { css } from "styled-components";
//components styles
import { ImageElm } from "../../../components/Layout/ImageBox/styles";
import { Container as Heading } from "../../../components/Layout/Heading/styles";
import { ButtonContainer as Button } from "../../../components/Layout/Button/styles";
import { InputComponent } from "../../../components/Form/Input/styles";
//react icons
import { FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Container = styled.div`
    ${({ theme }) => css`
        width: 80%;
        margin: 3em auto 0;

        @media ${theme.media.lteMedium} {
            width: 100%;
        }
    `}
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 1.2em;
`;

export const ProfileWrapper = styled.div`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        justify-content: space-between;

        @media ${theme.media.lteMedium} {
            flex-direction: column;
        }
    `}
`;

export const ProfileImageWrapper = styled.div`
    ${({ theme }) => css`
        flex-basis: 40%;

        ${ImageElm} {
            width: 300px;
            height: 300px;
            object-fit: fill;
            border-radius: 50%;

            @media ${theme.media.lteMedium} {
                width: 150px;
                height: 150px;
            }
        }

        @media ${theme.media.lteMedium} {
            flex-basis: 100%;
        }
    `}
`;

export const ProfileInformationWrapper = styled.div`
    ${({ theme }) => css`
        flex-basis: 58%;
        min-height: 250px;
        text-align: left;

        ${Heading}:nth-of-type(2) {
            margin: 0.3em 0;
        }

        @media ${theme.media.lteMedium} {
            flex-basis: 100%;
            width: 100%;
            margin-left: 0;
        }
    `}
`;

export const RowStart = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
`;

export const CogLink = styled(Link)`
    ${({ theme }) => css`
        font-size: 1.2em;
        margin-left: auto;
        cursor: pointer;
        color: ${theme.colors.primaryColor};
        opacity: 1;
        transition: ${theme.transition.tran_05};

        &:hover {
            opacity: 0.6;
            transition: ${theme.transition.tran_05};
        }
    `}
`;

export const CogIcon = styled(FaCog)`
    ${({ theme }) => css``}
`;

export const PostsCommentsInfoWrapper = styled.div`
    ${({ theme }) => css`
        display: flex;
        width: 100%;
        border: 1px solid ${theme.colors.gray};
        border-radius: 7px;
        padding: 20px;
        margin-top: 1em;
    `}
`;

export const PostsInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 2em;
`;

export const CommentsInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ViewOptionWrapper = styled.div`
    ${({ theme }) => css`
        margin: 2em 0;
        display: flex;
        border-bottom: 2px solid ${theme.colors.primaryColor};
    `}
`;

export const ViewOption = styled.span`
    ${({ theme }) => css`
        background-color: transparent;
        color: ${theme.colors.primaryColor};
        padding: 7px;
        font-size: ${theme.font.sizes.medium};
        border-radius: 7px 7px 0 0;
        font-weight: 500;
        cursor: pointer;
        transition: ${theme.transition.tran_03};

        &.active {
            background-color: ${theme.colors.primaryColor};
            color: ${theme.colors.white};
            transition: ${theme.transition.tran_03};
            pointer-events: none;
        }
    `}
`;

export const DashboardHeader = styled.div`
    ${({ theme }) => css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        border-bottom: 2px solid ${theme.colors.gray};
        font-weight: 700;
        padding: 10px;
    `}
`;

export const DashboardText = styled.span`
    ${({ theme }) => css`
        font-size: ${theme.font.sizes.default};
        line-height: ${theme.font.line_height.default};
    `}
`;

export const DashboardRow = styled.div`
    ${({ theme }) => css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        width: 100%;
        border-bottom: 2px solid ${theme.colors.lightGray};

        & ${DashboardText} {
            display: block;
            width: 60%;
            word-wrap: break-word;

            @media ${theme.media.lteMedium} {
                width: 100%;
            }
        }

        @media ${theme.media.lteMedium} {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }
    `}
`;

export const DashboardActionsWrapper = styled.div`
    ${({ theme }) => css`
        margin-left: 2em;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & ${Button} {
            margin-left: 0.5em;

            @media ${theme.media.lteMedium} {
                margin-left: 0;
                margin-right: 0.5em;
            }
        }

        @media ${theme.media.lteMedium} {
            margin-left: 0;
            margin: 1em 0;
        }
    `}
`;

export const CenterTextWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
    padding: 2em 0;
`;

export const EditInput = styled(InputComponent)`
    border: none;
    width: 100%;

    &:focus {
        border: none;
    }
`;
