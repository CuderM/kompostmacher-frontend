import AppError from '../AppError';

// CORS - Enabled
// Parsing JSON
export const dataService = {
  get,
  post,
  patch,
  delete: _delete,
};

async function get(url, headers, useCacheIfAvailable) {
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
    headers,
    credentials: 'include',
  };

  if(useCacheIfAvailable) {
    requestOptions.headers['If-None-Match'] = sessionStorage.getItem(getCacheKey(url),);
  }

  return await call(url, requestOptions);
}


function getCacheKey(url) {
  return `${getCacheKeyPrefix()}${url}`;
}

export function getCacheKeyPrefix() {
  return 'AppCache_';
}

async function post(url, body, headers) {
  let postHeaders = {
    'Content-Type': 'application/json',
  };

  postHeaders = { ...postHeaders, ...headers };
  const payload = serializePayload(body, postHeaders);

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: postHeaders,
    credentials: 'include',
    body: payload,
  };

  return await call(url, requestOptions);
}

async function patch(url, body, headers) {
  let patchHeaders = {
    'Content-Type': 'application/json',
  };

  patchHeaders = { ...patchHeaders, ...headers };
  const payload = serializePayload(body, patchHeaders);

  const requestOptions = {
    method: 'PATCH',
    mode: 'cors',
    headers: patchHeaders,
    credentials: 'include',
    body: payload,
  };

  return await call(url, requestOptions);
}

async function _delete(url, headers) {
  const requestOptions = {
    method: 'DELETE',
    mode: 'cors',
    headers,
    credentials: 'include',
  };

  return await call(url, requestOptions);
}

function serializePayload(payload, headers) {
  if (headers['Content-Type'] === 'application/json') {
    if (payload === undefined) payload = {};
    return JSON.stringify(payload);
  }
  return payload;
}

async function call(url, requestOptions) {
  let response = null;
  let body = null;
  console.log(url);
  response = await fetch(url, requestOptions);
  body = await getBody(response);

  return body;
}

async function getBody(response) {
  let responseBody = null;
  try {
    if (isJSON(response)) {
      responseBody = await response.json();
    } else {
      responseBody = await response.text();
    }
  } catch (err) {
    // check error-information here and rethrow it as app-error
    console.error(err);
    throw new AppError(response.status, responseBody || response.statusText);
  }

  if (response.ok === false) {
    throw new AppError(response.status, responseBody || response.statusText);
  }

  return responseBody;
}

function isJSON(response) {
  let contentTypeHeader =
    response.headers &&
    (response.headers['content-type'] || response.headers.get('content-type'));

  return (
    contentTypeHeader &&
    contentTypeHeader.toLowerCase().includes('application/json')
  );
}
