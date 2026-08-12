import { useEffect, useState } from "react";
import { getBills, getBillById } from "../api/billingHistoryApi";
import {showError} from '../utils/toast.js';

const useBillingHistory = () => {
     const [bills, setBills] = useState([]);
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState(null)
     const [filters, setFilters] = useState({
          search : '',
          worker : '',
          paymentMethod : '',
          from : '',
          to : '',
     })
     const [selectedBill, setSelectedBill] = useState(null)
     const [billLoading, setBillLoading] = useState(false)

     // Fetch Bills
     const refreshBills = async (customFilters = filters) => {
          try {
               setLoading(true);
               setError(null)
               const response = await getBills(customFilters);
               setBills(response.data.data);
          } catch (error) {
               console.error(error);
               setError(error);
               showError(
                    error.response?.data?.message || "Unable to load billing history!"
               );
          } finally {
               setLoading(false);
          }
     };

     // Load single bill
     const fetchBillDetails = async (id) => {
          try {
               setBillLoading(true)
               const response = await getBillById(id);
               setSelectedBill(response.data.data);
          } catch (error) {
               console.error(error);
               showError(
                    error.response?.data?.message || "Unable to load bill details!"
               );
          } finally {
               setBillLoading(false);
          }
     };

     // Initial load
     useEffect(() => {
          refreshBills()
     },[]);

     return {
          bills,
          loading,
          error,

          filters,
          setFilters,

          refreshBills,

          selectedBill,
          setSelectedBill,

          fetchBillDetails,
          billLoading,
     };
}

export default useBillingHistory;
