import axiosInstance from "./axiosInstance.js";

export const loginUser = ( credentials ) => {
     return axiosInstance.post(
          "/auth/login",
          credentials
     );
};

export const getCurrentUser = () => {
     return axiosInstance.get(
          "/auth/me"
     )
}

