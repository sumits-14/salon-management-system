import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
     try {
          const authHeader = req.headers.authorization;

          if(!authHeader || !authHeader.startsWith("Bearer ")) {
               return res.status(401).json({
                    message : "Unauthorized!"
               });
          }

          const token = authHeader.split(" ")[1]

          const decode = jwt.verify(
               token,
               process.env.JWT_SECRET
          );

          req.user = await User.findById(
               decode.userId
          ).select("-password");

          next();
     } catch(error) {
          res.status(401).json({
               message : "Invalid Token"
          })
     }
}

export default protect









