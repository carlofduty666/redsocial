import { useState } from "react";

import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";

const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const loginFunction = async (e) => {
        e.preventDefault();

        console.log(email, password)
        fetch('http://localhost:5173/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }) 
        .then(response => response.json())
        .then(data => {
            alert(data.message)
        })
        .catch(error => console.error('Error:', error));
    }
    

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
                                // type="email"
                                // id="email"
                                // placeholder="Email"
                                // change={(e) => {setEmail(e.target.value)}}
                                config={{
                                    type: 'email',
                                    id: 'email',
                                    placeholder: 'Email',
                                    className: 'form-control',
                                    change: (e) => {setEmail(e.target.value)}
                                }}
                            
                            />
                            {/* <label htmlFor="password" className="form-label">Email address</label>
                            <input 
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="name@example.com"
                                onChange={(e) => {setEmail(e.target.value)}}
                            /> */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Example textarea</label>
                            <input 
                                type="password" 
                                className="form-control"
                                id="password" 
                                placeholder="Password"
                                onChange={(e) => {setPassword(e.target.value)}}
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