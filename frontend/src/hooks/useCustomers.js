import { useState, useEffect } from "react";
import { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from "../api/customerApi.js";
import { showError } from "../utils/toast.js";
import { data } from "react-router-dom";

// const useCustomers = () => {
const useCustomers = () => {
     const [customers, setCustomers] = useState([])
     const [loading, setLoading] = useState(false)
     const [customer, setCustomer] = useState(null)
     const [error, setError] = useState(null)

     const refreshCustomers = async () => {
          try {
               setLoading(true)
               const response = await getCustomers()
               setCustomers(response.data.data)
          } catch (error) {
               setError(error)
               // showError("Unable to load customers!")
               throw error
          } finally {
               setLoading(false)
          }
     };

     const getCustomer = async (id) => {
          try {
               setLoading(true)
               const response = await getCustomerById(id)

               setCustomer(response.data.data)

               return response.data.data;
          } catch (error) {
               setError(error)
               throw error
          } finally {
               setLoading(false)
          }
     };

     const addCustomer = async (data) => {
          const response = await createCustomer(data)

          await refreshCustomers();
          return response.data.data;
     }

     const editCustomer = async (id, data) => {
          const response = await updateCustomer(id, data);
          await getCustomer(id)
          await refreshCustomers()
          return response.data.data;
     };

     const removeCustomer = async (id) => {
          await deleteCustomer(id)
          await refreshCustomers()
     }

     // useEffect(() => {
     //      refreshCustomers()
     // }, [])

     return {
          customers,
          // customer,
          error,
          loading,
          refreshCustomers,
          // getCustomer,
          addCustomer,
          editCustomer,
          removeCustomer,
          setCustomers,
          // createCustomer,
          // updateCustomer,
          // deleteCustomer
     }
}

export default useCustomers

