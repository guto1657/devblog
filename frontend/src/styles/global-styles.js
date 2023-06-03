import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: ${({ theme }) => theme.font.family.default};
    }

    html,body {
        scroll-behavior: smooth;
    }

    body {
        background: ${({ theme }) => theme.colors.bodyColor};
    }

    a {
        text-decoration: none;
    }

    ul,ol {
        list-style: none;
    }

`;
