import axios from "axios";
import axiosInstance from "./axiosInstance.js";

export const getBills = () => {
     return axiosInstance.get("/bills")
}

export const getCustomerBills = (customerId) => {
     return axiosInstance.get(`/bills/customer/${customerId}`)
}

export const createBill = (data) => {
     return axiosInstance.post("/bills", data)
}

export const updateBill = (id, data) => {
     return axiosInstance.put(`/bills/${id}`, data)
}

export const deleteBill = (id) => {
     return axiosInstance.delete(`/bills/${id}`)
}

