import React from "react"
import {
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap"
import AccountTab from "./Account"
import "../../../../assets/scss/pages/users.scss"
class UserEdit extends React.Component {
  state = {
    activeTab: "1"
  }

  toggle = tab => {
    this.setState({
      activeTab: tab
    })
  }
  render() {
    return (
      <Row>
        <Col sm="12">
          <Card>
            <CardBody className="pt-2">
              <AccountTab />
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default UserEdit
