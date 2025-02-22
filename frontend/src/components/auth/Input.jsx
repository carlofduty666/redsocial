const Input = ({type, className = 'form-control', id, placeholder, change}) => {

    return (
        <>
            <label htmlFor={id} className="form-label">
                {placeholder}
            </label>
            <input
                type={type}
                className={className}
                id={id}
                placeholder={placeholder}
                onChange={change}

            
            
            />
        
        </>
    )


}

export default Input