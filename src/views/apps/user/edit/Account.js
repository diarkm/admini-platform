import React, { useState } from "react"
import {
  Media,
  Row,
  Col,
  Button,
  Form,
  Input,
  Label,
  FormGroup
} from "reactstrap"
import { DollarSign, Check } from "react-feather"
import DataTable from "react-data-table-component"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { history } from "../../../../history"
import ApiModule from '../../../../api/ApiModule'


const _api = new ApiModule()

const UserAccountTab = props => {
  const [inputBonus, setinputBonus] = useState(0)
  const [inputDeposit, setinputDeposit] = useState(0)
  const [countPages, setcountPages] = useState(5)

  const [showConfirmed, setshowConfirmed] = useState(true)
  const [bonuses, setbonuses] = useState([])
  const [deposits, setdeposits] = useState([])
  const [loadData, setloadData] = useState(false)

  const { user, updateUser } = props

  const getDeposits = async () => {
    let data = await _api.getDepositsUser(user.id)

    data.deposits = data.deposits.filter(item => item.value > 0)

    setdeposits(data.deposits)
    setinputDeposit(0)
  }
  const getBonuses = async () => {
    let data = await _api.getBonusesUser(user.id)

    data.income = data.income.filter(item => item.value > 0)

    setbonuses(data.income)
    setinputBonus(0)
  }

  const addBonus = async () => {
    if(inputBonus > 0) {
      let bonusCreate = await _api.addBonusUser({ user_id: user.id, value: inputBonus })

      if(bonusCreate.response)
        alert('Бонус успешно добавлен!')

      getBonuses()
    }
  }

  const addDeposit = async () => {
    if(inputDeposit > 0) {
      let depositCreate = await _api.addDepositUser({ user_id: user.id, value: inputDeposit })

      if(depositCreate.response)
        alert('Депозит успешно добавлен!')

      getDeposits()
    }
  }

  if(!loadData) {
    getDeposits()
    getBonuses()

    setloadData(true)
  }

  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true
    },
    {
      name: "Сумма",
      selector: "value",
      sortable: true
    },
    {
      name: "Дата создания",
      selector: "created_at",
      sortable: true,
      cell: params => {
        let $date = params.created_at.replace(/\.(.*)/g, '').replace(/\-/g, '.').split(/T|Т/)
          $date[0] = $date[0].split('.').reverse().join('.')
        return $date.join(' ')
      }
    },
    {
      name: '#',
      selector: 'id',
      cell: params => {
        return <Button.Ripple onClick={async () => {
          if(window.confirm('Действительно хотите удалить?')) {
            let deleteData = await _api.deleteDepositUser(params.id)

            if(deleteData.response) {
              alert('Депозит успешно удален!')
              getDeposits()
            }
          }
        }} className="my-2" color="danger">
          Удалить
        </Button.Ripple>
      }
    },
    {
      name: '#',
      selector: 'id',
      cell: params => {
        return <Button.Ripple onClick={async () => {
          let data = parseInt( prompt('Введите сумму', parseInt(params.value)) )

          if(!isNaN(data)) {
            let editData = await _api.editDepositUser({ deposit_id: params.id, value: data })

            editData.response && getDeposits()
          }
        }} className="my-2" color="primary">
          Изменить
        </Button.Ripple>
      }
    }
  ]

  const columnsBonuses = [
    {
      name: "ID",
      selector: "id",
      sortable: true
    },
    {
      name: "Income_ID",
      selector: "income_id",
      sortable: true
    },
    {
      name: "Сумма",
      selector: "value",
      sortable: true
    },
    {
      name: "Дата создания",
      selector: "created_at",
      sortable: true,
      cell: params => {
        let $date = params.created_at.replace(/\.(.*)/g, '').replace(/\-/g, '.').split(/T|Т/)
          $date[0] = $date[0].split('.').reverse().join('.')
        return $date.join(' ')
      }
    },
    {
      name: '#',
      selector: 'id',
      cell: params => {
        return <Button.Ripple onClick={async () => {
          if(window.confirm('Действительно хотите удалить?')) {
            let deleteData = await _api.deleteBonusUser(params.id)

            if(deleteData.response) {
              alert('Бонус успешно удален!')
              getBonuses()
            }
          }
        }} className="my-2" color="danger">
          Удалить
        </Button.Ripple>
      }
    },
    {
      name: '#',
      selector: 'id',
      cell: params => {
        return <Button.Ripple onClick={async () => {
          let data = parseInt( prompt('Введите сумму', parseInt(params.value)) )

          if(!isNaN(data)) {
            let editData = await _api.editBonusUser({ income_bonus_id: params.id, value: data })

            editData.response && getBonuses()
          }
        }} className="my-2" color="primary">
          Изменить
        </Button.Ripple>
      }
    }
  ]

  return (
    <Row>
      <Col sm="12">
        <Media className="mb-2">
          <Media className="mt-2" body>
            <Media className="font-medium-1 text-bold-600" tag="p" heading>
              {user.firstName} {user.lastName}
            </Media>
          </Media>
        </Media>
      </Col>
      <Col sm="12">
        <Form onSubmit={e => {
          e.preventDefault()
          let $form = e.target

          if($form.reqs) {
            let reqs = $form.reqs.value
            new ApiModule().updateReqs(reqs, user.reqs.id)
          }

          updateUser($form)
        }}>
          <Input
            type="hidden"
            id="user_id"
            defaultValue={user.id}
            name={'user_id'}
          />

          <Row>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="avatar">Аватар</Label>
                <Input
                  type="file"
                  id="avatar"
                  name={'avatar'}
                  placeholder="Аватар"
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="firstName">Имя</Label>
                <Input
                  type="text"
                  id="firstName"
                  defaultValue={user.firstName}
                  name={'firstName'}
                  placeholder="Имя"
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="lastName">Фамилия</Label>
                <Input
                  type="text"
                  id="lastName"
                  name={'lastName'}
                  defaultValue={user.lastName}
                  placeholder="Фамилия"
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="login">Логин</Label>
                <Input
                  type="text"
                  id="login"
                  defaultValue={user.login}
                  name={'login'}
                  placeholder="Логин"
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="email">Почта</Label>
                <Input
                  type="email"
                  id="email"
                  name={'email'}
                  defaultValue={user.email}
                  placeholder="Почта"
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="phoneNumber">Телефон</Label>
                <Input
                  type="text"
                  id="phoneNumber"
                  name={'phoneNumber'}
                  defaultValue={user.phoneNumber}
                  placeholder="Телефон"
                />
              </FormGroup>
            </Col>

            <Col md="6" sm="12">
              <FormGroup>
                <Label for="reqs">Реквизиты</Label>
                <Input
                  type="text"
                  id="reqs"
                  name={'reqs'}
                  defaultValue={(user.reqs && user.reqs.id > 0) ? user.reqs.wallet : ''}
                  placeholder="Реквизиты"
                />
              </FormGroup>
            </Col>

            {(user.confirmed <= 0 && showConfirmed) && <Col md="6" sm="12">
              <FormGroup>
                <Button.Ripple onClick={async () => {
                  let userConfirm = await new ApiModule().confirmUser(user.id)

                  if(userConfirm.response) {
                    alert('Пользователь успешно подтвержден!')
                    setshowConfirmed(false)
                  }
                }} className="mr-1" type={'button'} color="success">
                  Подтвердить
                </Button.Ripple>
              </FormGroup>
            </Col>}

            <Col sm="12">
              <div className="permissions border px-2">
                <div className="title pt-2 pb-0">
                  <DollarSign size={19} />
                  <span className="text-bold-500 font-medium-2 ml-50">
                    Депозиты
                  </span>
                  <hr />
                </div>
                {deposits.length && <DataTable
                  data={deposits}
                  columns={columns}
                  paginationPerPage={countPages}
                  pagination
                  theme={'dark'}
                  noHeader
                />}
                <hr />
                <FormGroup>
                <Label for="value">Сумма</Label>
                <Input
                  type="number"
                  id="value"
                  value={inputDeposit}
                  onChange={e => setinputDeposit(e.target.value)}
                  placeholder="Сумма"
                />
                </FormGroup>
                <Button.Ripple disabled={inputDeposit <= 0} onClick={addDeposit} className="mb-2" color="primary">
                  Добавить депозит
                </Button.Ripple>
              </div>
              <div className="permissions border px-2 mt-1">
                <div className="title pt-2 pb-0">
                  <DollarSign size={19} />
                  <span className="text-bold-500 font-medium-2 ml-50">
                    Бонусы
                  </span>
                  <hr />
                </div>

                {bonuses.length && <DataTable
                  data={bonuses}
                  columns={columnsBonuses}
                  noHeader
                  pagination
                  paginationPerPage={countPages}
                  theme={'dark'}
                  /*selectableRows
                  selectableRowsComponent={Checkbox}
                  selectableRowsComponentProps={{
                    color: "primary",
                    icon: <Check className="vx-icon" size={12} />,
                    label: "",
                    size: "sm"
                  }}*//>}

                <hr />
                <FormGroup>
                <Label for="value">Сумма</Label>
                <Input
                  type="number"
                  id="value"
                  value={inputBonus}
                  onChange={e => setinputBonus(e.target.value)}
                  placeholder="Сумма"
                />
                </FormGroup>
                <Button.Ripple disabled={inputBonus <= 0} onClick={addBonus} className="mb-2" color="primary">
                  Добавить бонус
                </Button.Ripple>
              </div>
            </Col>
            <Col
              className="d-flex justify-content-end flex-wrap mt-2"
              sm="12"
            >
              <Button.Ripple className="mr-1" color="primary">
                Сохранить
              </Button.Ripple>
              <Button.Ripple onClick={() => history.push('/users')} color="flat-warning">Вернуть</Button.Ripple>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default UserAccountTab
