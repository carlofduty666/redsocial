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
const Input = ({config}) => {

    return (

        <>
        
            <label htmlFor={config.id} className="form-label">
                    {config.placeholder}
            </label>
                <input
                    type={config.type}
                    className={config.className}
                    id={config.id}
                    placeholder={config.placeholder}
                    onChange={config.change}
            />
        
        
        </>




    )
}

export default Input