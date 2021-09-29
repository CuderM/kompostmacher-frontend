import { authService } from './authService';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/products';

export const productService = {
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

function create(periode) {
  return authService.post(baseUrl, periode);
}

function update(id, periode) {
  return authService.patch(`${baseUrl}/${id}`, periode);
}

function _delete(id) {
  return authService.delete(`${baseUrl}/${id}`);
}
