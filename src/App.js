import './style/App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from './services/AuthContext';
import { authService } from './services/authService';

import MyNavbar from './components_old/Navbar.jsx';
import MySwitch from "./components_old/Switch.jsx"

import { Routes } from './components/routes';
import { navItems, navItemsAdmin, navItemsAuth } from './components/navItems';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
  let { isError } = props
  const [ user, setUser ]  = useState({})
  let redirect

  let routes = new Routes(setUser)
  let items = []

  useEffect(() => {     
    async function as() {
      try {
        authService.getCurrentUser(true)
          .then(data => setUser(data))
          .catch(err => { isError = true })
      }
      catch(err) {
        isError = true;
      }
    }         
    if(!isError)  as()
}, []);

  redirect = (user && user.firstname ? '/workingpage' : '/login') // : '/test')

  if(redirect === '/login') {
    routes = routes.getRouteItemsAuth()
    items = navItemsAuth
  } else {
    if(user.admin === true) {
      routes = routes.getRouteItems().concat(routes.getRouteItemsAdmin());
      items = navItems.concat(navItemsAdmin);
    } else {
      routes = routes.getRouteItems()
      items = navItems
    }
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="page-content-wrapper">
        <div className="sidebar-wrapper">
          <MyNavbar navItems={items}></MyNavbar>
        </div>
        <div className="content-wrapper">
          <MySwitch routes={routes} redirect={redirect}></MySwitch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;