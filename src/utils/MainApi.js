import { BASE_URL } from './configs/Url';

class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(response) {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((err) => {
        const error = new Error(err.message);
        error.status = response.status;
        throw error;
      });
    }
  }

  async getUserInfo() {
    const response = await fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    });
    return this._getResponseData(response);
  }

  async _getSavedMovies() {
    const response = await fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: this._headers,
    });
    return this._getResponseData(response);
  }

  getAllNeededData() {
    return Promise.all([this.getUserInfo(), this._getSavedMovies()]);
  }

  async patchUserInfo(data) {
    const response = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._getResponseData(response);
  }

  async postNewMovie(data) {
    const response = await fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    });
    return this._getResponseData(response);
  }

  async deleteMovie(movieId) {
    const response = await fetch(`${this._url}${'/movies/'}${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._getResponseData(response);
  }

  setToken() {
    this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
  }

  getToken() {
    return this._headers.authorization;
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
