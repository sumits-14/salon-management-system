import axiosInstance from "./axiosInstance.js";

export const getWorkerDashboard = () => {
     return axiosInstance.get(
          "/dashboard/worker"
     )
}



