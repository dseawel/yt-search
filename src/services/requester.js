import axios from 'axios';

export const instance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export async function sendGet(url) {
  return instance
    .get(url)
    .then(response => response)
    .catch(error => error);
}

export async function sendPost(url, data) {
  //TO DO
}

export async function sendPut(url, data) {
  //TO DO
}

export async function sendDelete(url, data) {
  //TO DO
}
