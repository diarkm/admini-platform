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
  FormGroup
} from "reactstrap"
import Select from "react-select"

const roleOptions = [
  { value: "1", label: "Менеджер" },
  { value: "2", label: "Главный администратор" }
]

class AdminEdit extends React.Component {
  state = {
    basicPicker : new Date()
  }
  render() {

    return (
      <Card>
        <CardHeader>
          <h2>Редактировать администратора</h2>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="6" sm="12">
                <FormGroup>
                  <Label for="login">Логин</Label>
                  <Input
                    type="text"
                    id="login"
                    placeholder="Логин"
                  />
                </FormGroup>
            </Col>
            <Col md="6" sm="12">
                <FormGroup>
                  <Label for="Email">Email</Label>
                  <Input
                    type="text"
                    id="Email"
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
                name="status"
                options={roleOptions}
              />
            </Col>
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
        </CardBody>
      </Card>
    )
  }
}
export default AdminEdit