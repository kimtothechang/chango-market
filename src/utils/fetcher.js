import { BASIC_SERVER_URL } from '../constants';

const fetcher = async (param, method) => {
  const url = BASIC_SERVER_URL;
  const res = await fetch(`${url}/${param}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return data;
};

const fetcherAuth = async (param, method) => {
  const url = BASIC_SERVER_URL;
  const token = localStorage.getItem('token');
  const res = await fetch(`${url}/${param}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  });
  const data = await res.json();

  return data;
};

const fetcherBody = async (param, method, content) => {
  const url = BASIC_SERVER_URL;
  const token = localStorage.getItem('token');
  const res = await fetch(`${url}/${param}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({ ...content }),
  });
  const data = await res.json();

  return data;
};

export { fetcher, fetcherAuth, fetcherBody };
