
import React from 'react';

const InputWithLabel = ({ label, name, type, placeholder, register }) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                {...register(name, { required: true })}
            />
        </div>
    );
};

export default InputWithLabel;
