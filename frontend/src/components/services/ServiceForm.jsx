import { useEffect, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

const ServiceForm = ({ show,
     handleClose, 
     handleSave,
     service = null
}) => {

     const [serviceName, setServiceName] = useState("")
     const [price, setPrice] = useState("")

     useEffect(() => {
          if(service) {
               setServiceName(service.serviceName);
               setPrice(service.price)
          } else {
               setServiceName("");
               setPrice("")
          }
     }, [service, show])

     const onSubmit = (e) => {
          e.preventDefault();

          handleSave({
               serviceName,
               price : Number(price),
          });
     }

     return (
          <Modal
               show={show}
               onHide={handleClose}
               centered
          >
               <Modal.Header closeButton>
                    <Modal.Title>
                         {
                              service ? "Edit Service" : "Add Service"
                         }
                    </Modal.Title>
               </Modal.Header>
               <Form onSubmit={onSubmit}>
                    <Modal.Body>
                         <Form.Group className='mb-3'>
                              <Form.Label>
                                   Service Name
                              </Form.Label>
                              <Form.Control
                              type='text'
                              value={serviceName}
                              onChange={e => setServiceName(e.target.value)}
                              required
                              />

                              
                         </Form.Group>
                         <Form.Group>
                              <Form.Label>
                                   Price
                              </Form.Label>
                              <Form.Control 
                              type='number'
                              min="0"
                              value={price}
                              onChange={e => setPrice(e.target.value)}
                              required
                              />
                         </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                         <Button
                              variant='secondary'
                              onClick={handleClose}
                         >
                              Cancel
                         </Button>

                         <Button
                              type='submit'
                              // onClick={handleClose}
                         >
                            {
                              service ? "Update" : "Save"
                            }  
                         </Button>
                    </Modal.Footer>

               </Form>
               
          </Modal>
     )
}

export default ServiceForm
