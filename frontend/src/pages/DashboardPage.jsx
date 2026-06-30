import { useEffect, useState } from "react"
import { Row, Col, Card, Spinner } from "react-bootstrap"
import { getWorkerDashboard } from "../api/dashboardApi.js"
import formatCurrency from "../utils/formatCurrency.js"
import { showError } from "../utils/toast.js"
import { useAuth } from "../context/AuthContext.jsx"

const DashboardPage = () => {
     const [dashboardData, setDashboardData] = useState(null)
     const [loading, setLoading] = useState(true)
     const { user } = useAuth()

     useEffect(() => {
          fetchDashboard()
     }, [])

     const fetchDashboard = async () => {
          try {
               const response = await getWorkerDashboard()

               setDashboardData(
                    response.data
               )
          } catch (error) {
               showError('Failed to lead dashboard!')
          } finally {
               setLoading(false)
          }
     };

     if (loading) {
          return (
               <div className="text-center mt-5">
                    <Spinner
                         animation="border"
                    />
               </div>
          )
     }

     return (
          <>
               <h2 className="mb-4">Dashboard</h2>
               <h2>Welcome, {" "}{user?.name}</h2>
               <p>Role: {" "}{user?.role}</p>

               <Row>
                    <Col md={3}>
                         <Card>
                              <Card.Body>
                                   <h6>Today's Customers</h6>

                                   <h3>{dashboardData?.today?.customers}</h3>
                              </Card.Body>
                         </Card>
                    </Col>

                    <Col md={3}>
                         <Card>
                              <Card.Body>
                                   <h6>Today's Revenue</h6>

                                   <h3>
                                        {
                                             formatCurrency(dashboardData?.today?.revenue || 0)
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
                                             formatCurrency(dashboardData?.week?.revenue || 0)
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
                                             formatCurrency(dashboardData?.month?.revenue || 0)
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


