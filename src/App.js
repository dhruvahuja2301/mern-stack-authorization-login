import './App.css'
import React, { useState, useEffect } from 'react';
import DashboardProtected from './components/DashboardProtected';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BASE_URL from './url';

export const UserContext = React.createContext([]);

function App() {
  const [user, setUser] = useState({});

  useEffect(()=>{
    const checkRefreshToken = async () => {
      // const result = await (await fetch('https://dhruv-mern-authorization.herokuapp.com/register',{
      // console.log(1);
      const result = await (await fetch(`${BASE_URL}/refresh_token`,{
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        console.log(result)
        setUser({
          accesstoken: result.accesstoken,
          name: result.user.name,
          email: result.user.email
      });    
    }
    checkRefreshToken();
  },[]);

  const LogoutCallback = async () => {
    const result = await (await fetch(`${BASE_URL}/logout`,{
      method:'POST',
      credentials: 'include'
    })).json();
    setUser({});
    console.log(result);
  }

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <Navigation LogoutCallback={LogoutCallback} />
          <div className="container mt-5">
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route path="/dashboard"><DashboardProtected /></Route>
              <Route path="/register"><Register /></Route> 
              <Route path="/login"><Login/></Route>
            </Switch>
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;