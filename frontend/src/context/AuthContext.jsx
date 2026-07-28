import { createContext, useState, useContext, useEffect} from "react";
import { getCurrentUser } from "../api/authApi.js";


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
     const [user, setUser] = useState(null);
     // const [user, setUser] = useState(() => {
     //      const savedUser = localStorage.getItem("user")
     //      return savedUser ? JSON.parse(savedUser) : null
     // });
     const [token, setToken] = useState(
          localStorage.getItem(
               "token"
          ) || null
     );
     const [loading, setLoading] = useState(true)

     useEffect(() => {
          const loadUser = async () => {
               try {
                    if(!token) {
                         setLoading(false);
                         return;
                    }

                    const response = await getCurrentUser();
                    
                    setUser(response.data.user);
                    
               } catch (error) {
                    console.error(error);
                    
                    // localStorage.removeItem("token")
                    // setUser(null)
                    // setToken(null)

                    logout()
               } finally {
                    setLoading(false)
               }
          };
          loadUser()
     }, [token])
     
     const login = (userData, authToken) => {
          setUser(userData);
          setToken(authToken);
          localStorage.setItem(
               // "user",
               "token",
               authToken,
               // JSON.stringify(userData)
          )  
     }

     const logout = () => {
          setUser(null);
          setToken(null);
          localStorage.removeItem(
               "token"
          );
     }

     return (
          <AuthContext.Provider
               value={{
                    user,
                    token,
                    loading,
                    login,
                    logout
               }}
          >
               {children}
          </AuthContext.Provider>
     )
}

export const useAuth = () => useContext(AuthContext)
