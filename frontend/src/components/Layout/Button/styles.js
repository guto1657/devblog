//imports
import styled, { css } from "styled-components";

const handleButtonVariant = {
    default: (theme) => css`
        background: ${theme.colors.primaryColor};
        color: ${theme.colors.white};
        border: 2px solid ${theme.colors.primaryColor};
        border-radius: 4px;
        transition: ${theme.transition.tran_03};

        &:hover {
            background: transparent;
            color: ${theme.colors.primaryColor};
            border: 2px solid ${theme.colors.primaryColor};
            transition: ${theme.transition.tran_03};
        }
    `,
    outline: (theme) => css`
        background: transparent;
        color: ${theme.colors.primaryColor};
        border: 2px solid ${theme.colors.primaryColor};
        border-radius: 4px;
        transition: ${theme.transition.tran_03};

        &:hover {
            background: ${theme.colors.primaryColor};
            color: ${theme.colors.white};
            border: 2px solid ${theme.colors.primaryColor};
            transition: ${theme.transition.tran_03};
        }
    `,

    success: (theme) => css`
        background: ${theme.colors.success};
        color: ${theme.colors.white};
        border: 2px solid ${theme.colors.success};
        border-radius: 4px;
        transition: ${theme.transition.tran_03};

        &:hover {
            opacity: 0.8;
            transition: ${theme.transition.tran_03};
        }
    `,

    danger: (theme) => css`
        background: ${theme.colors.danger};
        color: ${theme.colors.white};
        border: 2px solid ${theme.colors.danger};
        border-radius: 4px;
        transition: ${theme.transition.tran_03};

        &:hover {
            opacity: 0.8;
            transition: ${theme.transition.tran_03};
        }
    `,
};

const handleUppercase = () => css`
    text-transform: uppercase;
`;

const handleMaxWidth = () => css`
    width: 100%;
    padding: 1em 0;
`;

const handleSmallStyles = (theme) => css`
    padding: 7px 30px;
    border-radius: 4px;
    font-size: ${theme.font.sizes.small};
    border: 1px solid;

    &:hover {
        border: 1px solid;
    }
`;

export const ButtonContainer = styled.button`
    ${({ theme, buttonVariant, uppercase, maxWidth, isSmall }) => css`
        padding: 0.5em 1.8em;
        font-size: 1em;
        border: none;
        font-weight: bold;
        cursor: pointer;
        ${handleButtonVariant[buttonVariant](theme)};
        ${uppercase && handleUppercase()};
        ${maxWidth && handleMaxWidth()};
        ${isSmall && handleSmallStyles(theme)};
    `}
`;
