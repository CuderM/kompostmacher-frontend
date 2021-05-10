import { authService } from './authService';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/collection-confirmation';

export const collectionConfirmationService = {
  getAll,
  getById,
  create,
  update,
  getFormular,
  saveFormular,
  delete: _delete,
};

function getAll() {
  return authService.get(baseUrl);
}

function getById(id) {
  return authService.get(`${baseUrl}/${id}`);
}

function getFormular(collectionConfirmationData) {
  return authService.post(`${baseUrl}/formular/get`, collectionConfirmationData);
}

function create(collectionConfirmation) {
  return authService.post(baseUrl, collectionConfirmation);
}

function saveFormular(collectionConfirmation) {
  return authService.post(`${baseUrl}/formular/save`, collectionConfirmation);
}

function update(id, collectionConfirmation) {
  return authService.patch(`${baseUrl}/${id}`, collectionConfirmation);
}

function _delete(id) {
  return authService.delete(`${baseUrl}/${id}`);
}
