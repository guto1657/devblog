//imports
import styled, { css } from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99999;
    pointer-events: all;
`;

export const Circle = styled.div`
    ${({ theme }) => css`
        &,
        &::before,
        &::after {
            border-radius: 50%;
            width: 2.5em;
            height: 2.5em;
            animation-fill-mode: both;
            animation: bblFadInOut 1.8s infinite ease-in-out;
        }

        & {
            color: ${theme.colors.white};
            font-size: 7px;
            position: relative;
            text-indent: -9999em;
            transform: translateZ(0);
            animation-delay: -0.16s;
        }

        &::before,
        &:after {
            content: "";
            position: absolute;
            top: 0;
        }

        &::before {
            left: -3.5em;
            animation-delay: -0.32s;
        }

        &::after {
            left: 3.5em;
        }

        @keyframes bblFadInOut {
            0%,
            80%,
            100% {
                box-shadow: 0 2.5em 0 -1.3em;
            }
            40% {
                box-shadow: 0 2.5em 0 0;
            }
        }
    `}
`;
