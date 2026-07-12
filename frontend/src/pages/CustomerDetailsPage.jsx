import { useState, useEffect } from 'react'
import { getCustomerById, getCustomers } from '../api/customerApi.js'
import { getCustomerBills } from '../api/billApi'
import { showError, showSuccess } from '../utils/toast.js'
import { useNavigate, useParams } from "react-router-dom"
import { Spinner, Alert, Row, Col, Button, Badge } from 'react-bootstrap'
import CustomerInfoCard from '../components/customers/CustomerInfoCard.jsx'
import CustomerStatsCard from '../components/customers/CustomerStatsCard.jsx'
import CustomerActions from '../components/customers/CustomerActions.jsx'
import CustomerBillHistory from '../components/customers/CustomerBillHistory.jsx'
import CustomerForm from '../components/customers/CustomerForm.jsx'
import { updateCustomer, deleteCustomer } from '../api/customerApi.js'
import useCustomers from '../hooks/useCustomers.js'
import useBills from '../hooks/useBills.js'


const CustomerDetailsPage = () => {

     const [customerData, setCustomerData] = useState({
          // customer: null,
          bills: [],
     })
     // const [loading, setLoading] = useState(true)
     const [showEditModal, setShowEditModal] = useState(false)
     const { id } = useParams()
     const navigate = useNavigate()
     const {
          customers,
          customer,
          getCustomer,
          addCustomer,
          refreshCustomers,
          createCustomer,
          editCustomer,
          removeCustomer,
          loading : customerLoading,
     } = useCustomers()
     const {
          bills,
          loading : billsLoading,
          refreshBills
     } = useBills(id)

     useEffect(() => {
          // fetchCustomerDetails();
          getCustomer(id).catch(() => {
               showError("Unable to load customer.")
          })
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

     if(customerLoading || billsLoading) {
          return (
               <div className='taxt-center mt-5'>
                    <Spinner animation='border'/>
               </div>
          );
     }

     if (loading) {
          return (
               <div className='text-center mt-5'>
                    <Spinner animation='border' />
               </div>
          )
     }

     // if (!customerData.customer) {
     if (!customer) {
          return (
               <Alert>
                    Customer not found.
               </Alert>
          )
     }

     const handleEdit = () => {
          // console.log("Edit Customer")
          setShowEditModal(true)
     }

     const handleGenerateBill = () => {
          // console.log("Generate Bill")
          navigate("/bills/create", {
               state : {
                    customerId : customer._id
               }
          })
     }

     const handleDeleteCustomer = async () => {
          // console.log("Delete Customer")
          const confirmed = window.confirm("Deactivate this customer?");

          if(!confirmed) return;

          try {
               // await deleteCustomer(customer._id)
               await removeCustomer(customer._id)
               showSuccess("Customer deleted successfully!")

               navigate("/customers");
          } catch (error) {
               showError(error.response?.message || "Unable to delete customer");
          }
     };

     const handleCloseEdit = () => {
          setShowEditModal(false)
     }

     const handleUpdateCustomer = async (customerData) => {
          try {
               // await updateCustomer(customer._id, customerData);
               await editCustomer(customer._id, customerData);

               showSuccess("Customer updated successfully!")
               setShowEditModal(false);
               fetchCustomerDetails()
          } catch (error) {
               showError(error.response?.data?.message || "Unable to update customer")
          }
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
                         {/* <CustomerInfoCard customer={customerData.customer} /> */}
                         <CustomerInfoCard customer={customer} />
                    </Col>

                    <Col lg={7}>
                         <CustomerStatsCard bills={bills} />
                    </Col>
               </Row>

               <Row className='mt-3'>
                    <Col lg={8}>
                         <CustomerActions
                              // onEdit={handleEdit}
                              onEdit={() => setShowEditModal(true)}
                              onGenerateBill={handleGenerateBill}
                              onDelete={handleDeleteCustomer}
                         />
                    </Col>
               </Row>

               <Row>
                    <Col>
                         <CustomerBillHistory bills={bills} />
                    </Col>
               </Row>

               <CustomerForm 
                    show={showEditModal}
                    // handleClose={handleCloseEdit}
                    handleClose={() => setShowEditModal(false)}
                    handleSave={handleUpdateCustomer}
                    // customer={customerData.customer}
                    customer={customer}
               />
          </>
     )
}

export default CustomerDetailsPage
