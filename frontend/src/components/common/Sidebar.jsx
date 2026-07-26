import React from 'react'
import { Nav, Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { showSuccess } from '../../utils/toast.js'

const Sidebar = () => {

     const navigate = useNavigate()

     const { user, logout } = useAuth()

     const handleLogout = () => {
          logout();
          showSuccess("Logged out successfully!")
          navigate('/login')
     }

  return (
    <div className='p-3 text-white'>
          <h4 className='mb-4'>
               Salon Management
          </h4>

          <div className='mb-4'>
               <strong>
                    {user?.name}
               </strong>

               <br />

               <small>
                    {user?.role}
               </small>
          </div>

          <Nav className='flex-column'>
               <NavLink 
                    to = "/dashboard"
                    className = {({isActive}) => `nav-link ${
                         isActive ? 'bg-primary text-white rounded' : 'text-white'
                    }`}     
               >
                    Dashboard
               </NavLink>

               <NavLink
                    to = "/customers"
                    className = {({isActive}) => `nav-link ${
                         isActive ? 'bg-primary text-white rounded' : 'text-white'
                    }`}
               >
                    Customers
               </NavLink>

               <NavLink
                    to = "/services"
                    className = {({isActive}) => `nav-link ${
                         isActive ? 'bg-primary text-white rounded' : 'text-white'
                    }`}
               >
                    Services
               </NavLink>

               <NavLink
                    to = "/customers/${customer._id}/create-bill"
                    className = {({isActive}) => `nav-link ${
                         isActive ? 'bg-primary text-white rounded' : 'text-white'
                    }`}
               >
                    Create Bill
               </NavLink>

               <NavLink
                    to = "/bills/history"
                    className = {({isActive}) => `nav-link ${
                         isActive ? 'bg-primary text-white rounded' : 'text-white'
                    }`}
               >
                    Billing History
               </NavLink>
          </Nav>

          <Button
               variant='danger'
               className='mt-4 w-100'
               onClick={handleLogout}
          >
               Logout
          </Button>
    </div>
  )
}

export default Sidebar
