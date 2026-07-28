import axiosInstance from "./axiosInstance.js";

export const getStaff = () => axiosInstance.get("/staff");

export const createStaff = (data) => axiosInstance.post("/staff", data);

export const updateStaff = (id, data) => axiosInstance.put(`/staff/${id}`, data)

export const toggleStaffStatus = (id, active) => axiosInstance.patch(`/staff/${id}/status`, { active, })
