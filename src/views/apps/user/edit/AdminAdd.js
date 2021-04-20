import React from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Label,
  FormGroup,
  Form
} from "reactstrap"
import Select from "react-select"
import ApiModule from "../../../../api/ApiModule";

const roleOptions = [
/*
  {label: "Менеджер", value: 'manager'},
*/
  {label: "Главный администратор", value: 'admin'}
]

class AdminAdd extends React.Component {
  state = {
    basicPicker: new Date()
  }

  async addAdmin(data) {
    data = new FormData(data)
    let admin = await new ApiModule().createAdmin(data)
    if (admin?.errors) {
      alert(admin.errors)
    }
    console.log(admin);
    if (admin?.response) {
      alert('Администратор успешно добавлен и подтвержден!')
    }
  }

  render() {

    return (
      <Card>
        <CardHeader>
          <h2>Добавление администратора</h2>
        </CardHeader>
        <CardBody>
          <Form
            onSubmit={e => {
              e.preventDefault();
              console.log(e.target);
              this.addAdmin(e.target);
            }}>
            <Row>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="login">Логин</Label>
                  <Input
                    type="text"
                    id="login"
                    name="login"
                    placeholder="Логин"
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="Email">Email</Label>
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="password">Пароль</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Пароль"
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <Label for="status">Статус</Label>
                <Select
                  className="React"
                  classNamePrefix="select"
                  defaultValue={roleOptions[0]}
                  name="role"
                  id="role"
                  options={roleOptions}
                />
              </Col>
              <Col
                className="d-flex justify-content-end flex-wrap mt-2"
                sm="12"
              >
                <Button.Ripple className="mr-1" color="primary" type="submit">
                  Сохранить
                </Button.Ripple>
                <Button.Ripple color="flat-warning">Вернуть</Button.Ripple>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

export default AdminAdd
