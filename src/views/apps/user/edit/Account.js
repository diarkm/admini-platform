import React from "react"
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


const columns = [
  {
    name: "Сумма",
    selector: "value",
    sortable: true
  },
  {
    name: "Срок",
    selector: "date",
    sortable: true
  }
]

const columnsBonuses = [
  {
    name: "Сумма",
    selector: "value",
    sortable: true
  },
  {
    name: "Срок",
    selector: "date",
    sortable: true
  }
]

const data = [
  {
    value: "$1000",
    date: "10-12-2021"
  },
  {
    value: "$1500",
    date: "11-12-2021"
  },
  {
    value: "$3000",
    date: "14-12-2021"
  },
]

class UserAccountTab extends React.Component {
  render() {
    const { user, updateUser } = this.props

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
            updateUser(e.target)
          }}>
            <Input
              type="hidden"
              id="user_id"
              defaultValue={user.id}
            />

            <Row>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="avatar">Аватар</Label>
                  <Input
                    type="file"
                    id="avatar"
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
                    defaultValue={user.phoneNumber}
                    placeholder="Телефон"
                  />
                </FormGroup>
              </Col>
              {/* <Col sm="12">
                <div className="permissions border px-2">
                  <div className="title pt-2 pb-0">
                    <DollarSign size={19} />
                    <span className="text-bold-500 font-medium-2 ml-50">
                      Депозиты
                    </span>
                    <hr />
                  </div>
                  <DataTable data={data} columns={columns} noHeader />
                  <hr />
                  <FormGroup>
                  <Label for="value">Сумма</Label>
                  <Input
                    type="text"
                    id="value"
                    placeholder="Сумма"
                  />
                  </FormGroup>
                  <FormGroup>
                    <Label for="amount">Количество</Label>
                    <Input
                      type="text"
                      id="amount"
                      placeholder="Количество"
                    />
                  </FormGroup>
                  <Button.Ripple className="mb-2" color="primary">
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
                  <DataTable
                    data={data}
                    columns={columns}
                    noHeader
                    selectableRows
                    selectableRowsComponent={Checkbox}
                    selectableRowsComponentProps={{
                      color: "primary",
                      icon: <Check className="vx-icon" size={12} />,
                      label: "",
                      size: "sm"
                    }}/>
                    <Button.Ripple className="my-2" color="danger">
                      Удалить бонус
                    </Button.Ripple>
                  <hr />
                  <FormGroup>
                  <Label for="value">Сумма</Label>
                  <Input
                    type="text"
                    id="value"
                    placeholder="Сумма"
                  />
                  </FormGroup>
                  <Button.Ripple className="mb-2" color="primary">
                    Добавить бонус
                  </Button.Ripple>
                </div>
              </Col> */}
              <Col
                className="d-flex justify-content-end flex-wrap mt-2"
                sm="12"
              >
                <Button.Ripple className="mr-1" color="primary">
                  Сохранить
                </Button.Ripple>
                <Button.Ripple color="flat-warning">Вернуть</Button.Ripple>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}
export default UserAccountTab
