import axios from "axios"
import TokenStorage from './TokenStorage'

const apiURL = 'https://cabinet.giq-group.com/back/public'

class ApiModule {
  constructor() {
    this.tokenStorage = new TokenStorage()
    this.accessToken  = this.tokenStorage.get()

    const cfg = {
      baseURL: apiURL,
      headers: {
        'Admin-Token': this.accessToken,
        Authorization: this.accessToken,
      }
    }

    this.client       = axios.create(cfg)
  }

  getFormData(values) {
    let formData = new FormData()
    for (let key in values) {
      if (values.hasOwnProperty(key)) {
        formData.append(key, values[key])
      }
    }
    return formData
  }

  /**
   * Requests
   * @param {*} response
   */
  async getUserData() {
    console.log("ApiModule.getUserdata()");
    return this.client.get('/admin/account/get')
      .then(response => {
        window.USER = response.data.admin
        return response.data.admin
      })
      .catch(error => {
        window.USER = null
        //this.handleError(error)
      })
  }

  async getUser (id) {
    return this.client.get('/admin/users/get/' + id)
      .then(response => {
        return response.data
      })
  }

  async addUser (form) {
    return this.client.post('/user/signup', form)
      .then(response => {
        return response.data
      })
  }

  async confirmUser (user_id = 0) {
    return this.client.post('/admin/users/confirm/' + user_id)
      .then(response => {
        return response.data
      })
  }

  async editUser (form) {
    return this.client.post('/admin/users/edit', form)
      .then(response => {
        return response.data
      })
  }

  async addTransaction (form) {
    return this.client.post('/admin/transaction/create', form)
      .then(response => {
        return response.data
      })
  }

  async editTransaction (form) {
    return this.client.post('/admin/transaction/edit', form)
      .then(response => {
        return response.data
      })
  }

  async getTransaction (id) {
    return this.client.get(`/admin/transaction/get/${id}`)
      .then(response => {
        return response.data
      })
  }

  async getTransactions (page = 1) {
    return this.client.get('/admin/transaction/' + page)
      .then(response => {
        return response.data
      })
  }

  async getUsers (page = 1) {
    return this.client.get('/admin/users/' + page)
      .then(response => {
        return response.data
      })
  }

  handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status)
  }

  handleError(error) {
    throw new Error("Server error = " + error.message)
  }
}

export default ApiModule
