import { useState, useEffect, useMemo } from "react";
import { Row, Col, Button, Spinner } from 'react-bootstrap'
import useServices from "../hooks/useServices";
import ServiceSearch from "../components/services/ServiceSearch.jsx";
import ServiceForm from "../components/services/ServiceForm.jsx";
import ServiceTable from "../components/services/ServiceTable.jsx";
import { useNavigate } from "react-router-dom";
import { showError } from "../utils/toast.js";

const ServicesPage = () => {
     // const {
     //      services,
     //      loading,
     //      refreshServices
     // } = useServices()

     const hook = useServices()
     const {
          services,
          loading,
          addService,
          editService,
          refreshServices,
          removeService,
     } = hook

     const [search, setSearch] = useState("")
     const [showModal, setShowModal] = useState(false)
     const [selectedService, setSelectedService] = useState(null)
     const navigate = useNavigate()

     // useEffect(() => {
     //      refreshServices()
     // }, [])

     const filteredServices = useMemo(() => {
          const searchText = search.trim().toLowerCase();

          // return services.filter((service) =>
          //      service.serviceName.toLowerCase().includes(searchText)
          // );

          return (services || []).filter((service) => 
               service.serviceName.toLowerCase().includes(searchText)
          )
     }, [services, search])

     if (loading) {
          return (
               <div className="text-center mt-5">
                    <Spinner animation="border" />
               </div>
          )
     }

     // const handleViewService = (service) => {
     //      navigate(`/services/${service._id}`)
     // }

     const handleSaveService = async (serviceData) => {
          try {
               console.log("Selected Service:", selectedService);
               console.log("Service Data:", serviceData);
               if(selectedService) {
                    // console.log('Editing.....')
                    await editService(
                         selectedService._id,
                         serviceData
                    );
               } else {
                    // console.log('Escaping...')
                    await addService(serviceData)
               }
               setSelectedService(null)
               setShowModal(false)
          } catch (error) {
               console.log(error)
               showError(`Only Admin can add service!
                    Please ask admin to add service...`)
          }
     };

     const handleEditService = (service) => {
          setSelectedService(service)
          setShowModal(true)
     }

     const handleDeleteService = async (id) => {
          if(!window.confirm("Delete this service?")) {
               return
          }
          await removeService(id)
     }

     return (
          <>
               <Row className="mb-3">
                    <Col>
                         <h2>Services</h2>
                    </Col>

                    <Col className="text-end">
                         <Button onClick={() => setShowModal(true)}>
                              Add Service
                         </Button>
                    </Col>
               </Row>

               <ServiceSearch
                    search={search}
                    setSearch={setSearch}
               />

               <ServiceTable
                    services={filteredServices}
                    // onEdit={(service) => {
                    //      setSelectedService(service)
                    //      setShowModal(true)
                    // }}
                    // onView={handleViewService}
                    onEdit={handleEditService}
                    onDelete={handleDeleteService}
                    
               />

               <ServiceForm
                    show={showModal}
                    handleClose={() =>{ 
                         setShowModal(false);
                         setSelectedService(null)}
                    }
                    handleSave={handleSaveService}
                    service={selectedService}
               />

          </>
     )

}

export default ServicesPage

