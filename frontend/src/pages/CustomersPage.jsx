import { useEffect, useState, useMemo } from "react"
import { Row, Col, Button, Spinner } from "react-bootstrap"
import CustomerSearch from "../components/customers/CustomerSearch.jsx"
import CustomerTable from "../components/customers/CustomerTable.jsx"
import CustomerForm from "../components/customers/CustomerForm.jsx"
import { showSuccess, showError } from "../utils/toast.js"
// import useCustomers from "../hooks/useCustomers.js"
import {useCustomer, useCustomers} from "../hooks"


const CustomersPage = () => {

     const {   
          customers, 
          loading, 
          refreshCustomers, 
          addCustomer,
          editCustomer, 
          removeCustomer,
          } = useCustomers()

     const {
          customer,
          loading : customerLoading,
          // editCustomer,
     } = useCustomer()
     const [search, setSearch] = useState('')
     const [showModal, setShowModal] = useState(false)
     const [selectedCustomer, setSelectedCustomer] = useState(null)

     const filteredCustomers = useMemo(() => {

          const searchText = search.trim().toLowerCase()

          return customers.filter((customer) => {
               return (
                    customer.customerName.toLowerCase().includes(searchText) || customer.mobileNumber.includes(search)
               )
          })
     }, [customers, search])

     useEffect(() => {
          refreshCustomers()
     }, []);

     const handleSaveCustomer = async(customerData) => {
          try {
               if(selectedCustomer) {
                    await editCustomer(selectedCustomer._id, customerData);

                    showSuccess("Customer updated successfully ✅")
               } else{
                    await addCustomer(customerData)

                    showSuccess("Customer added successfully 🎉")
               }

               handleCloseModal()
               // refreshCustomers()

          } catch (error) {
               showError(
                    error.response?.data?.message || "Unable to add customer ❌"
               )
          }
     }

     if(loading) {  
          return (
               <div className="text-center mt-5">
                    <Spinner animation="border"/>
               </div>
          )
     }

     const handleAddCustomer = () => {
          setSelectedCustomer(null);
          setShowModal(true)
     }

     const handleEditCustomer = (customer) => {
          setSelectedCustomer(customer)
          setShowModal(true)
     }

     const handleCloseModal = () => {
          setShowModal(false)
          setSelectedCustomer(null)
     }

     const handleDeleteCustomer = async () => {
          const confirmed = window.confirm("Deactivate this customer?");

          if(!confirmed) return;
          
          try {
               await removeCustomer(customer._id)
               showSuccess("Customer deleted successfully!")

               // navigate("/customers/");
               // navigate(`/customers/${customer._id}/create-bill`);
          } catch (error) {
               showError(error.response?.data?.message || "Unable to delete customer");
          }
     };

     return (
          <>
               <Row className="mb-3">
                    <Col>
                         <h2>
                              Customers
                         </h2>
                    </Col>

                    <Col className="text-end">
                         {/* <Button onClick={() => setShowModal(true)}> */}
                         <Button onClick={handleAddCustomer}>
                              Add Customer
                         </Button>
                    </Col>
               </Row>

               <CustomerSearch
                    search={search}
                    setSearch={setSearch}
               />

               <CustomerTable
                    customers={filteredCustomers}
                    onEdit={handleEditCustomer}
                    onDelete={handleDeleteCustomer}
               />

               <CustomerForm 
                    show={showModal}
                    handleClose={handleCloseModal}
                    handleSave={handleSaveCustomer}
                    customer={selectedCustomer}
               />
          </>
     )
}

export default CustomersPage

