import React from 'react'
import { Table, Button, Badge } from 'react-bootstrap'
import formatCurrency from '../../utils/formatCurrency'


const ServiceTable = ({services, onView, onEdit, onDelete}) => {
     // console.log("ServiceTable:", services);
  return (
    <Table
          striped
          bordered
          hover
          responsive
    >
          <thead>
               <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
               </tr>
          </thead>

          <tbody>
               {
                    services.length == 0 ? (
                         <tr>
                              <td 
                                   colSpan='4'
                                   className='text-center'
                              >
                                   No Service found
                              </td>
                         </tr>
                    ) : (
                         services.map(service => (
                              <tr key={service._id}>
                                   <td>
                                        {
                                             service.serviceName
                                        }
                                   </td>

                                   <td>
                                        {
                                             formatCurrency(
                                                  service.price
                                             )
                                        }
                                   </td>

                                   <td>
                                        <Badge
                                             bg={
                                                  service.active ? "success" : 'danger'
                                             }
                                        >
                                             {
                                                  service.active ? "Active" : "Inactive"
                                             }
                                        </Badge>
                                   </td>

                                   <td>
                                        {/* <Button
                                             size='sm'
                                             variant='success'
                                             className='me-2'
                                             onClick={() => onView(service)}
                                        >
                                             View
                                        </Button> */}

                                        <Button
                                             size='sm'
                                             variant='warning'
                                             className='ms-5'
                                             onClick={() => onEdit(service)}
                                        >
                                             Edit
                                        </Button>

                                        <Button
                                             size='sm'
                                             variant='danger'
                                             className='ms-5'
                                             onClick={() => onDelete(service._id)}
                                        >
                                             Delete
                                        </Button>
                                   </td>
                              </tr>
                         ))
                    )
               }
          </tbody>
    </Table>
  )
}

export default ServiceTable
