import React from 'react'
import { Modal, Button, Table, Badge, Spinner } from 'react-bootstrap'
import formatCurrency from '../../utils/formatCurrency.js'

function BillDetailsModal({
     show,
     handleClose,
     bill,
     loading,
}) {

  return (
    <Modal
          show={show}
          onHide={handleClose}
          centered
          size='lg'
    >
          <Modal.Header closeButton>
               <Modal.Title>
                    Bill Details
               </Modal.Title>
          </Modal.Header>

          <Modal.Body>
               {loading ? (
                    <div className='text-center py-5'>
                         <Spinner animation='border'/>
                    </div>
               ) : !bill ? (
                    <div className='text-center py-4'>
                         No Bill details available
                    </div>
               ) : (
                    <>
                         {/* Customer and Staff information */}
                         <div className='mb-4'>
                              <div className='row'>
                                   <div className='col-md-6'>
                                        <h6 className='text-muted'>
                                             Customer
                                        </h6>
                                        <p className='mb-1'>
                                             <strong>
                                                  {bill.customer?.customerName || "N/A"}
                                             </strong>
                                        </p>
                                        <p className='mb-0'>
                                             {bill.customer?.mobileNumber || "N/A"}
                                        </p>
                                   </div>
                                   <div className='col-md-6'>
                                        <h6 className='text-muted'>
                                             Staff
                                        </h6>
                                        <p className='mb-1'>
                                             <strong>
                                                  {bill.worker?.name || "N/A"}
                                             </strong>
                                        </p>
                                        <p className='mb-0 text-capitalize'>
                                             {bill.worker?.role || "N/A"}
                                        </p>
                                   </div>
                              </div>
                         </div>

                         <hr />

                         {/* Bill Information */}
                         <div className='row mb-4'>
                              <div className='col-md-6'>
                                   <strong>
                                        Bill Date:
                                   </strong>{" "}
                                   {new Date(
                                        bill.createdAt
                                   ).toLocaleDateString()}
                              </div>

                              <div className='col-md-6 text-md-end'>
                                   <strong>
                                        Payment:
                                   </strong>{" "}

                                   <Badge
                                        bg={
                                             bill.paymentMethod === "Cash" ? "success" : 
                                             bill.paymentMethod === "UPI" ? "primary" : "warning"
                                        }
                                        text={
                                             bill.paymentMethod === "Card" ? "dark" : undefined
                                        }
                                   >
                                        {bill.paymentMethod}
                                   </Badge>
                              </div>
                         </div>

                         {/* Services */}
                         <h6>Services</h6>
                         <Table
                              bordered
                              hover
                              responsive
                         >
                              <thead>
                                   <tr>
                                        <th>#</th>
                                        <th>Service</th>
                                        <th className='text-end'>
                                             Price
                                        </th>
                                   </tr>
                              </thead>

                              <tbody>
                                   {bill.services?.map(
                                        (service, index) => (
                                             <tr
                                                  key={
                                                       service.service || index
                                                  }
                                             >
                                                  <td>
                                                       {index + 1}
                                                  </td>
                                                  <td>
                                                       {service.serviceName}
                                                  </td>
                                                  <td>
                                                       {formatCurrency(service.price)}
                                                  </td>
                                             </tr>
                                        )
                                   )}
                              </tbody>
                              <tfoot>
                                   <tr>
                                        <th
                                             colSpan="2"
                                             className='text-end'
                                        >
                                             Total
                                        </th>

                                        <th className='text-end'>
                                             {formatCurrency(bill.totalAmount)}
                                        </th>
                                   </tr>
                              </tfoot>
                         </Table>
                    </>
               )}
          </Modal.Body>
          <Modal.Footer>
               <Button 
                    variant='secondary'
                    onClick={handleClose}
               >
                    Close
               </Button>
          </Modal.Footer>
    </Modal>
  )
}

export default BillDetailsModal
