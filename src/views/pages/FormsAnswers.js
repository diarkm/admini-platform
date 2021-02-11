import React from "react"
import { Row, Col } from "reactstrap"
import FaqQuestions from "../pages/faq/FaqQuestions"
import "../../assets/scss/pages/dashboard-analytics.scss"

// const apiURL = 'https://cabinet.giq-group.com/back/public'

class FormsAnswers extends React.Component {

  state = {
      value: ""
  }

  render() {
    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="12" md="12" sm="12">
            <FaqQuestions value={this.state.value}/>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default FormsAnswers
