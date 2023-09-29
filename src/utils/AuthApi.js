import { BASE_URL } from './configs/Url';

class Auth {
  constructor(options) {
    this._url = options.BASE_URL;
    this._headers = options.headers;
  }

  _getResponse(response) {
    if (response.ok) {
      return(response.json());
    } else {
      return(response.json())
        .then((err) => {
          const error = new Error(err.message);
          error.status = response.status;
          throw error;
        })
    }
  }

  register({ email, password, name }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password, name })
    })
    .then(this._getResponse)
  }

  authorize({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
    .then(this._getResponse)
  }

  getContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
    .then(this._getResponse)
  }
}

const auth = new Auth({
  BASE_URL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default auth;
