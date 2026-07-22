import { useState } from "react"
import { Form, Button, Card, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../api/authApi.js"
import { useAuth } from "../context/AuthContext.jsx"
// import { toast } from "react-toastify"
import { showSuccess, showError } from "../utils/toast.js"

const LoginPage = () => {

     const [username, setUsername ] = useState("")
     const [password, setPassword] = useState("")

     const navigate = useNavigate()
     const { login } = useAuth()

     const handleSubmit = async (e) => {
          e.preventDefault()

          try {
               const response = await loginUser({ username, password });
               const loggedInUser = response.data.user

               login(
                    loggedInUser,
                    response.data.token
               );

               showSuccess(`Welcome ${loggedInUser.name}`)

               navigate('/dashboard')

          } catch (error) {
               showError("Login Failed")
          }
     }

  return (
     <Container
          className="d-flex justify-content-center align-items-center vh-100"
     >
          <Card 
               style={{width : '400px'}}
          >
               <Card.Body>
                    <h3 className="text-center mb-4">
                         Salon Managment System
                    </h3>

                    <Form onSubmit={handleSubmit}>
                         <Form.Group className="mb-3">
                              <Form.Label>
                                   Username
                              </Form.Label>

                              <Form.Control
                                   type="text"
                                   value={username}
                                   onChange={(e) => setUsername(e.target.value)}
                              />
                         </Form.Group>

                         <Form.Group className="mb-3">
                              <Form.Label>
                                   Password
                              </Form.Label>

                              <Form.Control 
                                   type="password"
                                   value={password}
                                   onChange={e => setPassword(e.target.value)}
                              />
                         </Form.Group>

                         <Button className="w-100" type="submit">
                              Login
                         </Button>
                    </Form>
               </Card.Body>
          </Card>
     </Container>
  )
}

export default LoginPage




