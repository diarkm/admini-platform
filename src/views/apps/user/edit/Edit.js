import React from "react"
import {
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap"
import AccountTab from "./Account"
import "../../../../assets/scss/pages/users.scss"
import ApiModule from '../../../../api/ApiModule'
class UserEdit extends React.Component {
  state = {
    user: null
  }

  async componentDidMount () {
    const { id } = this.props.match.params

    let user = await new ApiModule().getUser(id)

    if(user.response && user.user) {
      this.setState(() => ({ user: user.user }))
    }
  }

  async updateUser (data) {
    data = new FormData(data)

    let user = await new ApiModule().editUser(data)

    // TODO: вывести уведомление
    if(user.errors)
      alert(user.errors)

    if(user.response) {
      alert('Пользователь успешно обновлен!')
    }
  }

  render() {
    const { user } = this.state

    return (
      <Row>
        <Col sm="12">
          <Card>
            <CardBody className="pt-2">
              {user ? <AccountTab updateUser={this.updateUser} user={user} /> : ''}
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default UserEdit
