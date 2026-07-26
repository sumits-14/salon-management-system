import { useState, useEffect } from "react";
import { getCustomerById } from "../api/customerApi.js";
import { getServices } from "../api/serviceApi.js";
import {showError} from "../utils/toast.js"

const useBillCreation = (customerId) => {
     // console.log("useBillCreation Hook Running");
     // console.log("Customer ID:", customerId);
     const [customer, setCustomer] = useState(null);
     const [services, setServices] = useState([]);
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState(null)
     const [selectedServices, setSelectedServices] = useState([]);

     const refreshData = async () => {
          try {
               setLoading(true)
               
               // console.log('Just Data -', getCustomerById)
               const [customerResponse, servicesResponse] = await Promise.all([
                    getCustomerById(customerId),
                    getServices()
               ])
               // console.log(customerResponse);
               
               setCustomer(customerResponse.data.data)
               // console.log('Just Data -',customerResponse.data)
               // console.log('Data Ka Data -',customerResponse.data.data)

               const activeServices = servicesResponse.data.filter(
                    (service) => service.active
               );
               setServices(activeServices)
               
          } catch (error) {
               console.error(error)
               setError(error)
               showError("Unable to load bill!")
          } finally {
               setLoading(false)
          }
     }

     const handleServiceToggle = (service) => {
          const alreadySelected = selectedServices.some(
               (selectedService) => selectedService._id === service._id
          );

          if(alreadySelected) {
               setSelectedServices(
                    selectedServices.filter(
                         (selectedService) => 
                              selectedService._id !== service._id
                    )
               )
          } else {
               setSelectedServices([
                    ...selectedServices, service
               ])
          }
     }

     useEffect(() => {

          // console.log("Inside useEffect")

          refreshData()
          // if(customerId) {
          //      // console.log("Calling refreshdata")
          // }else {
          //      console.log('Id Missing')
          // }
     }, [customerId])

     return {
          customer,
          services,
          selectedServices,
          handleServiceToggle,
          loading,
          error,
          refreshData,
     };
};

export default useBillCreation;
