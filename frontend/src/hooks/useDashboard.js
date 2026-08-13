import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboardApi.js";
import { showError } from "../utils/toast.js";

const useDashboard = () => {
     const [dashboard, setDashboard] = useState(null)
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState(null)

     const refreshDashboard = async () => {
          try {
               const response = await getDashboard()
               setDashboard(response.data)
          } catch (error) {
               console.log(error)
               setError(error)
               showError("Unable to load dashboard");
          } finally {
               setLoading(false)
          }
     };

     useEffect(() => {
          refreshDashboard()
     }, [])

     return {
          dashboard,
          loading,
          error,
          refreshDashboard
     };
}

export default useDashboard
