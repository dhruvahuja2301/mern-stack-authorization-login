import Field from './Field';
import React, { useContext, useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { UserContext } from '../App';
import { useHistory } from 'react-router';

const Login = () => {
    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useEffect(() => {
        if(user.name!==undefined)  console.log(user.name,user.email)
    }, [user])
    
    if(user.accesstoken) {
        return <Redirect to="/dashboard" noThrow />
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 2 await because fetch await gives a response which is a promise to be converted to json
        // const result = await (await fetch('https://dhruv-mern-authorization.herokuapp.com/login',{
        const result = await (await fetch('http://localhost:4000/login',{
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })).json();
        // if token present 
        if(result.accesstoken){
            await setUser({
                accesstoken: result.accesstoken,
                name: result.user.name,
                email: result.user.email
            });
            // console.log(user)
            history.push('/dashboard');
        } else {
            alert(result.message);
            console.log(result.message);
        }
    };

    const handleChange = (e) => {
        if(e.currentTarget.name === "email"){
            setEmail(e.currentTarget.value)
        }
        else {
            setPassword(e.currentTarget.value)
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center my-3">
            <div className="row w-100 mt-5 pt-2">
                <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                    <div className="card shadow">
                        <div className="card-body py-5 mx-3">
                            <h5 className="text-center card-title">Login</h5>
                            <form onSubmit={handleSubmit} className="mt-3 needs-validation" noValidate>
                                <Field label="Email" name="email" type="email" value={email} handleChange={handleChange} />
                                <Field label="Password" name="password" type="password" value={password} handleChange={handleChange} />
                                <br />
                                <button className="btn btn-success btn-block">Login</button>
                            </form>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    );
}

export default Login;