import { BASIC_SERVER_URL } from '../constants';

const fetcher = async (param, method) => {
  try {
    const url = BASIC_SERVER_URL;
    const res = await fetch(`${url}/${param}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      return res.status;
    }
    const data = await res.json();

    return data;
  } catch (err) {
    console.log('통신 에러: ' + err.message);
  }
};

const fetcherAuth = async (param, method) => {
  try {
    const url = BASIC_SERVER_URL;
    const token = localStorage.getItem('token');
    const res = await fetch(`${url}/${param}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    });

    if (!res.ok) {
      return res.status;
    }

    if (method !== 'DELETE') {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.log('통신 에러: ' + err.message);
  }
};

const fetcherBody = async (param, method, content) => {
  try {
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
  } catch (err) {
    alert(err.message);
  }
};

const checkToken = async () => {
  try {
    const url = BASIC_SERVER_URL;
    const token = localStorage.getItem('token');
    const res = await fetch(`${url}/cart/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    });

    if (res.status !== 401) {
      return await res.json();
    } else {
      return res.status;
    }
  } catch (err) {}
};

export { fetcher, fetcherAuth, fetcherBody, checkToken };
