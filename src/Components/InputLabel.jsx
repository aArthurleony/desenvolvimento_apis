
import React from 'react';
import { InputContainer, ErrorMessage } from '../Styles/InputLabel';

const InputWithLabel = ({ label, name, type, placeholder, register, error }) => {
    return (
        <InputContainer>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                {...register(name)}
            />
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </InputContainer>
    );
};

export default InputWithLabel;
