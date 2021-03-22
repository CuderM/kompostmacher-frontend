import { dataService } from './dataService';

const baseUrl = `api/users`;

export const userService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  setDefaultUsers,
};

function getAll() {
  return dataService.get(baseUrl);
}

function getById(id) {
  return dataService.get(`${baseUrl}/${id}`);
}

function create(params) {
  return dataService.post(baseUrl, params);
}

function update(id, params) {
  return dataService.patch(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return dataService.delete(`${baseUrl}/${id}`);
}

function setDefaultUsers() {
  const requestOptions = {
    method: 'PATCH',
  };
  return fetch(baseUrl + 'init', requestOptions);
}
