//const axios = require('axios');

class APIHandler {

  constructor (baseUrl) {
   
    this.BASE_URL = baseUrl
    this.api = axios.create({
     baseURL: this.BASE_URL
    });
  }
  


  getFullList () {
    return this.api.get("/characters")
  }

  getOneRegister (characterId) {
    return this.api.get(`/characters/${characterId}`);
  }

  createOneRegister (characterInfo) {
    return this.api.post(`/characters`,characterInfo);
  }

  updateOneRegister (id,characterInfo) {
    return this.api.put(`/characters/${id}`, characterInfo);
  }

  deleteOneRegister (characterId) {
    return this.api.delete(`/characters/${characterId}`);
  }
}

//module.exports = APIHandler