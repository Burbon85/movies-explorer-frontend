import { MOVIES_URL } from './configs/Url';

class MoviesApi {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config._headers;
  }

  _getResponseData(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getAllMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._getResponseData);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
