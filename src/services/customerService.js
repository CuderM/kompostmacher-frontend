import { authService } from './authService';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/customers';

export const customerService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll() {
  return authService.get(baseUrl);
}

function getById(id) {
  return authService.get(`${baseUrl}/${id}`);
}

function create(customer) {
  return authService.post(baseUrl, customer);
}

function update(id, customer) {
  return authService.patch(`${baseUrl}/${id}`, customer);
}

function _delete(id) {
  return authService.delete(`${baseUrl}/${id}`);
}
