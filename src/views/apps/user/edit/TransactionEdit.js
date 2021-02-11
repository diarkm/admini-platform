import React from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button
} from "reactstrap"
import Select from "react-select"

const statusOptions = [
  { value: "1", label: "В обработке" },
  { value: "2", label: "Одобрено" },
  { value: "3", label: "Отклонено" }
]

class TransactionEdit extends React.Component {
  state = {
    basicPicker : new Date()
  }
  render() {

    return (
      <Card>
        <CardHeader>
          <h2>Редактировать транзакцию</h2>
        </CardHeader>
        <CardBody>
          <Row>
            <Col sm="12">
              <Select
                className="React"
                classNamePrefix="select"
                defaultValue={statusOptions[0]}
                name="status"
                options={statusOptions}
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
export default TransactionEdit
