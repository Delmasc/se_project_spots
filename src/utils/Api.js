class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;

    this._headers = headers;
  }

  // TODO Create another method, called getUserinfo (differnet Base url)

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this.checkResponds);
  }

  editAvatarInfo({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this.checkResponds);
  }

  deleteCard(id) {
    console.log(id + this._baseUrl + this._headers);
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.checkResponds);
  }

  checkResponds(res) {
    if (res.ok) {
      return res.json();
    }
    Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this.checkResponds);
  }

  createNewPost({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this.checkResponds);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this.checkResponds);
  }

  toggleLikeCard(selectedCardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${selectedCardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this.checkResponds);
  }
}

export default Api;
