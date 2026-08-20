import React from 'react'
import { Nav, Button } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { showSuccess } from '../../utils/toast.js'
import { useTheme } from '../../context/ThemeContext.jsx'

const Sidebar = ({onNavigate}) => {

     const navigate = useNavigate()

     const { user, logout } = useAuth()

     const {theme, toggleTheme} = useTheme()

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
                         to="/dashboard"
                         className={({ isActive }) => `nav-link ${isActive ? 'bg-primary text-white rounded' : 'text-white'
                              }`}
                         onClick={onNavigate}
                    >
                         Dashboard
                    </NavLink>

                    <NavLink
                         to="/customers"
                         className={({ isActive }) => `nav-link ${isActive ? 'bg-primary text-white rounded' : 'text-white'
                              }`}
                         onClick={onNavigate}
                    >
                         Customers
                    </NavLink>

                    <NavLink
                         to="/services"
                         className={({ isActive }) => `nav-link ${isActive ? 'bg-primary text-white rounded' : 'text-white'
                              }`}
                         onClick={onNavigate}
                    >
                         Services
                    </NavLink>

                    {user?.role === 'admin' && (<NavLink
                         as={Link}
                         to="/staff"
                         className={({ isActive }) => `nav-link ${isActive ? 'bg-primary text-white rounded' : 'text-white'
                              }`}
                         onClick={onNavigate}
                    >
                         Staff
                    </NavLink>)}

                    <NavLink
                         to="/bills/history"
                         className={({ isActive }) => `nav-link ${isActive ? 'bg-primary text-white rounded' : 'text-white'
                              }`}
                         onClick={onNavigate}
                    >
                         Billing History
                    </NavLink>
               </Nav>
               <div className='mt-4 flex-column'>
               <Button
                    variant={theme === "dark" ? "light" : "dark"}
                    // variant='dark'
                    className='w-100 mb-2 mt-auto'
                    onClick={toggleTheme}
               >
                    {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
               </Button>
               <Button
                    variant='danger'
                    className='mt-4 w-100 mt-auto'
                    onClick={handleLogout}
                    >
                    Logout
               </Button>
               </div>      
          </div>
     )
}

export default Sidebar
