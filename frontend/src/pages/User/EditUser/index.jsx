//Imports
import React, { useContext, useEffect, useState } from "react";
//Contexts
import { Context } from "../../../context/UserContext";
//Components
import { FormContainer } from "../../../components/Form/FormContainer";
import { Input } from "../../../components/Form/Input";
import { Button } from "../../../components/Layout/Button";
import { Loader } from "../../../components/Layout/Loader";
import { FormHeader } from "../../../components/Form/FormHeader";
import { TextComponent } from "../../../components/Layout/TextComponent";
import { ImageBox } from "../../../components/Layout/ImageBox";
//Hooks
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../../hooks/UseFlashMessage";

export const EditUser = () => {
    //initial states
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState();
    const [token] = useState(localStorage.getItem("token") || "");
    //context
    const { authenticated, checkUser } = useContext(Context);
    //hooks
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();

    //function to edit user data
    async function editUser(user) {
        let msgType = "success";
        let msgText = "";
        setLoading(true);

        try {
            const formData = new FormData();

            Object.keys(user).forEach((key) => {
                formData.append(key, user[key]);
            });

            const response = await fetch(
                `${process.env.VITE_APP_API}/users/update`,
                {
                    method: "PATCH",
                    body: formData,
                    headers: {
                        Authorization: `bearer ${JSON.parse(token)}`,
                    },
                }
            );

            if (!response.ok) {
                const responseError = await response.json();
                throw new Error(responseError.message);
            }

            const responseJson = await response.json();

            msgText = responseJson.message;
        } catch (err) {
            msgType = "error";
            msgText = err.message;
            console.log(err);
        }

        setLoading(false);

        if (msgType !== "error") {
            navigate("/users/dashboard");
            window.scrollTo(0, 0);
        }

        setFlashMessage(msgText, msgType);
    }

    //function to handle submit
    const handleOnSubmit = (e) => {
        e.preventDefault();
        editUser(currentUser);
    };

    //function to handle on change submit
    const handleOnChange = (e) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    };

    //function to handle on file change
    const handleOnFileChange = (e) => {
        setPreview(e.target.files[0]);
        setCurrentUser({ ...currentUser, image: e.target.files[0] });
    };

    // useEffect to redirect user if not authenticated
    useEffect(() => {
        if (!authenticated) {
            navigate("/home");
        }
    }, []);

    //useEffect to get user data
    useEffect(() => {
        if (authenticated) {
            setLoading(true);
            checkUser().then((data) => {
                setLoading(false);
                if (data?.currentUser && data.currentUser !== null) {
                    setCurrentUser(data.currentUser);
                } else {
                    navigate("/home");
                }
            });
        }
    }, []);

    return (
        authenticated && (
            <>
                <FormContainer onSubmitFn={handleOnSubmit}>
                    <FormHeader
                        headingText="Editar Dados"
                        subHeadingText="Atualize suas informações pessoais"
                    />
                    {preview ? (
                        <>
                            <TextComponent>
                                <strong>Preview:</strong>
                            </TextComponent>
                            <ImageBox
                                src={URL.createObjectURL(preview)}
                                altText={currentUser.name}
                            />
                        </>
                    ) : (
                        currentUser.image && (
                            <>
                                <TextComponent>
                                    <strong>Preview:</strong>
                                </TextComponent>
                                <ImageBox
                                    src={currentUser.image}
                                    altText={currentUser.name}
                                />
                            </>
                        )
                    )}
                    <Input
                        inputType="file"
                        labelText="Foto de perfil:"
                        inputName="image"
                        onChangeFn={handleOnFileChange}
                    />
                    <Input
                        inputType="text"
                        placeholderText="Nome do usuário"
                        labelText="Nome:"
                        inputName="name"
                        onChangeFn={handleOnChange}
                        inputValue={currentUser.name}
                    />
                    <Input
                        inputType="email"
                        placeholderText="Email do usuário"
                        labelText="Email:"
                        inputName="email"
                        onChangeFn={handleOnChange}
                        inputValue={currentUser.email}
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
                        text="Atualizar"
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
