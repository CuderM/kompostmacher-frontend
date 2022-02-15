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

function create(product) {
  return authService.post(baseUrl, product);
}

function update(id, product) {
  return authService.patch(`${baseUrl}/${id}`, product);
}

function _delete(id) {
  return authService.delete(`${baseUrl}/${id}`);
}
