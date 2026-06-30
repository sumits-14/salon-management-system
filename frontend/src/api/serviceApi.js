import axios from "axios";
import axiosInstance from "./axiosInstance.js";

export const getServices = () => {
     return axiosInstance.get('/services')
}

export const createService = (data) => {
     return axiosInstance.post('/services', data)
}

export const updateService = (id, data) => {
     return axiosInstance.put(`/services/${id}`, data)
}

export const deleteService = (id) => {
     return axiosInstance.delete(`/services/${id}`)
}

