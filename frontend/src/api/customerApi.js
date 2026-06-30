import axiosInstance from "./axiosInstance.js";

export const getCustomers = () => {
     return axiosInstance.get("/customers")
}

export const getCustomerById = (id) => {
     return axiosInstance.get(`/customers?${id}`)
}

export const createCustomer = (data) => {
     return axiosInstance.post("/customers", data)
}

export const updateCustomer = (id, data) => {
     return axiosInstance.put(`/customers/${id}`, data)
}
     
export const deleteCustomer = (id) => {
     return axiosInstance.delete(`/customers/${id}`)
}


