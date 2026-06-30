import { useState } from 'react'
import { getCustomerById } from '../api/customerApi.js'
import { getCustomerBills } from '../api/billApi'
import { showError } from '../utils/toast.js'

const CustomerDetailsPage = () => {

     const [customer, setCustomer] = useState(null)
     const [bills, setBills] = useState([])
     const [loading, setLoading] = useState(true)

     const fetchCustomerDetails = async () => {
          try {
               const [customerResponse, billResponse] = await Promise.all([
                    getCustomerById(id),
                    getCustomerBills(id)
               ]);

               setCustomer(customerResponse.data.data);
               setBills(billResponse.data.data);
          } catch (error) {
               showError("Unable to load customer.😕");
          } finally {
               setLoading(false)
          }
     }

     return (
          <div>
               details page
          </div>
     )
}

export default CustomerDetailsPage
