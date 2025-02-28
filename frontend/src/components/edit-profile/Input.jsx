import { useState } from "react";

const Input = ({
    type,
    id,
    placeholder,
    className = 'input-edit',
    onChange,
}) => {

    return (

        <>
            <Input
                type={type}
                id={id}
                placehold={placeholder}
                className ={className}
                onChange={onChange}
            />
        </>

    )

}

export default Input