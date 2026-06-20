import {Navigate} from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const ProtectedRoute = ({
     children,
}) => {
     const {token, loading} = useAuth();

     if(loading) {
          return <h3>Loading...</h3>
     }

     if(!token) {
          return (
               <Navigate 
                    to = "/login"
                    replace
               />
          )
     }

     return children
}

export default ProtectedRoute;


