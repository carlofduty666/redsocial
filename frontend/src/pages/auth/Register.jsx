import { useState } from "react";

import Button from "../../components/auth/Button";


const Register = () => {

    const [ name, setName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const registerFunction = async (e) => {
        e.preventDefault();

        console.log(email, password)
        fetch('http://localhost:5173/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, 
                lastName, 
                email, 
                password
            })
        }) 
        .then(response => response.json())
        .then(data => {
            alert(data.message)
        })
    }
    

    return (

        <> 
            <div className="container container-auth">

                <div className="row w-100">

                <div className="col-4 ms-auto me-auto card p-4">

                    <h1>Sign Up</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>

                    <form action="" onSubmit={registerFunction}>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input 
                            type="text" 
                            className="form-control"
                            id="name" 
                            placeholder="Name"
                            onChange={(e) => {setName(e.target.value)}}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last name</label>
                        <input 
                            type="text" 
                            className="form-control"
                            id="lastName" 
                            placeholder="Last name"
                            onChange={(e) => {setLastName(e.target.value)}}
                        />
                    </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Email address</label>
                            <input 
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="name@example.com"
                                onChange={(e) => {setEmail(e.target.value)}}
                            />
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

                        <Button text="Sign Up!" color="warning"></Button>

                    </form>

                </div>

                </div>



            </div>

        </>
    )
}

export default Register