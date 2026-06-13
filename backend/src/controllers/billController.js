import Customer from "../models/Customers.js";
import Service from "../models/Service.js";
import Bill from "../models/Bill.js";
import mongoose from "mongoose";

//////////// Create customer Bill

export const createBill = async (req, res) => {
     try {
          console.log(req.body)
          const {customerId, serviceIds} = req.body;

          const customer = await Customer.findById(
               customerId
          )

          if(!customer) {
               return res.status(404).json({
                    success : false,
                    message : "Customer Not Found"
               })
          }
          
          ///////////////// Customer ID varification

          if(!mongoose.Types.ObjectId.isValid(customerId)){
               return res.status(400).json({
                    success : false,
                    message : "Invalid customer id"
               })
          }

          const services = await Service.find({
               _id : {
                    $in : serviceIds,
               },
          });

          if(services.length === 0) {
               return res.status(400).json({
                    success : false,
                    message : "No service selected!"
               })
          }

          ////////////// Service Id varification

          const invalidServiceId = serviceIds.some(
               (id) => !mongoose.Types.ObjectId.isValid(id)
          )

          if(invalidServiceId) {
               return res.status(400).json({
                    success : false,
                    message : "Invalid Service ID"
               })
          }

          let totalAmount = 0;

          const billServices = services.map((service) => {
               totalAmount += service.price;

               return {
                    service: service._id,
                    serviceName : service.serviceName,
                    price : service.price
               }
          })

          const bill = await Bill.create({
               customer : customer._id,
               worker : req.user._id,
               services : billServices,
               totalAmount,
          })

          customer.totalVisits += 1

          customer.totalAmount += totalAmount

          await customer.save();

          res.status(201).json({
               success : true,
               data : bill
          })

     } catch (error) {
          res.status(500).json({
               success : false,
               message : error.message
          })
     }
}




//////////////// Get Customer Bill

export const getCustomerBills = async (req, res) => {
     try {
          const bills = await Bill.find({
               customer : req.params. customerId
          }).populate(
               "worker",
               "name"
          ).sort({
               createAt : -1,
          })

          res.json({
               success : true,
               data : bills
          })

     } catch (error) {
          res.status(500).json({
               success : false,
               message : error.message
          })
     }
}



