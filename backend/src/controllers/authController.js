import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


////////////// Register User

export const registerUser = async (req, res) => {
     try {
          const {name, username, password, role} = req.body

          const existingUser = await User.findOne({
               username
          });

          if(existingUser){
               return res.status(400).json({
                    message : "Username already exists!"
               });
          }

          const hashedPassword = await bcrypt.hash(
               password,
               10
          )

          const user = await User.create({
               name,
               username,
               password : hashedPassword,
               role,
          })

          res.status(201).json({
               success : true,
               user,
          });

     }catch(error) {
          res.status(500).json({
               message : error.message,
          })
     }
}


///////////////// Login User

export const loginUser = async (req, res) => {
     try {
          const {username, password} = req.body;

          const user = await User.findOne({
               username,
          })

          if(!user) {
               return res.status(401).json({
                    message : "Invalid credentials",
               });
          }

          const isMatch = await bcrypt.compare(
               password,
               user.password
          );

          if(!isMatch){
               return res.status(401).json({
                    message : "Invalid Credentials"
               });
          }

          const token = generateToken(user._id);

          res.json({
               success : true,

               token,

               user : {
                    id : user._id,
                    name : user.name,
                    username : user.username,
                    // password : user.password.
                    role : user.role,
               }
          });
     } catch (error) {
          res.status(500).json({
               message : error.message
          })
     }
}

////////////// Get Logged-In User

export const getMe = async(req, res) => {
     const {_id, name, username, role} = req.user
     res.json({
          success : true,
          user : {
               id : _id,
               name,
               username,
               role
          }
     })
}


