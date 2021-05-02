import './style/App.css';

import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import MyNavbar from './components/Navbar.jsx';
import MySwitch from "./components/Switch.jsx"

import Signup from './components/Register';
import Login from './components/Login';

import WorkingPage from './components/WorkingPage';
import Admin from './components/Admin';

import SimpleForm from './components/SimpleForm';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [userStatus, setUserStatus] = useState("login");

  let navItems = [
    { title: 'Admin', to: '/admin', component: Admin, icon: "bi bi-list" },
    { title: 'WorkingPage', to: '/workingpage', component: WorkingPage, icon: "bi bi-list" },
    { title: 'SimpleForm', to:'/SimpleForm/:userId', component: SimpleForm, icon: "bi bi-list" }
  ];

  let otherRoutes = [
    { title: 'SimpleForm', to:'/SimpleForm/:userId', component: SimpleForm, icon: "bi bi-list" }
  ];

  let authenticationRoutes = [
    { to: '/login', component: () => <Login setUserStatus={setUserStatus}/> },
    { to: '/signup', component: () => <Signup setUserStatus={setUserStatus}/> },
  ]


  if (userStatus === 'login') {
    return <div className="form-wrapper">
      <BrowserRouter>
        <ToastContainer />
        <MySwitch otherRoutes={authenticationRoutes} redirect={"/login"}></MySwitch>
      </BrowserRouter>
    </div>
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="page-content-wrapper">
        <div className="sidebar-wrapper">
          <MyNavbar navItems={navItems}></MyNavbar>
        </div>
        <div className="content-wrapper">
          <MySwitch navItems={navItems} otherRoutes={otherRoutes} redirect={"/admin"}></MySwitch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
