import { useEffect, useState } from "react";
import { getStaff, createStaff, updateStaff, toggleStaffStatus } from "../api/staffApi.js";
import { showError, showSuccess } from "../utils/toast.js";

const useStaff = () =>  {
  
     const [staff, setStaff] = useState([])
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState(null)

     const refreshStaff = async () => {
          try {
               setLoading(true);

               const response = await getStaff();

               setStaff(response.data.data);

               setError(null);

          } catch (error) {
               console.error(error);
               setError(error);
               showError("Unable to load staff!");
          } finally {
               setLoading(false)
          }
     }

     useEffect(() => {
          refreshStaff();
     }, [])

     const addStaff = async (staffData) => {
          try {
               await createStaff(staffData);
               showSuccess("Staff added successfully.");
               await refreshStaff();
          } catch (error) {
               console.log(error);
               showError(error.response?.data?.message || "Unable to add staff!");
               throw error;
          };
     }

     const editStaff = async (id, staffData) => {
          try {
               await updateStaff(id, staffData);
               showSuccess("Staff updated successfully.");
               await refreshStaff();
          } catch (error) {
               console.error(error);
               showError(error.response?.data?.message || "Failed to update staff!");
               throw error;
          };
     };

     const changeStaffStatus = async (id, active) => {
          try {
               await toggleStaffStatus(id, active);
               showSuccess(active ? "Staff activated" : "Staff deactivated");
               await refreshStaff();
          } catch (error) {
               console.error(error);
               showError(error.response?.data?.message || "Unable to update staff!");
          };
     };

     return {
          staff,
          loading,
          error,
          refreshStaff,
          addStaff,
          editStaff,
          changeStaffStatus,
     };
};

export default useStaff;
