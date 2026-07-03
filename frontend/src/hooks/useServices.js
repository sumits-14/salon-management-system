import { useState, useEffect } from "react";
import { getServices, createService, updateService, deleteService } from "../api/serviceApi";
import { showError, showSuccess } from "../utils/toast.js";

const useServices = () => {
     const [services, setServices] = useState([])
     const [loading, setLoading] = useState(true)

     const refreshServices = async () => {
          try {
               const response = await getServices();
               setServices(response.data.data)
          } catch (error) {
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
          showSuccess("Service updated successfully!")
          refreshServices()
     };

     const removeService = async (id) => {
          await deleteService(id)
          showSuccess("Service removed successfully!")
          refreshServices()
     };

     return {
          services,
          loading,
          refreshServices,
          addService,
          editService,
          removeService,
     }
}

export default useServices