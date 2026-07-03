import { useEffect, useState, useMemo } from "react"
import { Row, Col, Button, Spinner } from "react-bootstrap"
// import {createCustomer, getCustomers, updateCustomer, deleteCustomer } from "../api/customerApi.js"
import CustomerSearch from "../components/customers/CustomerSearch.jsx"
import CustomerTable from "../components/customers/CustomerTable.jsx"
import CustomerForm from "../components/customers/CustomerForm.jsx"
// import { createCustomer, updateCustomer } from "../api/customerApi.js"
import { showSuccess, showError } from "../utils/toast.js"
// import formatCurrency from "../utils/formatCurrency.js"
import useCustomers from "../hooks/useCustomers.js"


const CustomersPage = () => {

     // const [customers, setCustomers] = useState([])
     const {   
               customers, 
               loading, 
               refreshCustomers, 
               createCustomer, 
               updateCustomer, 
               deleteCustomer
          } = useCustomers()
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

     // useEffect(() => {
     //      fetchCustomers();
     // }, []);

     // const fetchCustomers = async () => {
     //      try {
     //           const response = await getCustomers();

     //           setCustomers(response.data.data)
     //      } catch (error) {
     //           showError(
     //                "Unable to load customers"
     //           )
     //      }
     // }

     const handleSaveCustomer = async(customerData) => {
          try {
               // await createCustomer(customerData)
               // showSuccess("Customer added successfully")
               // setShowModal(false)
               if(selectedCustomer) {
                    await updateCustomer(selectedCustomer._id, customerData);

                    showSuccess("Customer updated successfully ✅")
               } else{
                    await createCustomer(customerData)

                    showSuccess("Customer added successfully 🎉")
               }

               handleCloseModal()
               // fetchCustomers()
               refreshCustomers()

          } catch (error) {
               showError(
                    error.response?.data?.message || "Unable to add customer ❌"
               )
          }
     }

     if(loading) {
          return <Spinner />
     }

     const handleEditCustomer = (customer) => {
          setSelectedCustomer(customer)
          setShowModal(true)
     }

     const handleCloseModal = () => {
          setShowModal(false)
          setSelectedCustomer(null)
     }

     return (
          <>
               <Row className="mb-3">
                    <Col>
                         <h2>
                              Customers
                         </h2>
                    </Col>

                    <Col className="text-end">
                         <Button onClick={() => setShowModal(true)}>
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
               />

               <CustomerForm 
                    show={showModal}
                    handleClose={handleCloseModal}
                    onSubmitCustomer={handleSaveCustomer}
                    customer={selectedCustomer}
               />
          </>
     )
}

export default CustomersPage

