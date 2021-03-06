import './style/App.css';

import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from './services/AuthContext';
import { authService } from './services/authService';

import MyNavbar from './components_old/Navbar.jsx';
import MySwitch from "./components_old/Switch.jsx"

import Signup from './components_old/Register';
import Login from './components_old/Login';

import WorkingPage from './components_old/WorkingPage';
import Admin from './components_old/Admin';

import SimpleForm from './components_old/SimpleForm';
import Form from './components_old/Form';

import ShowHTMLFormular from './components_old/ShowHTMLFormular';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [userStatus, setUserStatus] = useState("login");
  const { currentUser } = useContext(AuthContext);
  let userAuthenticated = currentUser && currentUser._id;

  if(!userAuthenticated) userAuthenticated = authService.getAuthInfo();

  let navItems = [
    { title: 'WorkingPage', to: '/workingpage', component: WorkingPage, icon: "bi bi-list" }
  ];

  let otherRoutes = [
    { title: 'SimpleForm', to:'/SimpleForm/:userId', component: SimpleForm, icon: "bi bi-list" },
    { title: 'Form', to:'/form/:id', component: Form, icon: "bi bi-list" },
    { title: 'ShowHTMLFormular', to:'/showHTML/:id', component: ShowHTMLFormular, icon: "bi bi-list" }
  ];

  let authenticationRoutes = [
    { to: '/login', component: () => <Login setUserStatus={setUserStatus}/> },
    { to: '/signup', component: () => <Signup setUserStatus={setUserStatus}/> },
  ]

    
    if(!userAuthenticated) {
      return <div className="form-wrapper">
        <BrowserRouter>
          <ToastContainer />
          <MySwitch otherRoutes={authenticationRoutes} redirect={"/login"}></MySwitch>
        </BrowserRouter>
      </div>
    }
  

  if(localStorage.getItem('isAdmin') === 'true') navItems.push({ title: 'Admin', to: '/admin', component: Admin, icon: "bi bi-list" })

  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="page-content-wrapper">
        <div className="sidebar-wrapper">
          <MyNavbar navItems={navItems}></MyNavbar>
        </div>
        <div className="content-wrapper">
          <MySwitch navItems={navItems} otherRoutes={otherRoutes} redirect={"/workingpage"}></MySwitch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;