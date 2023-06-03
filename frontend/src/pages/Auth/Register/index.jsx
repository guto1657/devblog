//Imports
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//Contexts
import { Context } from "../../../context/UserContext";
//Components
import { FormContainer } from "../../../components/Form/FormContainer";
import { Input } from "../../../components/Form/Input";
import { Button } from "../../../components/Layout/Button";
import { Loader } from "../../../components/Layout/Loader";
import { FormHeader } from "../../../components/Form/FormHeader";

export const Register = () => {
    //initial states
    const [user, setUser] = useState({});
    //context
    const { register, loading, authenticated } = useContext(Context);
    //hooks
    const navigate = useNavigate();

    //function to handle submit
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        await register(user);
    };

    //function to handle on change submit
    const handleOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    //useEffect to redirect user if authenticated
    useEffect(() => {
        if (authenticated) {
            navigate("/");
        }
    }, []);

    return (
        !authenticated && (
            <>
                <FormContainer onSubmitFn={handleOnSubmit}>
                    <FormHeader
                        headingText="Cadastre-se"
                        subHeadingText="Crie sua conta e compartilhe suas histórias"
                    />
                    <Input
                        inputType="text"
                        placeholderText="Nome do usuário"
                        labelText="Nome:"
                        inputName="name"
                        onChangeFn={handleOnChange}
                    />
                    <Input
                        inputType="email"
                        placeholderText="Email do usuário"
                        labelText="Email:"
                        inputName="email"
                        onChangeFn={handleOnChange}
                    />
                    <Input
                        inputType="password"
                        placeholderText="Insira sua senha"
                        labelText="Senha:"
                        inputName="password"
                        onChangeFn={handleOnChange}
                    />

                    <Input
                        inputType="password"
                        placeholderText="Confirmar senha"
                        labelText="Confirme sua senha:"
                        inputName="confirmpassword"
                        onChangeFn={handleOnChange}
                    />
                    <Button
                        type="submit"
                        text="Cadastrar"
                        maxWidth
                        variant="success"
                        uppercase
                    />
                </FormContainer>
                {loading && <Loader />}
            </>
        )
    );
};
