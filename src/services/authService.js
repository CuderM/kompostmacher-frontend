import { dataService } from './dataService';

const baseUrl = process.env.REACT_APP_BACKEND_URL;
const storageProvider = localStorage;

export const authService = {
  login,
  logout,
  getCurrentUser,
  getAuthInfo,
  clearAuthInfo,
  handleTimeOut,
  get,
  post,
  patch,
  delete: _delete,
};

async function login(credentials) {
  let dt = new Date()
  const credString = `${credentials.username}:${credentials.password}:${credentials.type}:${dt.getTime()}`;
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
  return get(`${baseUrl}/currentUser`)
}

function get(url, headers) {
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

function handleTimeOut(err, fu) {
  if(err.code === 401) {
    clearAuthInfo();
  }
  fu(err);
}