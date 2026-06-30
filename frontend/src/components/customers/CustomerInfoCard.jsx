import React from 'react'
import { Card, ListGroup, Badge } from 'react-bootstrap'

const CustomerInfoCard = ({customer}) => {

     if(!customer) {
          return null
     }

  return (
    <Card className='shadow-sm mb-4'>
          <Card.Header>
               <h5 className='mb-0'>
                    👤 Customer Information
               </h5>
          </Card.Header>

          <ListGroup variant='flush'>
               <ListGroup.Item>
                    <strong>✒️ Name :</strong>{" "}
                    {customer.customerName}
               </ListGroup.Item>
               
               <ListGroup.Item>
                    <strong>📱 Mobile :</strong>{" "}
                    {customer.mobileNumber}
               </ListGroup.Item>

               <ListGroup.Item>
                    <strong>🏷️ Status :</strong>{" "}
                    <Badge
                         bg={ customer.active ? "success" : "danger" }
                    >
                         {customer.active ? "success" : "danger"}
                    </Badge>
               </ListGroup.Item>

               <ListGroup.Item>
                    <strong>Member Since :</strong>{" "}
                    {new Date(customer.createdAt)
                         .toLocaleDateString("en-IN", {
                              day : "2-digit",
                              month: "short",
                              year : "numeric"
                         })
                    }
               </ListGroup.Item>
          </ListGroup>
    </Card> 
  )
}

export default CustomerInfoCard
