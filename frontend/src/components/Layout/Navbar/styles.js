//imports
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
//react icons
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    padding: 1.2em 2em;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
    position: relative;
`;

export const Nav_brand = styled(Link)`
    ${({ theme }) => css`
        font-size: ${theme.font.sizes.large};
        color: ${theme.colors.primaryColor};
    `}
`;

export const bold_Effect = styled.span`
    font-weight: 900;
    text-transform: uppercase;
`;

export const Menu = styled.ul`
    ${({ theme, open }) => css`
        display: flex;

        @media ${theme.media.lteMedium} {
            position: fixed;
            top: 0;
            right: ${open ? "0" : "-300px"};
            height: 100vh;
            width: 300px;
            display: flex;
            flex-direction: column;
            background: ${theme.colors.primaryColor};
            padding: 30px;
            transition: ${theme.transition.tran_05};
            z-index: 999999;
        }
    `}
`;

export const List_Item = styled.li`
    ${({ theme }) => css`
        margin-left: ${theme.spacings.medium};

        @media ${theme.media.lteMedium} {
            margin-left: 0;
            margin-top: ${theme.spacings.medium};
        }
    `}
`;

export const HamburgerIcon = styled(GiHamburgerMenu)`
    ${({ theme }) => css`
        font-size: 26px;
        display: none;
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
        cursor: pointer;

        @media ${theme.media.lteMedium} {
            display: block;
            visibility: visible;
            opacity: 1;
            pointer-events: all;
        }
    `}
`;

export const CloseIcon = styled(MdClose)`
    ${({ theme }) => css`
        font-size: 26px;
        display: none;
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
        cursor: pointer;
        color: ${theme.colors.white};

        @media ${theme.media.lteMedium} {
            display: block;
            visibility: visible;
            opacity: 1;
            pointer-events: all;
            border-radius: 50%;
        }
    `}
`;

export const LogoutText = styled.span`
    ${({ theme }) => css`
        font-size: ${theme.font.sizes.default};
        padding: 0.4em 0.5em;
        color: ${theme.colors.primaryColor};
        font-weight: 500;
        transition: ${theme.transition.tran_03};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
            opacity: 0.8;
            transition: ${theme.transition.tran_03};
        }

        @media ${theme.media.lteMedium} {
            color: ${theme.colors.white};
            font-size: ${theme.font.sizes.medium};
        }
    `}
`;
