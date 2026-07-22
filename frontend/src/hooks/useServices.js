import { useState, useEffect } from "react";
import { getServices, createService, updateService, deleteService } from "../api/serviceApi";
import { showError, showSuccess } from "../utils/toast.js";

const useServices = () => {
     const [services, setServices] = useState([])
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState(null)

     const refreshServices = async () => {
          try {
               const response = await getServices();
               setServices(response.data)
          } catch (error) {
               setError(error)
               showError("Unable to load services!");
          } finally {
               setLoading(false)
          }
     };

     useEffect(() => {
          refreshServices()
     }, [])

     const addService = async (data) => {
          await createService(data);
          showSuccess("Service added successfully!");
          refreshServices()
     }

     const editService = async (id, data) => {
          await updateService(id, data)
          await refreshServices()
          showSuccess("Service updated successfully!")
     };

     const removeService = async (id) => {
          try {
               await deleteService(id)
               showSuccess("Service removed successfully!")
               await refreshServices()
          } catch (error) {
               showError("Unable to delete service!")
          }
     };

     // console.log("Hook returning:", services);

     return {
          services,
          loading,
          error,
          refreshServices,
          addService,
          editService,
          removeService,
     }
}

export default useServices