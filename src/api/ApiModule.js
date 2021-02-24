import axios from "axios"
import TokenStorage from './TokenStorage'

const apiURL = 'https://cabinet.giq-group.com/back/public'

class ApiModule {
  constructor() {
    this.tokenStorage = new TokenStorage()
    this.accessToken  = this.tokenStorage.get()

    //eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbl9pZCI6NywiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiZXhwIjoxNjE0MjQ1NTYzfQ.p19sXcAshhJWTqATgW54U3ibVZwIc6IrIRXzPCqW-pc

    this.client       = axios.create({
      baseURL: apiURL,
      headers: {
        'Admin-Token': this.accessToken,
        Authorization: this.accessToken,
      }
    })
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
    return this.client.get('/user')
      .then(response => {
        window.USER = response.data
        return response.data
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
      .catch(error => {
        this.handleError(error)
      })
  }

  async addUser (form) {
    return this.client.post('/user/signup', form)
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async editUser (form) {
    return this.client.post('/admin/users/edit', form)
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async addTransaction (form) {
    return this.client.post('/admin/transaction/create', form)
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async editTransaction (form) {
    return this.client.post('/admin/transaction/edit', form)
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async getTransaction (id) {
    return this.client.get(`/admin/transaction/1/${id}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async getTransactions () {
    return this.client.get('/admin/transaction/1')
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async getUsers (page = 1) {
    return this.client.get('/admin/users/' + page)
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
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
