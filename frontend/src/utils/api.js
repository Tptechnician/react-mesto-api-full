export class Api {
  constructor(data){
    this._url = data.url;
    this._headers = data.headers;
  }

  //Проверка ответа сервера
  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  }

  //Запрос на удаление карточки
  deleteCard(id, jwt) {
    return fetch(`${this._url}/cards/${id}`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`
      },
      method: 'DELETE'
    }).then(this._getResponseData);
  }
  
  changeLikeCardStatus(id, isLiked, jwt) {
    if (isLiked) {
      return this.deleteLike(id, jwt);
    } else {
      return this.addLike(id, jwt);
    }
  }

  //Запрос на удаление лайка
  deleteLike(id, jwt){
    return fetch(`${this._url}/cards/likes/${id}`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`
      },
      method: 'DELETE'
    }).then(this._getResponseData);
  }

  //Запрос на добавление лайка
  addLike(id, jwt){
    return fetch(`${this._url}/cards/likes/${id}`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`
      },
      method: 'PUT'
    }).then(this._getResponseData);
  }

  //Запрос на добовление карточек
  addCard(data, jwt){
    const dataCard = {
      name: data.name,
      link: data.link
    };
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`
      },
      method: 'POST',
      body: JSON.stringify(dataCard),
    }).then(this._getResponseData);
  }

  //Запрос на получение информации о пользователе и карточек
  getUserData(jwt) {
    return Promise.all([this.getUserInfo(jwt), this.getCard(jwt)]);
  }
  
  //Запрос на получение информации о пользователе
  getUserInfo(jwt) {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`
      },
      method: 'GET'
    }).then(this._getResponseData);
  }

  //Запрос на получение карточек
  getCard(jwt){
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`
      },
      method: 'GET'
    }).then(this._getResponseData);
  }

  //Запрос на изменение информации о пользователе
  setUserInfo(data, jwt) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name, 
        about: data.about
      })
    }).then(this._getResponseData);
  }

  //Запрос на изменение картинки пользователя
  setUserAvatar(data, jwt) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`
      },
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._getResponseData);
  }
}

const api = new Api({
  url: 'http://localhost:3000',
  headers: {
    'credentials': 'include',
    'Content-Type': 'application/json',
  }
});

export default api;
