// WRAPS the DataService
// Add Authentication-Information to the Data-Service

import { dataService } from './dataService';
// const storageProvider = sessionStorage;
const baseUrl = process.env.REACT_APP_BACKEND_URL;

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

async function login(url, credentials) {
  return post(url, credentials);
}

async function logout(url, credentials) {
  return post(url, credentials);
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
  let auth = localStorage.getItem('id');
  return auth || '';
}
