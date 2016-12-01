import 'whatwg-fetch';
import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import queryString from 'query-string';

function prepareHeaders(token) {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

function wrapErrors(errors) {
  const formErrors = { _error: 'Form save failed' };
  forEach(errors, error => {
    const fieldName = error.source.pointer.split('/').pop().split(/\[|\]/);
    if (!fieldName[1] && !includes(['zip', 'yearly_kilowatt_hour', 'metering_type'], fieldName[0])) return;
    const fullFieldName = fieldName[1] ? `${camelCase(fieldName[0])}/${camelCase(fieldName[1])}` : camelCase(fieldName[0]);
    formErrors[fullFieldName] = error.detail;
  });
  console.log(formErrors);
  return formErrors;
}

function parseResponse(response) {
  const json = response.json();
  if (response.status >= 200 && response.status < 300) {
    return json;
  } else if (response.status === 422) {
    return json.then(error => { console.log(error); return Promise.resolve(wrapErrors(error.errors))});
  } else {
    return json.then(error => Promise.reject(error));
  }
}

function normalizeProfile(json) {
  // console.log(json);
  const { firstName, lastName, phone, title, gender } = mapKeys(json.data.attributes, (value, key) => camelCase(key));
  return { firstName, lastName, phone, title, gender };
}

export default {
  calculateOnServer({ token, apiUrl, apiPath, values }) {
    return fetch(`${apiUrl}${apiPath}/prices?${queryString.stringify(values)}`, {
      headers: prepareHeaders(token),
    })
    .then(parseResponse);
  },
  getProfile({ token, apiUrl, apiPath }) {
    const data = {};

    return fetch(`${apiUrl}${apiPath}/users/me`, {
      headers: prepareHeaders(token),
    })
    .then(parseResponse)
    .then(json => {
      data.userId = json.data.id;
      return fetch(json.data.relationships.profile.links.related, { headers: prepareHeaders(token) });
    })
    .then(parseResponse)
    .then(json => {
      data.profileId = json.data.id;
      return { ...data, ...normalizeProfile(json) };
    });
  },
  createEntity({ token, apiUrl, apiPath, attributes }) {
    return fetch(`${apiUrl}${apiPath}/forms/power-taker`, {
      headers: prepareHeaders(token),
      method: 'POST',
      body: JSON.stringify(attributes),
    })
    .then(response => parseResponse(response));
  },
};
