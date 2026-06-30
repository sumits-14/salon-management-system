import { Table, Button } from "react-bootstrap"
import formatCurrency from '../../utils/formatCurrency.js'
import { useNavigate } from "react-router-dom"

const CustomerTable = ({ customers, onEdit }) => {

     const navigate = useNavigate()

     return (
          <Table striped bordered hover responsive >
               <thead>
                    <tr>
                         <th>Name</th>
                         <th>Mobile</th>
                         <th>Visits</th>
                         <th>Total Amount</th>
                         <th>Actions</th>
                    </tr>
               </thead>

               <tbody>
                    {customers.length === 0 ? (
                         <tr>
                              <td colSpan={5} className="text-center">
                                   No customers found!
                              </td>
                         </tr>
                    ) : (
                         customers.map(
                              (customer) => (
                                   <tr key={customer._id}>
                                        <td>
                                             {customer.customerName}
                                        </td>

                                        <td>
                                             {customer.mobileNumber}
                                        </td>

                                        <td>
                                             {customer.totalVisits}
                                        </td>

                                        <td>
                                             {formatCurrency(
                                                  customer.totalAmount ?? 0
                                             )}
                                             {/* {formatCurrency(
                                                  customer.totalAmount || 0
                                             )} */}
                                        </td>

                                        <td>
                                             <Button
                                                  variant="warning"
                                                  size="sm"
                                                  className="me-2"
                                                  onClick={() => onEdit(customer)}
                                             >
                                                  Edit
                                             </Button>

                                             <Button
                                                  variant="success"
                                                  size="sm"
                                                  className="me-2"
                                                  onClick={() => navigate(`/customers/${customer._id}`)}
                                             >
                                                  View
                                             </Button>

                                             <Button
                                                  variant="danger"
                                                  size="sm"
                                                  className="me-2"
                                             >
                                                  Delete
                                             </Button>
                                        </td>
                                   </tr>
                              )
                         )
                    )}
               </tbody>
          </Table>
     )
}

export default CustomerTable;
