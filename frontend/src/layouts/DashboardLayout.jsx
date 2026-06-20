import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../components/common/Sidebar.jsx'


const DashboardLayout = ({ children }) => {
  return (
    <Container fluid>
          <Row>
               <Col md={2} className='bg-dark min-vh-100 p-0'>
                    <Sidebar />
               </Col>

               <Col md={10} className='p-4'>
                    {children}
               </Col>
          </Row>
    </Container>
  )
}

export default DashboardLayout
