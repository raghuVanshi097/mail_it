import React from 'react';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Header from "./components/header/Header";
import './App.css';
import Home from "./components/home/Home";
import Signup from './components/form/Signup'
import Login from './components/form/Login'
import Profile from './components/profile/Profile';
import Pop1 from './components/profile/Pop1';
import Pop2 from './components/profile/Pop2';
import Verify from './components/form/Verify';
import Resetpass from './components/form/Resetpass';
import PorjectDetails from './components/profile/PorjectDetails';


/* const fields=[
  { id:1 ,name:"Full Name" , type:"text"},
  { id:2 ,name:"Username", type:"text"},
  { id:3 ,name:"Email", type:"email"},
  { id:4 ,name:"Password", type:"password"},
  <Form name="Signup" fgt={true} fields={fields} url={require('./components/img/landing-bg.jpg')}/>
] */

/*const fields1=[
  { id:1 ,name:"Username", type:"text"},
  { id:2 ,name:"Password", type:"password"}
  <Form name="Login" fgt={false} fields={fields1} url={require('./components/img/bg7.jpg')}/>
] */


function App() 
{
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signin">
            <Header/>
            <Signup/>
          </Route>

          <Route path="/login">
            <Header/>
            <Login/>
          </Route>

          <Route path="/profile">
            <Profile/>
            <Header/>
          </Route>
            
          <Route path="/pop1">
            <Pop1/>
          </Route>

          <Route path="/pop2">
            <Pop2/>
          </Route>

          <Route path="/verify/:token">
            <Verify/>
          </Route>

          <Route path="/reset/:token">
            <Resetpass/>
          </Route>

          <Route path="/details/:id">
            <PorjectDetails />
          </Route>

          <Route exact path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
