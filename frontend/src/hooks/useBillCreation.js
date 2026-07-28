import { useState, useEffect } from "react";
import { getCustomerById } from "../api/customerApi.js";
import { getServices } from "../api/serviceApi.js";
// import {showError} from "../utils/toast.js";
import { createBill } from "../api/billApi.js";
import { showSuccess, showError } from "../utils/toast.js";

const useBillCreation = (customerId) => {
     const [customer, setCustomer] = useState(null);
     const [services, setServices] = useState([]);
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState(null)
     const [selectedServices, setSelectedServices] = useState([]);
     const [paymentMethod, setPaymentMethod] = useState("Cash")

     const refreshData = async () => {
          try {
               setLoading(true)

               const [customerResponse, servicesResponse] = await Promise.all([
                    getCustomerById(customerId),
                    getServices()
               ])
              
               setCustomer(customerResponse.data.data)

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

     const submitBill = async () => {
          
          if(selectedServices.length === 0) {
               showError("Please select atleast one service!");
               return false
          }
          
          try {
               const billData = {
                    customerId,
                    // services : selectedServices.map(service => service._id),
                    serviceIds : selectedServices.map(service => service._id),
                    paymentMethod,
               };

               // console.log("Bill payload:", billData)

               await createBill(billData);

               showSuccess("Bill created successfully!")

               return true;

          } catch (error) {
               console.error(error);
               showError(error.response?.data?.message || "Unable to create Bill!");
               return false;
          }
     }

     useEffect(() => {
          refreshData()
     }, [customerId])

     return {
          customer,
          services,
          selectedServices,
          handleServiceToggle,
          paymentMethod,
          setPaymentMethod,
          submitBill,
          loading,
          error,
          refreshData,
     };
};

export default useBillCreation;
