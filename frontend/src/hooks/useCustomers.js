import { useState, useEffect } from "react";
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from "../api/customerApi.js";
import { showError } from "../utils/toast.js";

const useCustomers = () => {
     const [customers, setCustomers] = useState([])
     const [loading, setLoading] = useState(true)

     const fetchCustomers = async () => {
          try{
               const response = await getCustomers()
               setCustomers(response.data.data)
          } catch(error) {
               showError("Unable to load customers!")
          } finally{
               setLoading(false)
          }
     };

     useEffect(() => {
          fetchCustomers()
     }, [])

     return{
          customers,
          loading,
          refreshCustomers : fetchCustomers,
          setCustomers,
          createCustomer,
          updateCustomer,
          deleteCustomer
     }
}

export default useCustomers

