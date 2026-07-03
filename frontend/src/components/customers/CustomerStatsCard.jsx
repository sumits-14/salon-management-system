import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import formatCurrency from '../../utils/formatCurrency.js'

const CustomerStatsCard = ({ bills }) => {

  const totalVisits = bills.length;
  const lifetimeSpend = bills.reduce((total, bill) => total + bill.totalAmount, 0);
  const averageBill = totalVisits > 0 ? lifetimeSpend / totalVisits : 0;
  const lastVisit = totalVisits > 0 ? bills[0].createdAt : null;

  return (
    <Card className='shadow-sm mb-4'>
      <Card.Header>
        <h5 className='mb-0 text-center'>📊 Customer Statistics</h5>
      </Card.Header>

      <Card.Body>
        <Row className='text-center'>
          <Col md={6}>
            <h6>Total Visits</h6>
            <h4>{totalVisits}</h4>
          </Col>

          <Col md={6}>
            <h6>Lifetime Spend</h6>
            <h4>
              {
                formatCurrency(lifetimeSpend)
              }
            </h4>
          </Col>
        </Row>

        <hr />

        <Row className='text-center'>
          <Col md={6}>
              <h6>Average Bill</h6>

              <h4>
                {
                  formatCurrency(averageBill)
                }
              </h4>
          </Col>

          <Col md={6}>
                <h6>Last visit</h6>
                <h5>
                  {
                    lastVisit ? new Date(lastVisit).toLocaleDateString("en-IN", {
                      day:"2-digit",
                      month:"short",
                      year:"numeric"
                    }) : "No Visits"
                  }
                </h5>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default CustomerStatsCard
