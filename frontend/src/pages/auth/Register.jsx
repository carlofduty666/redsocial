import { useState } from "react";

import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";


const Register = () => {

    const [firstName, setName] = useState(''); // Esto sustituye hacer un getElementById
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerFunction = async (e) => {
        e.preventDefault();

        // Versión asincrónica del fetch
        try {
            const response = await fetch('http://localhost:5556/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <> 
            <div className="container container-auth">
                <div className="row w-100">
                    <div className="col-4 ms-auto me-auto card p-4">
                        <h1>Sign Up</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
                        <form onSubmit={registerFunction}>
                            <div className="mb-3">
                                <Input 
                                    type="text"
                                    id="firstName" 
                                    className="form-control"
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Input 
                                    type="text" 
                                    id="lastName" 
                                    className="form-control"
                                    placeholder="Last name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Input 
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="name@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Input 
                                    type="password"
                                    id="password"
                                    className="bg-dark text-white"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button text="Sign Up!" color="success" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
