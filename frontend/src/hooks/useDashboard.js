import { useEffect, useState } from "react";
import { getWorkerDashboard } from "../api/dashboardApi.js";
import { showError } from "../utils/toast.js";

const useDashboard = () => {
     const [dashboard, setDashboard] = useState(null)
     const [loading, setLoading] = useState(true)

     const refreshDashboard = async () => {
          try {
               const response = await getWorkerDashboard()
               setDashboard(response.data)
          } catch (error) {
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
          refreshDashboard
     };
}

export default useDashboard
