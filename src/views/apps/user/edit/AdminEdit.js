import React from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Form,
  Input,
  Label,
  FormGroup
} from "reactstrap"
import Select from "react-select"
import ApiModule from "../../../../api/ApiModule";
import {history} from "../../../../history";

const roleOptions = [
/*
  {value: "manager", label: "Менеджер"},
*/
  {value: "admin", label: "Главный администратор"}
]

class AdminEdit extends React.Component {
  state = {
    basicPicker: new Date()
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.setState(() => ({adminId: id}));
  }

  async updateAdmin(data) {
    data = new FormData(data)

    const api = new ApiModule();
    api.editAdmin(data)
      .then((res) => {
        console.log(res);
        alert('Администратор успешно обновлен!')
      }).catch((err) => alert(err.errors))
  }
  async deleteAdmin() {
    const api = new ApiModule();
    api.deleteAdmin(this.state.adminId)
      .then((res)=>{
        console.log(res);
        history.push('/admins');
      }).catch((err)=> console.log(err));
  }

  render() {

    return (
      <Card>
        <CardHeader>
          <h2>Редактировать администратора</h2>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>

              <Col sm="12">
                <Select
                  className="React"
                  classNamePrefix="select"
                  defaultValue={roleOptions[1]}
                  name="status"
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
                <Button.Ripple color="flat-warning" onClick={()=> this.deleteAdmin()}>Удалить</Button.Ripple>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

export default AdminEdit
