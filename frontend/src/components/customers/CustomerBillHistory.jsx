import React from 'react'
import { Card, ListGroup, Badge } from 'react-bootstrap'
import formatCurrency from '../../utils/formatCurrency.js'

const CustomerBillHistory = ({bills}) => {

  if(bills.length === 0) {
    return (
      <Card className='shadow-sm'>
        <Card.Header>
          <h5>📄 Billing History</h5>
        </Card.Header>

        <Card.Body className='text-center'>
          No Bills Found.
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className='shadow-sm'>
      <Card.Header>
        <h5 className='mb-0'>📄 Billing History</h5>
      </Card.Header>

      <ListGroup variant='flush'>
        {
          bills.map((bill) => (
            <ListGroup.Item key={bill._id}>
              <div className='d-flex justify-content-between'>  
                <div>
                  <strong>
                    {
                      new Date(bill.createdAt).toLocaleDateString("en-IN", {
                        day:"2-digit",
                        month:"short",
                        year:"numeric"
                      })
                    }
                  </strong>
                </div>

                <Badge bg='primary'>
                    {
                      formatCurrency(bill.totalAmount)
                    }
                </Badge>
              </div>

              <div className='mt-2'>
                    {
                      bill.services.map((service) => (
                        <div key={service._id}>
                          ▶️ {service.serviceName}
                        </div>
                      ))
                    }
              </div>
              <small className='text-muted'>
                Handled By : {' '} {
                  bill.worker?.name || "Unknown"
                }
              </small>
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </Card>
  )
}

export default CustomerBillHistory
