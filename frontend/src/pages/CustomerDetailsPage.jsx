import { useState, useEffect } from 'react'
import { getCustomerById } from '../api/customerApi.js'
import { getCustomerBills } from '../api/billApi'
import { showError } from '../utils/toast.js'
import { useNavigate, useParams } from "react-router-dom"
import { Spinner, Alert, Row, Col, Button, Badge } from 'react-bootstrap'
import CustomerInfoCard from '../components/customers/CustomerInfoCard.jsx'
import CustomerStatsCard from '../components/customers/CustomerStatsCard.jsx'
import CustomerActions from '../components/customers/CustomerActions.jsx'
import CustomerBillHistory from '../components/customers/CustomerBillHistory.jsx'


const CustomerDetailsPage = () => {

     const [customerData, setCustomerData] = useState({
          customer: null,
          bills: [],
     })
     const [loading, setLoading] = useState(true)
     const { id } = useParams()
     const navigate = useNavigate()

     useEffect(() => {
          fetchCustomerDetails();
     }, [id])

     const fetchCustomerDetails = async () => {
          try {
               const [customerResponse, billResponse] = await Promise.all([
                    getCustomerById(id),
                    getCustomerBills(id)
               ]);

               setCustomerData({
                    customer: customerResponse.data.data,
                    bills: billResponse.data.data
               });
          } catch (error) {
               showError(error.response?.data?.message || "Unable to load customer.😕");
          } finally {
               setLoading(false)
          }
     };

     if (loading) {
          return (
               <div className='text-center mt-5'>
                    <Spinner animation='border' />
               </div>
          )
     }

     if (!customerData.customer) {
          return (
               <Alert>
                    Customer not found.
               </Alert>
          )
     }

     const handleEdit = () => {
          console.log("Edit Customer")
     }

     const handleGenerateBill = () => {
          console.log("Generate Bill")
     }

     const handleDeleteCustomer = () => {
          console.log("Delete Customer")
     }

     return (
          <>
               <Button
                    variant='secondary'
                    className='mb-3'
                    onClick={() => navigate(-1)}
               >
                    ⬅️ Back
               </Button>

               <h2 className='mb-4'>
                    Customer Profile
               </h2>

               <Row>
                    <Col lg={5}>
                         <CustomerInfoCard customer={customerData.customer} />
                    </Col>

                    <Col lg={7}>
                         <CustomerStatsCard bills={customerData.bills} />
                    </Col>
               </Row>

               <Row className='mt-3'>
                    <Col lg={8}>
                         <CustomerActions
                              onEdit={handleEdit}
                              onGenerateBill={handleGenerateBill}
                              onDelete={handleDeleteCustomer}
                         />
                    </Col>
               </Row>

               <Row>
                    <Col>
                         <CustomerBillHistory bills={customerData.bills} />
                    </Col>
               </Row>
          </>
     )
}

export default CustomerDetailsPage
