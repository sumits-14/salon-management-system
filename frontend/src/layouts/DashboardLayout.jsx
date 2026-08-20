import {useState} from 'react'
import { Container, Row, Col, Button, Offcanvas } from 'react-bootstrap'
import Sidebar from '../components/common/Sidebar.jsx'


const DashboardLayout = ({ children }) => {

     const [showSidebar, setShowSidebar] = useState(false)

     const handleCloseSidebar = () => {
          setShowSidebar(false);
     };

     const handleShowSidebar = () => {
          setShowSidebar(true)
     }

  return (
    <Container fluid className='p-0'>
          <Row className='g-0'>
               <Col md={2} className='bg-dark min-vh-100 p-0 d-none d-md-block'>
                    <Sidebar />
               </Col>

               {/* ================= Mobile Content  =================== */}

               <Col xs={12} md={10}>
                    <div className='d-md-none bg-dark text-white p-3 d-flex align-items-center'>
                         <Button
                              variant='outline-light'
                              className='me-3'
                              onClick={handleShowSidebar}
                         >
                              ::
                         </Button>
                         <h5 className='mb-0'>
                              Salon Management
                         </h5>
                    </div>

                    {/* ===== Page Content ====== */}
                    <div className='p-3 p-md-4'>
                         {children}
                    </div>
               </Col>

               {/* <Col md={10} className='p-4'>
                    {children}
               </Col> */}
          </Row>

          {/* ============= Mobile Sidebar ============ */}
          <Offcanvas
               show={showSidebar}
               onHide={handleCloseSidebar}
               className="bg-dark text-white"
          >
               <Offcanvas.Header closeButton closeVariant='white'>
                    <Offcanvas.Title>
                         Salon Management
                    </Offcanvas.Title>
               </Offcanvas.Header>

               <Offcanvas.Body className='p-0'>
                    <Sidebar onNavigate={handleCloseSidebar} />
               </Offcanvas.Body>
          </Offcanvas>
    </Container>
  )
}

export default DashboardLayout
