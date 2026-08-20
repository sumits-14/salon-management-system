import Customer from "../models/Customers.js";
import Service from "../models/Service.js";
import Bill from "../models/Bill.js";
import mongoose from "mongoose";

//////////// Create customer Bill

export const createBill = async (req, res) => {
     try {
          const { customerId, serviceIds, paymentMethod } = req.body;

          if (!mongoose.Types.ObjectId.isValid(customerId)) {
               return res.status(400).json({
                    success: false,
                    message: "Invalid customer Id"
               });
          }

          const customer = await Customer.findById(
               customerId
          )

          if (!customer) {
               return res.status(404).json({
                    success: false,
                    message: "Customer Not Found"
               })
          }

          if (!Array.isArray(serviceIds) || serviceIds.length === 0) {
               return res.status(400).json({
                    success: false,
                    message: "Please select at least one service",
               })
          }

          ////////////// Service Id varification
          const invalidServiceId = serviceIds.some(
               (id) => !mongoose.Types.ObjectId.isValid(id)
          )

          if (invalidServiceId) {
               return res.status(400).json({
                    success: false,
                    message: "Invalid Service ID"
               })
          }

          const services = await Service.find({
               _id: {
                    $in: serviceIds,
               },
          })

          if (services.length === 0) {
               return res.status(400).json({
                    success: false,
                    message: "No service selected!"
               });
          }


          let totalAmount = 0;

          const billServices = services.map((service) => {
               totalAmount += service.price;

               return {
                    service: service._id,
                    serviceName: service.serviceName,
                    price: service.price
               }
          })

          const bill = await Bill.create({
               customer: customer._id,
               worker: req.user._id,
               services: billServices,
               totalAmount,
               paymentMethod,
          },
          );

          await Customer.findByIdAndUpdate(
               customerId,
               {
                    $inc: {
                         totalVisits: 1,
                         totalAmount: totalAmount,
                    },
               },
               { new: true }
          )

          res.status(201).json({
               success: true,
               data: bill
          })

     } catch (error) {
          res.status(500).json({
               success: false,
               message: error.message
          })
     }
}




//////////////// Get Customer Bill

export const getCustomerBills = async (req, res) => {
     try {
          const bills = await Bill.find({
               customer: req.params.customerId
          }).populate(
               "worker",
               "name"
          ).sort({
               createdAt: -1,
          })

          res.json({
               success: true,
               data: bills
          })

     } catch (error) {
          res.status(500).json({
               success: false,
               message: error.message
          })
     }
}


///////////////// Get Bills

export const getBills = async (req, res) => {
     const {
          worker,
          paymentMethod,
          from,
          to,
          search,
     } = req.query;

     const filter = {};

     if(req.user.role === 'worker') {
          filter.worker = req.user._id;
     } else if(req.user.role === 'admin') {
          if(worker) {
               filter.worker = worker;
          }
     }

     if (paymentMethod) {
          filter.paymentMethod = paymentMethod;
     }

     if (from || to) {
          filter.createdAt = {}

          if (from) {
               filter.createdAt.$gte = new Date(from);
          }

          if (to) {
               const endDate = new Date(to);
               endDate.setHours(23, 59, 59, 999);

               filter.createdAt.$lte = endDate;
          }
     }

     if(search) {
          const customers = await Customer.find({
               customerName : {
                    $regex : search,
                    $options : "i",
               },
          }).select("_id");

          filter.customer = {
               $in : customers.map(customer => customer._id),
          };
     }

     try {
          const bills = await Bill.find(filter)
               .populate(
                    "customer",
                    "customerName mobileNumber"
               )
               .populate(
                    "worker",
                    "name role"
               )
               .sort({
                    createdAt: -1
               })

          res.status(200).json({
               success: true,
               count: bills.length,
               data: bills,
          });

     } catch (error) {
          res.status(500).json({
               success: false,
               message: error.message,
          });
     }
}

///////////////////// Get bill by ID

export const getBillById = async (req, res) => {
     try {
          const { id } = req.params;
          if (!mongoose.Types.ObjectId.isValid(id)) {
               return res.status(400).json({
                    success: false,
                    message: "Invalid Bill ID",
               });
          }

          const bill = await Bill.findById(id)
               .populate(
                    "customer",
                    "customerName mobileNumber totalVisits totalAmount"
               )
               .populate(
                    "worker",
                    "name role"
               );

          if (!bill) {
               return res.status(404).json({
                    success: false,
                    message: "Bill not found.",
               });
          }

          res.status(200).json({
               success: true,
               data: bill,
          });

     } catch (error) {
          res.status(500).json({
               success: false,
               message: error.message,
          })
     }
}

