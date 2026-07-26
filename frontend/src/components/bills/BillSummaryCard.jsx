import { Card, ListGroup, Badge } from "react-bootstrap";

import React from 'react'

function BillSummaryCard({selectedServices}) {

     const totalAmount = selectedServices.reduce(
          (total, service) => total + service.price, 0
     )

  return (
    <Card className="shadow-sm mt-4">
          <Card.Header>
               <h5 className="mb-0">
                    Bill Summary
               </h5>
          </Card.Header>

          <Card.Body>
               {
                    selectedServices.length === 0 ? (
                         <p className="text-muted mb-0">
                              No Service Selected!
                         </p>
                    ) : (
                         <ListGroup variant="flush">
                              {
                                   selectedServices.map((service) => (
                                        <ListGroup.Item
                                             key={service._id}
                                             className="d-flex justify-content-between align-items-center"
                                        >
                                             {service.serviceName}

                                             <Badge bg="secondary">
                                                  Rs. {service.price}
                                             </Badge>
                                        </ListGroup.Item>
                                   ))
                              }
                         </ListGroup>
                    )
               }

               <hr />

               <div className="d-flex justify-content-between">
                    <strong>Total Amount</strong>
                    <strong>Rs. {totalAmount}</strong>
               </div>

          </Card.Body>
    </Card>
  );
};

export default BillSummaryCard;








