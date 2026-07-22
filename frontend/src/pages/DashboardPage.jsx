import { use, useEffect } from "react"
import { Row, Col, Card, Spinner } from "react-bootstrap"
import formatCurrency from "../utils/formatCurrency.js"
import { useAuth } from "../context/AuthContext.jsx"
import useDashboard from "../hooks/useDashboard.js"


const DashboardPage = () => {
     
     const {
          dashboard,
          loading,
          refreshDashboard,
     } = useDashboard()

     const { user } = useAuth()
     // console.log("user: ", user)
     // console.log(localStorage.getItem("user"));
     useEffect(() => {
          refreshDashboard()
     }, [])


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
               <h2>{getGreeting()}, {" "}{user?.name}👋🏼</h2>
               <p className="text-muted">
                    {new Date().toLocaleDateString('en-IN', {
                         weekday : 'long',
                         day : 'numeric',
                         month : 'long',
                         year : 'numeric'
                    })}
               </p>
               <p className="text-muted">Role: {" "}{user?.role}</p>

               <Row>
                    <Col md={3}>
                         <Card>
                              <Card.Body>
                                   <h6>Today's Customers</h6>

                                   <h3>{dashboard?.today?.customers}</h3>
                              </Card.Body>
                         </Card>
                    </Col>

                    <Col md={3}>
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

                    <Col md={3}>
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

                    <Col>
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


