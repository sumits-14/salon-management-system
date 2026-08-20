// import { use, useEffect } from "react"
import { Row, Col, Card, Spinner } from "react-bootstrap"
import formatCurrency from "../utils/formatCurrency.js"
import { useAuth } from "../context/AuthContext.jsx"
import useDashboard from "../hooks/useDashboard.js"


const DashboardPage = () => {
     
     const {
          dashboard,
          loading,
     } = useDashboard()

     const { user } = useAuth()

     if (loading) {
          return (
               <div className="text-center mt-5">
                    <Spinner
                         animation="border"
                    />
               </div>
          )
     }

     const getGreeting = () => {
          const hour = new Date().getHours()
          if(hour < 12) return 'Good Morning'
          if(hour < 17) return 'Good Afternoon'
          return 'Good Evening'
     }

     return (
          <>
               <h2 className="mb-4">Dashboard</h2>
               <h2 className="mb-2">{getGreeting()}, {" "}{user?.name}👋🏼</h2>
               <p className="text-muted mb-1">
                    {new Date().toLocaleDateString('en-IN', {
                         weekday : 'long',
                         day : 'numeric',
                         month : 'long',
                         year : 'numeric'
                    })}
               </p>
               <p className="text-muted">Role: {" "}{user?.role}</p>

               <Row className="g-3">
                    <Col xs={12} sm={6} md={3}>
                         <Card className="h-100">
                              <Card.Body>
                                   <h6>Today's Customers</h6>

                                   <h3>{dashboard?.today?.totalCustomersServed || 0}</h3>
                              </Card.Body>
                         </Card>
                    </Col>

                    <Col xs={12} sm={6} md={3}>
                         <Card>
                              <Card.Body>
                                   <h6>Today's Revenue</h6>

                                   <h3>
                                        {
                                             formatCurrency(dashboard?.today?.revenue || 0)
                                        }
                                   </h3>
                              </Card.Body>
                         </Card>
                    </Col>

                    <Col xs={12} sm={6} md={3}>
                         <Card>
                              <Card.Body>
                                   <h6>Week Revenue</h6>
                                   <h3>
                                        {
                                             formatCurrency(dashboard?.week?.revenue || 0)
                                        }
                                   </h3>
                              </Card.Body>
                         </Card>
                    </Col>

                    <Col xs={12} sm={6} md={3}>
                         <Card>
                              <Card.Body>
                                   <h6>Month Revenue</h6>
                                   <h3>
                                        {
                                             formatCurrency(dashboard?.month?.revenue || 0)
                                        }
                                   </h3>
                              </Card.Body>
                         </Card>
                    </Col>
               </Row>
          </>
     )
}

export default DashboardPage


