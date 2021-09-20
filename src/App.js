import './style/App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from './services/AuthContext';
import { authService } from './services/authService';

import MyNavbar from './components_old/Navbar.jsx';
import MySwitch from "./components_old/Switch.jsx"

import { routeItems, routeItemsAdmin, routeItemsAuth } from './components/routes';
import { navItems, navItemsAdmin, navItemsAuth } from './components/navItems';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { currentUser }  = useContext(AuthContext);
  const [ user, setUser ]  = useState(currentUser)
  let redirect
  let routes = []
  let items = []

  useEffect(() => {    
    try {      
      async function as() {
        try {
          setUser(await authService.getCurrentUser(false).then(data => console.log('data ' + data)))
        }
        catch(err) {
          console.log('this little nigga ' + err)
        }
      }                     
      as()
      console.log('user ' + user)
    }
    catch(err) {
      console.log('dumb ass bitch: ' + err)
    }
});

  console.log('this my user: ' + user)

  redirect = (user ? '/workingpage' : '/login')

  if(!user) {
    routes = routeItemsAuth
    items = navItemsAuth
  } else {
    if(user.admin === true) {
      routes = routeItems.concat(routeItemsAdmin);
      items = navItems.concat(navItemsAdmin);
    } else {
      routes = routeItems
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