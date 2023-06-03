//imports
import styled, { css } from "styled-components";
//components styles
import { Text as TextComponent } from "../TextComponent/styles";
import { Container as Heading } from "../Heading/styles";

export const Container = styled.div`
    ${({ theme }) => css`
        width: 100%;
        margin: 0 auto 3em;
        max-width: 600px;

        ${TextComponent} {
            color: #444;
            font-size: ${theme.font.sizes.small};
            line-height: ${theme.font.line_height.small};
            font-style: italic;
        }

        @media ${theme.media.lteMedium} {
            ${Heading} {
                font-size: ${theme.font.sizes.xlarge};
                line-height: ${theme.font.line_height.h4};
            }
        }
    `}
`;

export const Image = styled.img`
    display: flex;
    width: 100%;
    margin-bottom: 1em;
    border-radius: 4px;
`;

export const TagsWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0.8em 0;
    flex-wrap: wrap;
`;

export const TagText = styled.span`
    display: block;
    margin-right: 0.5em;
    font-weight: 500;

    &::before {
        content: "#";
        font-weight: bold;
    }
`;
