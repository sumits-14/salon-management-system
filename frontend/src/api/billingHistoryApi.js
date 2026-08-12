import axiosInstance from "./axiosInstance.js"

// Get all APIs with optional filter
export const getBills = (params = {}) => {
     return axiosInstance.get("/bills", {
          params,
     });
}

// Get single bill by ID
export const getBillById = (id) => {
     return axiosInstance.get(`/bills/${id}`);
}
