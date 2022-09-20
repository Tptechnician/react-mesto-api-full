class Auth {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  register(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email
      })
    }).then(this._getResponseData)
  }

  authorize(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email
      })
    }).then(this._getResponseData);
  }

  checkToken() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._getResponseData)
  }

  LoggedOut() {
    return fetch(`${this._url}/signout`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._getResponseData)
  }
}

const auth = new Auth({
  url: 'http://:mesto.backend.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default auth;