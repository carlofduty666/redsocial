import { useState } from "react";

const TextArea = ({
    className = 'input-textArea',
    placeholder
}) => {

    return (
        <>
            <textarea
                className={className}
                placeholder={placeholder}
            />
        </>
    )

}

export default TextArea