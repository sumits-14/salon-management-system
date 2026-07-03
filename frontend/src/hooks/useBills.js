import { useEffect, useState } from "react";
import { getCustomerBills, createBill, getBills } from "../api/billApi.js";
import { showSuccess, showError } from "../utils/toast.js";

const useBills = (customerId) => {
     const [bills, setBills] = useState([])
     const [loading, setLoading] = useState(true)

     const refreshBills = async () => {
          if(!customerId) return;

          try {
               const response = await getCustomerBills(customerId)
               setBills(response.data.data)
          } catch (error) {
               showError("Unable to load bills!")
          } finally {
               setLoading(false)
          }
     };

     useEffect(() => {
          refreshBills()
     }, [customerId])

     const generateBill = async (billData) => {
          await createBill(billData)

          showSuccess("Bill generated successfully")

          refreshBills()
     }

     return {
          bills,
          loading,
          refreshBills,
          generateBill,    
     }
}

export default useBills;