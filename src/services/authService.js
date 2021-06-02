// WRAPS the DataService
// Add Authentication-Information to the Data-Service

import { dataService } from './dataService';
// const storageProvider = sessionStorage;
const baseUrl = process.env.REACT_APP_BACKEND_URL;
let storageProvider = sessionStorage;
// Auth Info stored in Memory and in Storage - Provider (sessionstorage localstorage)
// let _authInfo = null;

export const authService = {
  login,
  logout,
  getCurrentUser,
  get,
  post,
  patch,
  delete: _delete,
};

async function login(credentials) {
  let authTime;
  if(credentials.keepLoggedIn) {
    authTime = -1;
    storageProvider = localStorage;
  } else {
    authTime = Date.now();
    storageProvider = sessionStorage;
  }
  const credString = `${credentials.username}:${credentials.password}:${authTime}`;
  const encodedCredentials = Buffer.from(credString).toString('base64');

try {
  clearAuthInfo();

  let retVal = await dataService.post(`${baseUrl}/login`, '', {
    'Content-Type': 'text/plain',
    Authorization: encodedCredentials,
  });

  storeAuthInfo(encodedCredentials);

  return Promise.resolve(retVal);
}
catch(err) {
  clearAuthInfo();
  return Promise.reject(err);
}
}

async function logout() {
try {
  clearAuthInfo();

  await dataService.post(`${baseUrl}/logout`, '', {
    'Content-Type': 'text/plain',
    Authorization: getAuthInfo(),
  });

  clearAuthInfo();

  return Promise.resolve();
}
catch(err) {
  return Promise.reject(err);
}
}

function getCurrentUser() {
  return get(`${baseUrl}/api/v1/currentUser`);
}

function get(url, headers) {
  console.log(url);
  return dataService.get(url, combineHeadersWithAuthInfo(headers));
}

function post(url, body, headers) {
  return dataService.post(url, body, combineHeadersWithAuthInfo(headers));
}

function patch(url, body, headers) {
  return dataService.patch(url, body, combineHeadersWithAuthInfo(headers));
}

function _delete(url, headers) {
  return dataService.delete(url, combineHeadersWithAuthInfo(headers));
}

function combineHeadersWithAuthInfo(headers) {
  return { Authorization: getAuthInfo(), ...headers };
}

function getAuthInfo() {
  return storageProvider.getItem('authData');
}

function storeAuthInfo(authInfo) {
  storageProvider.setItem('authData', authInfo);
}

function clearAuthInfo() {
  storageProvider.setItem('authData', null);
}
