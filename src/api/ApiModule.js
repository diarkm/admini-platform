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
        'Access-Control-Allow-Origin': window.location.origin
      }
    }

    this.client    = axios.create(cfg)
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

  /**
   * Логи
   */
  async getLogs (page = 1) {
    return this.client.get('/admin/logs/' + page)
      .then(response => {
        return response.data
      })
  }

  exportLogs (page = 1) {
    return window.open(apiURL + '/admin/logs/export?token=' + this.accessToken, '_blank')

    /*return this.client.get('/admin/logs/export')
      .then(response => {
        return response.data
      })*/
  }

  async updateReqs (wallet, wallet_id) {
    return this.client.post('/admin/users/wallet/edit', {
      wallet, wallet_id: wallet_id+''
    }).then(response => {
      return response.data
    })
  }

  async addWallet (wallet, user_id = 0) {
    return this.client.post('/admin/users/wallet/add', {
      wallet, user_id
    }).then(response => {
      return response.data
    })
  }

  async getReqsUser (id) {
    return this.client.get('/admin/users/wallet/get/' + id)
      .then(response => {
        return response.data
      })
  }

  /**
   * Получение депозитов и бонусов юзера
   * @param {*} id
   * @returns Promise Response
   */

  // Депозиты
  async getDepositsUser (id) {
    return this.client.get('/admin/deposits/' + id)
      .then(response => {
        return response.data
      })
  }

  async editDepositUser ({ deposit_id, value }) {
    return this.client.post('/admin/deposits/edit', {
      deposit_id: deposit_id + '', value
    })
      .then(response => {
        return response.data
      })
  }

  async deleteDepositUser (id) {
    return this.client.post('/admin/deposits/delete', { id })
      .then(response => {
        return response.data
      })
  }

  async addDepositUser ({ user_id, value }) {
    return this.client.post('/admin/deposits/create', {
      user_id: user_id + '', value
    })
      .then(response => {
        return response.data
      })
  }

  // Бонусы
  async getBonusesUser (id) {
    return this.client.get('/admin/bonus/get/' + id)
      .then(response => {
        return response.data
      })
  }

  async deleteBonusUser (id) {
    return this.client.post('/admin/bonus/delete', { id })
      .then(response => {
        return response.data
      })
  }

  async editBonusUser ({ income_bonus_id, value }) {
    return this.client.post('/admin/bonus/edit', {
      income_bonus_id: income_bonus_id + '', value
    })
      .then(response => {
        return response.data
      })
  }

  async addBonusUser ({ user_id, value }) {
    return this.client.post('/admin/bonus/create', {
      user_id: user_id + '', value
    })
      .then(response => {
        return response.data
      })
  }

  /**
   * Получение информации о юзере
   * @param {*} id
   * @returns Promise Response
   */

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

  async confirmTransaction (transaction_id = 0) {
    return this.client.post('/admin/transaction/accept', {
      transaction_id
    })
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
