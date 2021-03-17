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

class TransactionEdit extends React.Component {
  state = {
    transaction: null
  }

  async componentDidMount () {
    const { id } = this.props.match.params

    let trs = await new ApiModule().getTransaction(id)

    if(trs.transaction && trs.response)
      this.setState(() => ({ transaction: trs.transaction }))
  }

  async editTrans (data) {
    const { id } = this.props.match.params

    let $form = new FormData(data)
        $form.append('transaction_id', id)

    let trs = await new ApiModule().editTransaction($form)

    if(trs.response) {
      alert('Транзакция успешно обновлена')
    }
  }

  render() {
    const trs = this.state.transaction

    let showConfirmed = trs && trs.status_id <= 1

    return (
      <Card>
        <CardHeader>
          <h2>Редактировать транзакцию</h2>
        </CardHeader>
        <CardBody>
          {trs ? <form onSubmit={e => {
            e.preventDefault()
            this.editTrans(e.target)
          }}><Row>
            <Col sm="12">
              <Select
                className="React"
                classNamePrefix="select"
                defaultValue={trs.status_id}
                name="status_id"
                options={statusOptions}
              />
            </Col>
            <Col md="6" sm="12" className="mt-1">
              <FormGroup>
                <Label for="value">Сумма</Label>
                <Input
                  type="number"
                  id="value"
                  defaultValue={parseInt(trs.value)}
                  name={'value'}
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
                  defaultValue={trs.count}
                  name={'count'}
                  placeholder="Количество"
                />
              </FormGroup>
            </Col>
            <Col
                className="d-flex justify-content-end flex-wrap mt-2"
                sm="12"
              >
                {(trs.status_id <= 1 && showConfirmed) &&
                  <Button.Ripple onClick={async () => {
                    let trsConfirm = await new ApiModule().confirmTransaction(trs.id)

                    console.log(trsConfirm)

                    if(trsConfirm.response) {
                      alert('Транзакция успешно подтверждена!')
                      window.location.reload()
                    }
                }} className="mr-1" type={'button'} color="success">
                  Подтвердить
                </Button.Ripple>}

                <Button.Ripple className="mr-1" color="primary">
                  Сохранить
                </Button.Ripple>
                <Button.Ripple type={'button'} onClick={() => history.push('/transaction')} color="flat-warning">Вернуть</Button.Ripple>
              </Col>
          </Row></form> : ''}
        </CardBody>
      </Card>
    )
  }
}
export default TransactionEdit
