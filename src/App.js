import './style/App.css';

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
import Signup from './components_old/Register';
import Login from './components_old/Login';

function App(props) {
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
      title: 'WorkingPage',
      to: '/workingpage',
      component: WorkingPage
    },
  ];

  let otherRoutes = [
    {
      title: 'WorkingPage',
      to: '/workingpage',
      component: WorkingPage
  },
  {
      title: 'SimpleForm',
      to: '/SimpleForm/:userId',
      component: SimpleForm
  },
  {
      title: 'Form',
      to: '/form/:id',
      component: Form
  },
  {
      title: 'ShowHTMLFormular',
      to: '/showHTML/:id',
      component: ShowHTMLFormular
  }
  ];

  let authenticationRoutes = [
    {
      title: 'Login',
      to:'/login',
      component: () => <Login setState={setUserStatus}></Login>
    },
    {
        title: 'Signup',
        to:'/signup',
        component: Signup
    },
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
      component: Admin
    })
    otherRoutes.push({
      title: 'Admin',
      to:'/admin',
      component: Admin
    })
  }

  return (
    <div className={getTheme()}>
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