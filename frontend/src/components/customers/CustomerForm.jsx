import { useEffect, useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"

const CustomerForm = ({ show, handleClose, onSubmitCustomer, customer = null }) => {

     const [customerName, setCustomerName] = useState("")
     const [mobileNumber, setMobileNumber] = useState("")

     useEffect(() => {
          if(customer) {
               setCustomerName(customer.customerName)

               setMobileNumber(customer.mobileNumber)
          } else{
               setCustomerName("")
               setMobileNumber("")
          }
     }, [customer, show])

     const onSubmit = (e) => {
          e.preventDefault()

          onSubmitCustomer({
               customerName,
               mobileNumber
          })
     }

     return (
          <Modal 
               show={show}
               onHide={handleClose}
               centered
          >
               <Modal.Header closeButton>
                    <Modal.Title>
                         {customer?"Edit Customer" : "Add Customer"}
                    </Modal.Title>
               </Modal.Header>

               <Form onSubmit={onSubmit}>
                    <Modal.Body>
                         <Form.Group className="mb-3">
                              <Form.Label>
                                   Customer Name
                              </Form.Label>

                              <Form.Control 
                                   type="text"
                                   maxLength={50}
                                   value={customerName}
                                   onChange={e => setCustomerName(e.target.value)}
                                   required
                              />
                         </Form.Group>

                         <Form.Group>
                              <Form.Label>
                                   Mobile Number
                              </Form.Label>

                              <Form.Control 
                                   type="tel"
                                   value={mobileNumber}
                                   maxLength={10}
                                   onChange={e => setMobileNumber(e.target.value)}
                                   required
                              />
                         </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                         <Button
                              variant="secondary"
                              onClick={handleClose}
                         >
                              Cancel
                         </Button>

                         <Button 
                              type="submit"
                         >
                              {customer ? "Update Customer" : "Save Customer"}
                         </Button>
                    </Modal.Footer>
               </Form>
          </Modal>
     )
}

export default CustomerForm
