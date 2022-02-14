import './style/App.css';
import "./style/WhiteTheme.scss";
import "./style/BlackTheme.scss";

import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { authService } from './services/authService';

import MyNavbar from './components_old/Navbar.jsx';
import MySwitch from "./components_old/Switch.jsx"

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import WorkingPage from './components_old/WorkingPage';
import Admin from './components_old/Admin'
import SimpleForm from './components_old/SimpleForm';
import Form from './components_old/Form';
import ShowHTMLFormular from './components_old/ShowHTMLFormular';
import Signup from './components/User/SignUp';
import Login from './components/User/Login';
import Settings from "./components/User/Settings.jsx";

function App() {
  const [userStatus, setUserStatus] = useState("login");

  useEffect(() => {
    document.title = "Kompostmacher";

    if (
      localStorage.getItem("authData") !== null &&
      localStorage.getItem("authData") !== "null"
    ) {
      try {
        authService
          .getCurrentUser()
          .then((data) => {
            setUserStatus(data);
          })
          .catch((err) => {
            toast.error(err);
          });
      } catch (err) {
        toast.error(err.message);
      }
    }
  }, []);

  let navItems = [
    {
      title: 'Erstellen',
      to: '/workingpage',
      component: WorkingPage,
      icon: "bi bi-pencil",
    },
    {
      title: "Settings",
      to: "/settings",
      component: () => <Settings setUserStatus={setUserStatus}></Settings>,
      icon: "bi bi-gear",
    },
  ];

  let otherRoutes = [
    {
      to: '/workingpage',
      component: WorkingPage
  },
  {
      to: '/SimpleForm/:userId',
      component: SimpleForm
  },
  {
      to: '/form/:id',
      component: Form
  },
  {
      to: '/showHTML/:id',
      component: ShowHTMLFormular
  },
  { 
      to: "/settings/editUser/:id", 
      component: Form 
  },
  ];

  let authenticationRoutes = [
    {
      title: 'Login',
      to:'/login',
      component: () => <Login setUserStatus={setUserStatus}></Login>
    },
    {
      to: "/signup",
      component: () => <Signup setUserStatus={setUserStatus} />,
    },
    // { 
    //   to: "/settings/changepassword/:username", 
    //   component: () => <ChangePassword setUserStatus={setUserStatus} />, 
    // }
  ];

  function getTheme() {
    return localStorage.getItem("theme");
  }

  if (userStatus === "login") {
    return (
      <div className={getTheme()}>
        <div className="form-wrapper">
          <BrowserRouter>
            <ToastContainer />
            <MySwitch
              otherRoutes={authenticationRoutes}
              redirect={"/login"}
            ></MySwitch>
          </BrowserRouter>
        </div>
      </div>
    );
  }

  if(typeof userStatus !== 'string' && userStatus.admin === true) {
    navItems.push({
      title: 'Admin',
      to:'/admin',
      component: Admin,
      icon: "bi bi-tools",
    })
    otherRoutes.push({
      to:'/admin',
      component: Admin
    })
  }

  return (
    <div  className={getTheme()}>
      <BrowserRouter>
        <ToastContainer />
        <div className="page-content-wrapper">
          <div className="sidebar-wrapper">
            <MyNavbar navItems={navItems}></MyNavbar>
          </div>
          <div className="content-wrapper">
            <MySwitch
              navItems={navItems}
              otherRoutes={otherRoutes}
              redirect={"/workingpage"}
            ></MySwitch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;