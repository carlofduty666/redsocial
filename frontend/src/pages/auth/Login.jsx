import { useState } from "react";

import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";

const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const loginFunction = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5556/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message); // Muestra el mensaje de error del servidor
                return;
            }
    
            const data = await response.json();
            alert('Login exitoso!');
            console.log(data.token);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (

        <> 
            <div className="container container-auth">

                <div className="row w-100">

                <div className="col-4 ms-auto me-auto card p-4">

                    <h1>Login</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>

                    <form action="" onSubmit={loginFunction}>
                        <div className="mb-3">
        
                            <Input
                                type="email"
                                id="email"
                                placeholder="Email"
                                change={(e) => {setEmail(e.target.value)}}
                            
                            />
                        </div>
                        <div className="mb-3">
                            <Input 
                                type='password'
                                id='password'
                                className='bg-dark text-white'
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>

                        <Button text="Login" color="warning"></Button>

                    </form>

                </div>

                </div>



            </div>

        </>
    )
}

export default Login