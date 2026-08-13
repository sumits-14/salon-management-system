import axiosInstance from "./axiosInstance.js";

export const getDashboard = () => {
     return axiosInstance.get(
          "/dashboard"
     );
}