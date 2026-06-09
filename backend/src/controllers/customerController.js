import Customer from "../models/Customers.js";
import formatName from "../utils/formatName.js";


//////////// Create Customer

export const createCustomer = async (req, res) => {
     try {
          const { customerName, mobileNumber } = req.body

          const existingCustomer = await Customer.findOne({
               mobileNumber
          })

          if (existingCustomer) {
               return res.status(400).json({
                    success: false,
                    message: "Customer already exists!"
               })
          }

          const formattedName =
               formatName(customerName);

          const customer = await Customer.create({
               customerName: formattedName,
               mobileNumber
          })

          res.status(201).json({
               success: true,
               data: customer
          })
     } catch (error) {

          if (error.name === "ValidationError") {
               return res.status(400).json({
                    success: false,
                    message: Object.values(error.errors)[0].message
               })
          }

          res.status(500).json({
               success: false,
               message: error.message
          })
     }
}



//////////// Get all customers

export const getCustomers = async (req, res) => {
     try {
          const customer = await Customer.find({
               active: true
          }).sort({
               createdAt: -1
          })

          res.json({
               success: true,
               data: customer
          });

     } catch (error) {
          res.status(500).json({
               success: false,
               message: error.message
          })
     }
}



/////////////// Search your by Mobile Number

export const searchCustomerByMobile = async (req, res) => {
     try {
          const customer = await Customer.findOne({
               mobileNumber: req.params.mobileNumber,
               active: true
          });

          if (!customer) {
               return res.status(404).json({
                    success: false,
                    message: 'Customer not found'
               })
          }

          res.json({
               success: true,
               data: customer
          })

     } catch (error) {
          res.status(500).json({
               success: false,
               message: error.message
          })
     }
}


/////////// Get Single Customer

export const singleCustomer = async (req, res) => {
     try {
          const customer = await Customer.findById(req.params.id)

          if (!customer) {
               res.status(500).json({
                    success: false,
                    message: `Customer doen't exists!`
               })
          }

          res.json({
               success: true,
               data: customer
          })

     } catch (error) {
          res.status(500).json({
               success: false,
               message: error.message
          })
     }
}



////////////// Update Customer

export const updateCustomer = async (req, res) => {
     try {

          if(req.body.customerName) {
               req.body.customerName = formatName(req.body.customerName)
          }

          const customer = await Customer.findByIdAndUpdate(
               req.params.id,
               req.body,
               {
                    new: true,
                    runValidators : true
               }
          )

          if(!customer) {
               return res.status(404).json({
                    success : false,
                    message : "Customer not found"
               })
          }

          res.json({
               success: true,
               data: customer
          })

     } catch (error) {
          res.status(500).json({
               success: false,
               message: error.message
          })
     }
}



////////////// Soft Delete Customer

export const deleteCustomer = async (req, res) => {
     try {
          await Customer.findByIdAndDelete(
               req.params.id,
               {
                    active: false
               }
          )

          res.json({
               success: true,
               message: "Customer Deactivated!"
          })
     } catch (error) {
          res.status(500).json({
               success: false,
               message: error.message
          })
     }
}
