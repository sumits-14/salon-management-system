import User from "../models/User.js";
import bcrypt from "bcryptjs";

/////////////////// Create Staff
export const createStaff = async (req, res) => {
     try {
          const {
               name,
               username,
               password,
               role,
               phone,
               address,
          } = req.body

          const existingUser = await User.findOne({ username });

          if (existingUser) {
               return res.status(400).json({
                    success: false,
                    message: "Username already exist!"
               });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const staff = await User.create({
               name,
               username,
               password: hashedPassword,
               role,
               phone,
               address,
          });

          res.status(201).json({
               success: true,
               message: "Staff created successfully.",
               data: {
                    _id: staff.id,
                    name: staff.name,
                    username: staff.username,
                    role: staff.role,
                    phone: staff.phone,
                    address: staff.address,
                    active: staff.active,
                    createdAt: staff.createdAt
               },
          });

     } catch (error) {
          res.status(500).json({
               success: false,
               message: error.message
          })
     }
}

////////////////////// Get Staff 
export const getStaff = async (req, res) => {
     try {
          const staff = await User.find({ active: true }, "-password").sort({
               createdAt: 1,
          });

          res.status(200).json({
               success: true,
               count: staff.length,
               data: staff,
          });
     } catch (error) {
          res.status(500).json({
               success: false,
               message: error.message,
          })
     }
}

/////////////////////// Update Staff
export const updateStaff = async (req, res) => {
     try {
          const { id } = req.params;
          const {
               name,
               username,
               role,
               phone,
               address,
          } = req.body

          const existingUser = await User.findOne({
               username,
               _id: { $ne: id },
          })

          if (existingUser) {
               return res.status(400).json({
                    success: false,
                    message: "Username already exists!"
               });
          }

          const staff = await User.findByIdAndUpdate(
               id,
               {
                    name,
                    username,
                    role,
                    phone,
                    address,
               },
               {
                    new: true,
                    runValidators: true,
               }
          ).select("-password")

          if (!staff) {
               return res.status(404).json({
                    success: false,
                    message: "Staff not found"
               })
          }

          res.status(200).json({
               success: true,
               message: "Staff updated successfully.",
               data: staff,
          })

     } catch (error) {
          res.status(500).json({
               success: false,
               message: error.message
          })
     }
}


////////////////// Toggle Staff status
export const toggleStaffStatus = async (req, res) => {
     try {
          const { id } = req.params;
          const { active } = req.body;

          if(req.user._id.toString() === id) {
               return res.status(400).json({
                    success : false,
                    message : "You cannot deactivate your own account!💀"
               })
          }

          const staff = await User.findByIdAndUpdate(
               id,
               { active },
               {
                    new: true,
                    runValidators: true,
               }
          ).select("-password")

          if (!staff) {
               return res.status(401).json({
                    success: false,
                    message: "Staff not found.",
               })
          }

          res.status(200).json({
               success: true,
               message: `Staff ${active ? "activated" : "Deactivated"} successfully.`,
               data: staff
          })

     } catch (error) {
          res.status(500).json({
               success: false,
               message: error.message
          })
     }
}



