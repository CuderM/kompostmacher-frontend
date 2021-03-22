import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import'bootstrap-icons/font/bootstrap-icons.css'; 

import MyNavbar from './routes/MyNavbar';
import Admin from './routes/Admin';
import WorkingPage from './routes/WorkingPage';
import Login from './routes/Login';

import { configureFakeBackend } from './services/fakeBackend.js';

import createPDF from './components/PDFCreator';

configureFakeBackend();

function App() {
  const [active, setActive] = useState("Login");

  return (
    <div>
      {active === "Login" && <Login></Login>}
      {active === "Admin" && <Admin></Admin>}
      {active === "WorkingPage" && <WorkingPage></WorkingPage>}
    </div>
  );
}

export default App;
