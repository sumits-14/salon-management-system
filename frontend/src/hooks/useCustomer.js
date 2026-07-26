import { useEffect, useState } from "react";
import { getCustomerById, updateCustomer } from "../api/customerApi.js";

const useCustomer = (customerId) => {
     const [customer, setCustomer] = useState(null)
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState(null)

     const refreshCustomer = async () => {
          if(!customerId) return;

          try {
               setLoading(true)
               const response = await getCustomerById(customerId)
               setCustomer(response.data.data)
          } catch (error) {
               setError(error)
               throw error;
          } finally {
               setLoading(false)
          }
     };

     const editCustomer = async (data) => {
          const response = await updateCustomer(customerId, data);
          await refreshCustomer();
          return response.data.data;
     }

     useEffect(() => {
          refreshCustomer();
     }, [customerId]);

     return {
          customer,
          loading,
          error,
          refreshCustomer,
          editCustomer,
     };
};

export default useCustomer;

