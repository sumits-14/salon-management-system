import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { ThemeProvider } from './context/ThemeContext'


function App() {

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
          <ToastContainer
            position='top-right'
            autoClose={3000}
            closeOnClick
            pauseOnHover
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
