// const Input = ({type, className = 'form-control', id, placeholder, change}) => {

//     return (
//         <>
//             <label htmlFor={id} className="form-label">
//                 {placeholder}
//             </label>
//             <input
//                 type={type}
//                 className={className}
//                 id={id}
//                 placeholder={placeholder}
//                 onChange={change}

            
            
//             />
        
//         </>
//     )


// }

//  otra manera de hacerlo
// const Input = ({config}) => {

//     if (config.type === "email") {
    
//         return (

//         <>
        
//             <label htmlFor={config.id} className="form-label">
//                     {config.placeholder}
//             </label>
//             <input
//                 type={config.type}
//                 className={"form-control "+config.className}
//                 id={config.id}
//                 placeholder={config.placeholder}
//                 onChange={config.change}
//             />
        
        
//         </>

//         )
//     }
//     else if (config.type === "password") {

//         return (   

//             <>
        
//                 <label htmlFor={config.id} className="form-label">
//                     {config.placeholder}
//                 </label>
//                 <input
//                     type={config.type}
//                     className={"form-control bg-dark "+config.className}
//                     id={config.id}
//                     placeholder={config.placeholder}
//                     onChange={config.change}
//                 />
        
        
//             </>

//         )

//     }

// }

const Input = ({
    type,
    id,
    placeholder,
    className = '',
    onChange,
}) => {


    const emailLabel = (placeholder, id) => {
        if (placeholder === 'name@example.com') {
            return 'Email';
        } else {
            return (
                <label htmlFor={id} className="form-label">
                    {placeholder}
                </label>
            );
        }
    };

    return (
        <>
            {placeholder && emailLabel(placeholder, id)}
            <input
                type={type}
                id={id}
                className={`form-control ${type === 'password' ? 'bg-dark text-white' : ''} ${className}`}
                placeholder={placeholder}
                onChange={onChange}
            />
        </>
    );

};


export default Input