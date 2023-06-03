//imports
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
//components styles
import { ImageElm } from "../../../components/Layout/ImageBox/styles";
import { Text as TextComponent } from "../../../components/Layout/TextComponent/styles";

//PAGE CONTAINER
export const Container = styled.div`
    margin: 3em auto 0;
`;

//RETURN TO HOME TEXT
export const BackWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1.2em;
    align-items: center;
`;

export const BackLink = styled(Link)`
    ${({ theme }) => css`
        color: ${theme.colors.primaryColor};
        transition: ${theme.transition.tran_03};
        display: flex;
        align-items: center;

        &:hover {
            transition: ${theme.transition.tran_03};
            opacity: 0.7;
        }
    `}
`;

//POST HEADER
export const PostHeader = styled.div`
    ${({ theme }) => css`
        width: 80%;
        margin: 0 auto;
        text-align: center;

        ${ImageElm} {
            height: 50%;
            width: 50%;
            margin: 2em auto;

            @media ${theme.media.lteMedium} {
                width: 100%;
                height: 100%;
            }
        }

        ${TextComponent} {
            margin: 1em 0;
        }

        @media ${theme.media.lteMedium} {
            width: 100%;
        }
    `}
`;

//POST CONTENT
export const ContentWrapper = styled.div`
    ${({ theme }) => css`
        width: 60%;
        margin: 0 auto;

        @media ${theme.media.lteMedium} {
            width: 100%;
        }
    `}
`;

export const DisplayContent = styled.div`
    ${({ theme }) => css`
        text-align: left;

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin-bottom: 0.5em;
            font-weight: bold;
        }

        p {
            font-size: 18px;
            margin-bottom: 1em;
        }

        a {
            font-weight: bold;
            color: ${theme.colors.primaryColor};
            text-decoration: underline;
        }

        ol,
        ul {
            margin-left: 2em;

            li {
                margin-bottom: 1em;
            }
        }

        ul {
            list-style-type: disc;
        }

        ol {
            list-style-type: decimal;
        }

        img {
            width: 100%;
            display: block;
            margin: 2em 0;
        }
    `}
`;

//POST TAGS
export const TagsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 3em 0;
    flex-wrap: wrap;
`;

export const TagText = styled.span`
    display: block;
    padding: 0 0.5em;
    font-weight: 500;

    &::before {
        content: "#";
        font-weight: bold;
    }
`;

export const TagsInfo = styled.span`
    display: block;
    margin-right: 0.5em;
    font-weight: bold;
`;

//POST LINE
export const Line = styled.div`
    ${({ theme }) => css`
        height: 2px;
        width: 100%;
        background-color: ${theme.colors.footerBackground};
        margin: 1em 0;
    `}
`;

//POST COMMENTS
export const CommentsNumberText = styled.h5`
    ${({ theme }) => css`
        font-size: ${theme.font.sizes.large};
        line-height: ${theme.font.line_height.h5};
    `}
`;

export const CommentsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const SignUpWrapper = styled.div`
    margin: 2em 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    text-align: center;

    button {
        margin-top: 1em;
    }
`;

export const SignUpText = styled.h4`
    ${({ theme }) => css`
        font-size: ${theme.font.sizes.xlarge};
        line-height: ${theme.font.line_height.h4};
    `}
`;
