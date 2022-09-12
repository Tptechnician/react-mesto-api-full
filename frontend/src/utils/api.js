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
    return fetch(`${this._url}/cards/likes/${id}`, {
      headers: this._headers,
      method: 'DELETE'
    }).then(this._getResponseData);
  }

  //Запрос на добавление лайка
  addLike(id){
    return fetch(`${this._url}/cards/likes/${id}`, {
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
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'GET'
    }).then(this._getResponseData);
  }

  //Запрос на получение карточек
  getCard(){
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'GET'
    }).then(this._getResponseData);
  }

  //Запрос на изменение информации о пользователе
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name, 
        about: data.about
      })
    }).then(this._getResponseData);
  }

  //Запрос на изменение картинки пользователя
  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._getResponseData);
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '8bdc11e5-0409-4a66-a2e9-cb41b1679eea',
    'Content-Type': 'application/json'
  }
});

export default api;
