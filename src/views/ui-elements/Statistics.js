import React from "react"
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap"
import StatisticsCard from "../../components/@vuexy/statisticsCard/StatisticsCard"
import {
    UserCheck,
    ShoppingBag,
    Activity,
    DollarSign
  } from "react-feather"

class StatisticsBar extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
            Статистика
        </CardHeader>
        <CardBody>
            <Row>
            <Col xl="3" lg="4" sm="6">
            <StatisticsCard
              hideChart
              iconBg="primary"
              icon={<Activity className="primary" size={22} />}
              stat="230"
              statTitle="Продаж"
            />
          </Col>
          <Col xl="3" lg="4" sm="6">
            <StatisticsCard
              hideChart
              iconBg="info"
              icon={<UserCheck className="info" size={22} />}
              stat="563"
              statTitle="Пользователей"
            />
          </Col>
          <Col xl="3" lg="4" sm="6">
            <StatisticsCard
              hideChart
              iconBg="warning"
              icon={<ShoppingBag className="warning" size={22} />}
              stat="1423"
              statTitle="Общее кол-во покупок"
            />
          </Col>
          <Col xl="3" lg="4" sm="6">
            <StatisticsCard
              hideChart
              iconBg="success"
              icon={<DollarSign className="success" size={22} />}
              stat="$9745"
              statTitle="Доход"
            />
          </Col>
            </Row>
        </CardBody>
      </Card>
    )
  }
}
export default StatisticsBar
