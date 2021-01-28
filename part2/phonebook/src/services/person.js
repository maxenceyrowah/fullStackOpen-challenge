/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postPerson = (data) => {
  const request = axios.post(baseUrl, data);
  return request.then((response) => response.data);
};

const putPerson = (personId, data) => {
  const request = axios.put(`${baseUrl}/${personId}`, data);
  return request.then((response) => response.data);
};

const deletePerson = (personId) => {
  const request = axios.delete(`${baseUrl}/${personId}`);
  return request.then((response) => response.data);
};

export default {
  getPersons,
  postPerson,
  putPerson,
  deletePerson
};
