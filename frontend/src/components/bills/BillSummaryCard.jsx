import { Card, ListGroup, Badge, Form, Button } from "react-bootstrap";


const BillSummaryCard = ({ 
     selectedServices, 
     paymentMethod, 
     setPaymentMethod, 
     onCreateBill, 
}) => {

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

                    <h6 className="mb-3 mt-3">
                         Payment Method
                    </h6>

                    <Form>
                         <Form.Check 
                              type="radio"
                              id="cash"
                              label="Cash"
                              value="Cash"
                              checked={paymentMethod === 'Cash'}
                              onChange={e => setPaymentMethod(e.target.value)}
                         />
                         
                         <Form.Check 
                              type="radio"
                              id="upi"
                              label="UPI"
                              value="UPI"
                              checked={paymentMethod === 'UPI'}
                              onChange={e => setPaymentMethod(e.target.value)}
                         />
                         
                         <Form.Check 
                              type="radio"
                              id="card"
                              label="Card"
                              value="Card"
                              checked={paymentMethod === 'Card'}
                              onChange={e => setPaymentMethod(e.target.value)}
                         />
                         
                    </Form>

                    <div className="d-flex justify-content-between">
                         <strong>Total Amount</strong>
                         <strong>Rs. {totalAmount}</strong>
                    </div>

                    <hr />

                    <div className="d-grid">
                         <Button
                              variant="success"
                              onClick={onCreateBill}
                         >
                              Create Bill
                         </Button>
                    </div>

               </Card.Body>
          </Card>
     );
};

export default BillSummaryCard;








