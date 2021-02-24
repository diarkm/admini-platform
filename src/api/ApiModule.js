import axios from "axios"
import TokenStorage from './TokenStorage'

const apiURL = 'https://cabinet.giq-group.com/back/public'

class ApiModule {
  constructor() {
    this.tokenStorage = new TokenStorage()
    this.accessToken  = this.tokenStorage.get()

    this.client       = axios.create({
      baseURL: apiURL,
      headers: {
        'Admin-Token': `${this.accessToken}`,
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

  async getTransactions () {
    return this.client.get('/admin/transaction/1')
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async getUsers () {
    return this.client.get('/admin/users/1')
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
