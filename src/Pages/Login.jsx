import React from "react";
import { useForm } from "react-hook-form";
import InputWithLabel from "../Components/InputLabel";
import {GlobalButton } from "../Styles/TelaInicial";

const Login = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data); 
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputWithLabel
                label="Email:"
                name="Email" 
                type="text"
                placeholder="Digite seu email"
                register={register} 
            />
            <InputWithLabel
                label="Senha:"
                name="Password" 
                type="Password"
                placeholder="Digite sua senha"
                register={register} 
            />

            <GlobalButton type="submit" width="200px" height="200">Enviar</GlobalButton>
        </form>
    );
};

export default Login;
