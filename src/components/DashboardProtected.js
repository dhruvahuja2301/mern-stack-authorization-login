import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../App';
// import Dashboard from './Dashboard';

const DashboardProtected = () => {
    
    const [user] = useContext(UserContext);
    const [content, setContent] = useState("You need to Login");
    useEffect(() => {
        const fetchProtected = async() => {
            // console.log(user)
            const result = await (await fetch('http://localhost:4000/protected',{
                method:'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.accesstoken}`,
                }
            })).json();
            console.log(result);
            if(result){
                setContent(result.message);
            } 
            // alert(content);
        }
        fetchProtected();
    }, [user])
    if(!user.accesstoken) {
        return <Redirect to="/login" noThrow />
    } 
    return (
        <div className="container">
            <h1>This is Protected Route</h1>
            <p>{ content }</p>
        </div>
    );
};

export default DashboardProtected;