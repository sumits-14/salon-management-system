import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { Spinner, Alert, Row, Col, Button, } from 'react-bootstrap'
import { showError, showSuccess } from '../utils/toast.js'
import { useCustomer, useCustomers, useBills} from '../hooks'
import CustomerInfoCard from '../components/customers/CustomerInfoCard.jsx'
import CustomerStatsCard from '../components/customers/CustomerStatsCard.jsx'
import CustomerActions from '../components/customers/CustomerActions.jsx'
import CustomerBillHistory from '../components/customers/CustomerBillHistory.jsx'
import CustomerForm from '../components/customers/CustomerForm.jsx'

// import { getCustomerById, getCustomers } from '../api/customerApi.js'
// import { getCustomerBills } from '../api/billApi'
// import useCustomers from '../hooks/useCustomers.js'
// import useBills from '../hooks/useBills.js'
// import useCustomer from '../hooks/useCustomer.js'


const CustomerDetailsPage = () => {
     const [showEditModal, setShowEditModal] = useState(false)
     const { id } = useParams()
     const navigate = useNavigate()
     const {
          removeCustomer,
     } = useCustomers()
     const {
          customer,
          loading : customerLoading,
          editCustomer,
     } = useCustomer(id)
     const {
          bills,
          loading : billsLoading,
     } = useBills(id)

     if(customerLoading || billsLoading) {
          return (
               <div className='taxt-center mt-5'>
                    <Spinner animation='border'/>
               </div>
          );
     }

     if (customerLoading) {
          return (
               <div className='text-center mt-5'>
                    <Spinner animation='border' />
               </div>
          )
     }

     if (!customer) {
          return (
               <Alert>
                    Customer not found.
               </Alert>
          )
     }

     const handleGenerateBill = () => {
          console.log("Customer", customer)
          navigate(`/customers/${customer._id}/create-bill`);
     }

     const handleDeleteCustomer = async () => {
          const confirmed = window.confirm("Deactivate this customer?");

          if(!confirmed) return;

          try {
               await removeCustomer(customer._id)
               showSuccess("Customer deleted successfully!")

               navigate("/customers/");
               // navigate(`/customers/${customer._id}/create-bill`);
          } catch (error) {
               showError(error.response?.data?.message || "Unable to delete customer");
          }
     };

     const handleCloseEdit = () => {
          setShowEditModal(false)
     }

     const handleUpdateCustomer = async (customerData) => {
          try {
               await editCustomer(customerData);

               showSuccess("Customer updated successfully!")
               setShowEditModal(false);
               // fetchCustomerDetails()
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
                         <CustomerInfoCard customer={customer} />
                    </Col>

                    <Col lg={7}>
                         <CustomerStatsCard bills={bills} />
                    </Col>
               </Row>

               <Row className='mt-3'>
                    <Col lg={8}>
                         <CustomerActions
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
                    handleClose={handleCloseEdit}
                    handleSave={handleUpdateCustomer}
                    customer={customer}
               />
          </>
     )
}

export default CustomerDetailsPage
