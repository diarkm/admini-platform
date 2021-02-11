import React from "react"
import { Row, Col } from "reactstrap"
import Statistics from "../ui-elements/Statistics"
import RevenueGenerated from "../ui-elements/cards/statistics/RevenueGenerated"
import ClientRetention from "../ui-elements/cards/analytics/ClientRetention"
import ActivityTimeline from "../dashboard/analytics/ActivityTimeline"
import "../../assets/scss/pages/dashboard-analytics.scss"

// const apiURL = 'https://cabinet.giq-group.com/back/public'

let $primary = "#7367F0",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $info = "#00cfe8",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $info_light = "#1edec5",
  $stroke_color = "#e8e8e8",
  $label_color = "#e7eef7",
  $white = "#fff"

class Dashboard extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="8" md="8" sm="12">
            <Statistics/>
          </Col>
          <Col lg="4" md="4" sm="12">
            <RevenueGenerated />
          </Col>
        </Row>
        <Row className="match-height">
          <Col lg="8" md="8" sm="12">
            <ClientRetention
              strokeColor={$stroke_color}
              primary={$primary}
              danger={$danger}
              labelColor={$label_color}
            />
          </Col>
          <Col lg="4" md="4" sm="12">
            <ActivityTimeline />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default Dashboard
