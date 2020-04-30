//Основной класс 
class Api {
    constructor(config) {
      this.config = config;
    }
  
    //Парсинг массива карточек
    getInitialCards() {
      return this._request('/cards', 'GET');
    }
  
    _request(url) {
      return fetch(this.config.baseUrl + url, this.config)
      .then(this._handleResult)
      .catch(this._handleError);
    }

    _handleResult(res) {
      if (res.ok) {
        return res.json();
      } 
      
    }
  
    _handleError(e) {
      return {error: console.log(e)};
      }


  //Парсинг с сервера данных о пользователе с указанным токеном
  getProfileInfo() {
    return this._profileRequest('/users/me', 'GET');
  }

  _profileRequest(url) {
    return fetch(this.config.baseUrl + url, this.config)
    .then(this._handleResult)
    .catch(this._handleError);
  }

  //Отправка данных на сервер
  updateProfile() {
    return this._updateProfileInfo('/users/me', 'PATCH');
  }

  _updateProfileInfo(url, method) {
    return fetch(this.config.baseUrl + url, {
      method,
      headers: {
        authorization: this.config.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formEdit.elements.firstname.value,
        about: formEdit.elements.about.value
    })
  })
    .then((res) => { return res.json()})
    .catch(this._handleError);
  }
}