import React, { useContext } from 'react';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';

const Navigation = ({ LogoutCallback }) => {
    const [user] = useContext(UserContext);
    return (    
            <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="mx-2 my-auto">
                            <Link to="/">Home</Link> 
                        </li>
                        <li className="mx-2 my-auto">
                            <Link to="/dashboard">Dashboard</Link> 
                        </li>
                        { (!user.accesstoken) &&
                            <li className="mx-2 my-auto">
                                <Link to="/login">Login</Link>
                            </li>
                        } { (!user.accesstoken) &&
                        <li className="mx-2 my-auto">
                                <Link to="/register">Register</Link>
                            </li>
                        } { (user.accesstoken) &&  
                            <li className="mx-2">
                                <button className="btn btn-secondary" onClick={LogoutCallback}>Log out</button>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;