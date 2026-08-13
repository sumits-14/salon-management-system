import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import CustomersPage from "../pages/CustomersPage.jsx";
import ServicesPage from "../pages/ServicesPage.jsx";
import NotFoundPage from "../pages/NotfoundPage.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";
import CreateBillPage from "../pages/CreateBillPage.jsx";
import BillingHistoryPage from "../pages/BillingHistoryPage.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import CustomerDetailsPage from "../pages/CustomerDetailsPage.jsx";
import StaffPage from "../pages/StaffPage.jsx";


const AppRoutes = () => {
     return (
          <Routes>
               <Route
                    path="/"
                    element={<Navigate to="/login" replace/>}
               />
               
               <Route
                    path="/login"
                    element={<LoginPage />}
               />

               <Route
                    path="/dashboard"
                    element={
                         <ProtectedRoute>
                              <DashboardLayout>
                                   <DashboardPage />
                              </DashboardLayout>
                         </ProtectedRoute>
                    }
               />

               <Route
                    path="/customers"
                    element={
                         <ProtectedRoute>
                              <DashboardLayout>
                                   <CustomersPage />
                              </DashboardLayout>
                         </ProtectedRoute>
                    }
               />

               <Route
                    path="/services"
                    element={
                         <ProtectedRoute>
                              <DashboardLayout>
                                   <ServicesPage />
                              </DashboardLayout>
                         </ProtectedRoute>
                    }
               />

               <Route
                    path="/customers/:customerId/create-bill"
                    element={
                         <ProtectedRoute>
                              <DashboardLayout>
                                   <CreateBillPage />
                              </DashboardLayout>
                         </ProtectedRoute>
                    }
               />

               <Route
                    path="/bills/history"
                    element={
                         <ProtectedRoute>
                              <DashboardLayout>
                                   <BillingHistoryPage />
                              </DashboardLayout>
                         </ProtectedRoute>
                    }
               />

               <Route
                    path="/customers/:id"
                    element={
                         <ProtectedRoute>
                              <DashboardLayout>
                                   <CustomerDetailsPage />
                              </DashboardLayout>
                         </ProtectedRoute>
                    }
               />

               <Route 
                    path="/staff"
                    element={
                         <ProtectedRoute>
                              <DashboardLayout>
                                   <StaffPage />
                              </DashboardLayout>
                         </ProtectedRoute>
                    }
               />

               <Route
                    path="*"
                    element={
                         <NotFoundPage />
                    }
               />

          </Routes>
     )
}

export default AppRoutes

