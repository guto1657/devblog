//imports
import styled, { css } from "styled-components";
//components styles
import { Text as TextComponent } from "../../components/Layout/TextComponent/styles";
import { Container as Heading } from "../../components/Layout/Heading/styles";

export const AboutContainer = styled.div`
    ${({ theme }) => css`
        max-width: 60%;
        margin: 3em auto 0;
        text-align: center;

        & > ${TextComponent} {
            margin-top: 0.5em;
        }

        @media ${theme.media.lteMedium} {
            max-width: 100%;

            & > ${Heading} {
                font-size: ${theme.font.sizes.xxlarge};
                line-height: ${theme.font.line_height.h3};
            }
        }
    `}
`;
