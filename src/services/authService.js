import { dataService } from './dataService';

const baseUrl = process.env.REACT_APP_BACKEND_URL;
const storageProvider = localStorage;
let _authInfo = storageProvider.getItem('authData');

export const authService = {
  login,
  logout,
  getCurrentUser,
  getAuthInfo,
  handleTimeOut,
  get,
  post,
  patch,
  delete: _delete,
};

async function login(credentials) {
  let authTime;
  credentials.keepLoggedIn ? authTime = -1 : authTime = Date.now();
  
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

function getCurrentUser(useCacheIfAvailable) {
  return get(`${baseUrl}/currentUser`, null, useCacheIfAvailable);
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
  if (_authInfo != null)
    return _authInfo;
  try {
    _authInfo = storageProvider.getItem('authData');
    _authInfo = JSON.parse(_authInfo);
  } catch (ex) {
    console.log(ex);
  }
  return _authInfo;
}

function storeAuthInfo(authInfo) {
  storageProvider.setItem('authData', authInfo);
}

function clearAuthInfo() {
  storageProvider.setItem('authData', null);
}

function handleTimeOut(err, fu) {
  if(err.code === 401) {
    clearAuthInfo();
  }
  fu(err);
}