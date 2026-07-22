import { useEffect, useState } from "react";
import { getWorkerDashboard } from "../api/dashboardApi.js";
import { showError } from "../utils/toast.js";

const useDashboard = () => {
     const [dashboard, setDashboard] = useState(null)
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState(null)

     const refreshDashboard = async () => {
          try {
               const response = await getWorkerDashboard()
               setDashboard(response.data)
          } catch (error) {
               setError(null)
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
