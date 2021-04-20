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
import ApiModule from "../../../../api/ApiModule";

const roleOptions = [
  { value: "1", label: "Менеджер", role:"manager" },
  { value: "2", label: "Главный администратор", role:"admin" }
]

class AdminEdit extends React.Component {
  state = {
    basicPicker : new Date()
  }
 componentDidMount() {
    const { id } = this.props.match.params;
    this.setState(() => ({ adminId: id }));
  }
  async updateUser (data) {
    data = new FormData(data)

    const api = new ApiModule();
    api.editAdmin(data)
      .then((res)=>{
        console.log(res);
        alert('Администратор успешно обновлен!')
      }).catch((err) => alert(err.errors))
  }
  render() {

    return (
      <Card>
        <CardHeader>
          <h2>Редактировать администратора</h2>
        </CardHeader>
        <CardBody>
          <Row>
{/*            <Col md="6" sm="12">
                <FormGroup>
                  <Label for="password">Пароль</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Пароль"
                  />
                </FormGroup>
            </Col>*/}
            <Col sm="12">
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
                <Button.Ripple color="flat-warning">Удалить</Button.Ripple>
              </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}
export default AdminEdit
