import React from "react"
import { Row, Col } from "reactstrap"
import SubscribersGained from "../../ui-elements/cards/statistics/SubscriberGained"
import RealEstate from "../../ui-elements/cards/statistics/RealEstate"
import QuaterlySales from "../../ui-elements/cards/statistics/QuaterlySales"
import OrdersReceived from "../../ui-elements/cards/statistics/OrdersReceived"
import RevenueChart from "../../ui-elements/cards/analytics/Revenue"
import ClientRetention from "../../ui-elements/cards/analytics/ClientRetention"
import ActivityTimeline from "../analytics/ActivityTimeline"

import "../../../assets/scss/plugins/charts/apex-charts.scss"

let $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $stroke_color = "#b9c3cd",
  $label_color = "#e7eef7"

class EcommerceDashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="8" md="6" sm="12">
            <RevenueChart
              primary={$primary}
              dangerLight={$danger_light}
              strokeColor={$stroke_color}
              labelColor={$label_color}
            />
          </Col>
          <Col lg="4" md="6" sm="12">
            <ActivityTimeline />
          </Col>
        </Row>
        <Row className="match-height">
          <Col lg="12" md="12" sm="12">
            <ClientRetention
              strokeColor={$stroke_color}
              primary={$primary}
              danger={$danger}
              labelColor={$label_color}
            />
          </Col>
        </Row>
        <Row className="match-height">
          <Col lg="3" md="6" sm="6">
            <SubscribersGained />
          </Col>
          <Col lg="3" md="6" sm="6">
            <RealEstate />
          </Col>
          <Col lg="3" md="6" sm="6">
            <QuaterlySales />
          </Col>
          <Col lg="3" md="6" sm="6">
            <OrdersReceived />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default EcommerceDashboard
