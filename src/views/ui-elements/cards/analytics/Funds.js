import React from "react"
import { Card, CardBody, Progress, Button } from "reactstrap"
import { ChevronsRight } from "react-feather"
import { history } from "../../../../history"

class Funds extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          <div className="justify-content-center align-items-center">
            <h1 className="mb-0">
              <sup className="font-medium-3 mr-50">$</sup>
              23,597
            </h1>
            <small>
              <span className="text-muted">Мой кошелек: </span>$20,065
            </small>
            <h5 className="mt-1">
              <span className="text-success">+5.2% ($956)</span>
            </h5>
          </div>
        </CardBody>
      </Card>
    )
  }
}
export default Funds
