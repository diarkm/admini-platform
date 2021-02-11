import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import { Plus, Check, UserCheck, DollarSign } from "react-feather"

class ActivityTimeline extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Транзакции пользователей</CardTitle>
        </CardHeader>
        <CardBody>
          <ul className="activity-timeline timeline-left list-unstyled">
            <li>
              <div className="timeline-icon bg-danger">
                <DollarSign size={16} />
              </div>
              <div className="timeline-info d-flex justify-content-between align-items-center">
                <div>
                  <p className="font-weight-bold mb-0">Referral1</p>
                  <span className="font-small-3">
                  INVESTOR GIQ-S
                  </span>
                </div>
                <h4 className="text-danger">-$21</h4>
              </div>
            </li>
            <li>
              <div className="timeline-icon bg-success">
                <DollarSign size={16} />
              </div>
              <div className="timeline-info d-flex justify-content-between align-items-center">
                <div>
                  <p className="font-weight-bold mb-0">Referral1</p>
                  <span className="font-small-3">
                  INVESTOR GIQ-S
                  </span>
                </div>
                <h4 className="text-success">+$74</h4>
              </div>
            </li>
            <li>
              <div className="timeline-icon bg-danger">
                <DollarSign size={16} />
              </div>
              <div className="timeline-info d-flex justify-content-between align-items-center">
                <div>
                  <p className="font-weight-bold mb-0">Referral1</p>
                  <span className="font-small-3">
                  INVESTOR GIQ-S
                  </span>
                </div>
                <h4 className="text-danger">-$184</h4>
              </div>
            </li>
            <li>
              <div className="timeline-icon bg-success">
                <DollarSign size={16} />
              </div>
              <div className="timeline-info d-flex justify-content-between align-items-center">
                <div>
                  <p className="font-weight-bold mb-0">Referral1</p>
                  <span className="font-small-3">
                  INVESTOR GIQ-S
                  </span>
                </div>
                <h4 className="text-success">+$74</h4>
              </div>
            </li>
          </ul>
        </CardBody>
      </Card>
    )
  }
}
export default ActivityTimeline
