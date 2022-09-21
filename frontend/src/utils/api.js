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
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      credentials: 'include',
      headers: this._headers,
      method: 'DELETE'
    }).then(this._getResponseData);
  }
  
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.deleteLike(id);
    } else {
      return this.addLike(id);
    }
  }

  //Запрос на удаление лайка
  deleteLike(id){
    return fetch(`${this._url}/cards/${id}/likes`, {
      credentials: 'include',
      headers: this._headers,
      method: 'DELETE'
    }).then(this._getResponseData);
  }

  //Запрос на добавление лайка
  addLike(id){
    return fetch(`${this._url}/cards/${id}/likes`, {
      credentials: 'include',
      headers: this._headers,
      method: 'PUT'
    }).then(this._getResponseData);
  }

  //Запрос на добовление карточек
  addCard(data){
    const dataCard = {
      name: data.name,
      link: data.link
    };
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(dataCard),
    }).then(this._getResponseData);
  }

  //Запрос на получение информации о пользователе и карточек
  getUserData() {
    return Promise.all([this.getUserInfo(), this.getCard()]);
  }
  
  //Запрос на получение информации о пользователе
  getUserInfo(jwt) {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: this._headers,
      method: 'GET'
    }).then(this._getResponseData);
  }

  //Запрос на получение карточек
  getCard(jwt){
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      headers: this._headers,
      method: 'GET'
    }).then(this._getResponseData);
  }

  //Запрос на изменение информации о пользователе
  setUserInfo(data, jwt) {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: this._headers,
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
      credentials: 'include',
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._getResponseData);
  }
}

const api = new Api({
  url: 'http://mesto.backend.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
