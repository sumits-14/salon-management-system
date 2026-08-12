import React from 'react'
import { Table, Button, Badge } from 'react-bootstrap';
import formatCurrency from '../../utils/formatCurrency.js';

const BillingTable = ({bills, onView}) => {
  
     if(!bills || bills.length === 0) {
          return (
               <p className='text-center mt-4'>
                    No Billing records found!
               </p>
          );
     }

     return (
          <Table
               striped
               bordered
               hover
               responsive
               className='mt-3'
          >
               <thead>
                    <tr>
                         <th>#</th>
                         <th>Date</th>
                         <th>Customer</th>
                         <th>Staff</th>
                         <th>Services</th>
                         <th>Amount</th>
                         <th>Payment</th>
                         <th>Action</th>
                    </tr>
               </thead>
               <tbody>
                    {bills.map((bill, index) => (
                         <tr key={bill._id}>
                              {/* Serial Number */}
                              <td>
                                   {index + 1}
                              </td>
                              {/* Date */}
                              <td>
                                   {new Date(
                                        bill.createdAt
                                   ).toLocaleDateString()}
                              </td>
                              {/* Customer */}
                              <td>
                                   <div>
                                        <strong>
                                             {bill.customer?.customerName || "N/A"}
                                        </strong>
                                        <br />
                                        <small className='text-muted'>
                                             {bill.customer?.mobileNumber || ""}
                                        </small>
                                   </div>
                              </td>
                              {/* staff */}
                              <td>
                                   {bill.worker?.name || "N/A"}
                              </td>
                              {/* Services */}
                              <td>
                                   {bill.services?.map((service, serviceIndex) => (
                                        <div key={service.service || serviceIndex}>
                                             {service.serviceName}
                                        </div>
                                   ))}
                              </td>
                              {/* Amount */}
                              <td>
                                   <strong>
                                        {formatCurrency(bill.totalAmount)}
                                   </strong>
                              </td>
                              {/* Payment Method */}
                              <td>
                                   <Badge
                                        bg={
                                             bill.paymentMethod === 'Cash' ? "success" : 
                                             bill.paymentMethod === "UPI" ? "primary" : "warning"
                                        }
                                        text={
                                             bill.paymentMethod === "Card" ? "dark" : undefined
                                        }
                                   >
                                        {bill.paymentMethod}
                                   </Badge>
                              </td>
                              {/* Action */}
                              <td>
                                   <Button
                                        size='sm'
                                        variant='info'
                                        onClick={() => onView(bill._id)}
                                   >
                                        View
                                   </Button>
                              </td>
                         </tr>
                    ))}
               </tbody>
          </Table>
  )
}

export default BillingTable;
