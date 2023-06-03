//Imports
import React from "react";
//Styles
import * as Styled from "./styles";
//Components
import { Heading } from "../../components/Layout/Heading";
import { TextComponent } from "../../components/Layout/TextComponent";

export const About = () => {
    return (
        <Styled.AboutContainer>
            <Heading text="Sobre o DevBlog" />
            <TextComponent>
                Este é um projeto de blog full-stack, que utiliza tecnologias
                tanto no front-end quanto no back-end. No front-end, o projeto
                utiliza o React para criar interfaces de usuário escaláveis e
                reutilizáveis. Além disso, o projeto utiliza testes unitários
                com Jest, visando garantir a qualidade do código produzido. A
                estilização é feita com Styled-Components, que permite folhas de
                estilo escritas em JavaScript. No back-end, utiliza-se Node.js e
                Express.js para criar uma API RESTful para comunicação entre
                front-end e back-end. A autenticação de usuários é feita com
                JSON Web Tokens (JWT) para segurança das informações. O
                armazenamento de dados é realizado no banco de dados NoSQL
                MongoDB, permitindo escalabilidade e flexibilidade na consulta e
                armazenamento de dados.
            </TextComponent>
        </Styled.AboutContainer>
    );
};
