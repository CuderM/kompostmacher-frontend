import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";

// import {ErrorBoundary} from './components_old/ErrorBoundry'

import App from './App';
import reportWebVitals from './reportWebVitals';

function getTheme() {
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "whiteTheme");
  }
  return localStorage.getItem("theme");
}

ReactDOM.render(
  <div className={getTheme()}>
      <App />
  </div>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//   <div  className={getTheme()}>
//     <ErrorBoundary>
//       <App />
//     </ErrorBoundary>
//   </div>
    
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// ReactDOM.render(
//   <React.StrictMode>
//       <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
