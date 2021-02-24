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
import ApiModule from '../../../../api/ApiModule'
import { history } from "../../../../history"

const statusOptions = [
  { value: 1, label: "В обработке" },
  { value: 2, label: "Одобрено" },
  { value: 3, label: "Отклонено" }
]

class TransactionAdd extends React.Component {

  async addTrans (data) {
    let $form = new FormData(data)

    let trs = await new ApiModule().addTransaction($form)

    if(trs.response) {
      alert('Транзакция успешно добавлен')
    }
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <h2>Добавить транзакцию</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={e => {
            e.preventDefault()
            this.addTrans(e.target)
          }}><Row>
            <Col sm="12">
              <FormGroup>
                <Label for="user_id">ID пользователя</Label>
                <Input
                  type="number"
                  id="user_id"
                  placeholder="ID пользователя"
                />
              </FormGroup>
              {/* <Select
                className="React"
                classNamePrefix="select"
                name="status_id"
                options={statusOptions}
              /> */}
            </Col>
            <Col md="6" sm="12" className="mt-1">
              <FormGroup>
                <Label for="value">Сумма</Label>
                <Input
                  type="number"
                  id="value"
                  placeholder="Сумма"
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12" className="mt-1">
              <FormGroup>
                <Label for="amount">Количество</Label>
                <Input
                  type="number"
                  id="count"
                  placeholder="Количество"
                />
              </FormGroup>
            </Col>
            <Col
                className="d-flex justify-content-end flex-wrap mt-2"
                sm="12"
              >
                <Button.Ripple className="mr-1" color="primary">
                  Сохранить
                </Button.Ripple>
                <Button.Ripple type={'button'} onClick={() => history.push('/transaction')} color="flat-warning">Вернуть</Button.Ripple>
              </Col>
          </Row></form>
        </CardBody>
      </Card>
    )
  }
}
export default TransactionAdd
