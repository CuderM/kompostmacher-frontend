import { authService } from './authService';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/users';

export const userService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  login, 
  logout,
  createSubUser,
};

function login(credentials) {
  return authService.login(`${baseUrl}/login`, credentials);
}

function logout(credentials) {
  return authService.login(`${baseUrl}/logout`, credentials);
}

function getAll() {
  return authService.get(baseUrl);
}

function getById(id) {
  return authService.get(`${baseUrl}/${id}`);
}

function create(user) {
  delete user.confirmedPassword;
  return authService.post(baseUrl + '/register', user);
}

function createSubUser(user) {
  delete user.confirmedPassword;
  return authService.post(baseUrl + '/registerSubUser', user);
}

function update(id, user) {
  delete user.confirmedPassword;
  return authService.patch(`${baseUrl}/${id}`, user);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return authService.delete(`${baseUrl}/${id}`);
}
