//imports
import styled, { css } from "styled-components";
//react icons
import { FaChevronUp } from "react-icons/fa";

const handleActive = () => css`
    visibility: visible;
    opacity: 1;
    pointer-events: all;
`;

export const Container = styled.div`
    ${({ theme, isActive }) => css`
        position: fixed;
        width: 50px;
        height: 50px;
        background: ${theme.colors.primaryColor};
        bottom: 30px;
        right: 30px;
        text-align: center;
        cursor: pointer;
        line-height: 50px;
        color: ${theme.colors.white};
        font-size: ${theme.font.sizes.large};
        border-radius: 7px;
        transition: ${theme.transition.tran_05};
        border: 2px solid transparent;
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
        transition: 0.5s;
        z-index: 999;
        ${isActive && handleActive()};

        &:hover {
            transform: scale(1.05);
            transition: all 0.5s;
            background: transparent;
            color: ${theme.colors.primaryColor};
            border: 2px solid ${theme.colors.primaryColor};
            transition: ${theme.transition.tran_05};
        }

        @media ${theme.media.lteMedium} {
            visibility: hidden;
            opacity: 0;
            display: none;
            pointer-events: none;
        }
    `}
`;

export const ArrowTop = styled(FaChevronUp)`
    ${({ theme }) => css``}
`;
