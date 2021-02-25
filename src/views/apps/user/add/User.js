import React from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  Media,
  Button,
  Form,
  Input,
  Label,
  FormGroup
} from "reactstrap"
import "../../../../assets/scss/pages/users.scss"
import ApiModule from '../../../../api/ApiModule'

class UserAdd extends React.Component {
  state = {
    user: null
  }

  async addUser (data) {
    data = new FormData(data)

    let user = await new ApiModule().addUser(data)

    if(user.errors)
      alert(user.errors)

    if(user.response) {
      let userConfirm = await new ApiModule().confirmUser(user.user_id)

      if(userConfirm.response) {
        alert('Пользователь успешно добавлен и подтвержден!')
      }
    }
  }

  render() {
    return (
      <Row>
        <Col sm="12">
          <Card>
            <CardBody className="pt-2">
              <Row>
                <Col sm="12">
                  <Media className="mb-2">
                    <Media className="mt-2" body>
                      <Media className="font-medium-1 text-bold-600" tag="p" heading>
                         Создание пользователя
                      </Media>
                    </Media>
                  </Media>
                </Col>
                <Col sm="12">
                  <Form onSubmit={e => {
                    e.preventDefault()
                    this.addUser(e.target)
                  }}>
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
                            placeholder="Телефон"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6" sm="12">
                        <FormGroup>
                          <Label for="password">Пароль</Label>
                          <Input
                            type="password"
                            id="password"
                            name={'password'}
                            placeholder="Почта"
                          />
                        </FormGroup>
                      </Col>
                      <Col
                        className="d-flex justify-content-end flex-wrap mt-2"
                        sm="12"
                      >
                        <Button.Ripple className="mr-1" color="primary">
                          Добавить
                        </Button.Ripple>
                        <Button.Ripple color="flat-warning">Вернуть</Button.Ripple>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default UserAdd
