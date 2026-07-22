import Service from "../models/Service.js";
import dotenv from "dotenv"


//////////// Create Service

export const createService = async (req, res) => {
     try {
          const {serviceName, price} = req.body;

          const existingService = await Service.findOne({
               serviceName : serviceName.trim(),
          });

          if(existingService) {
               return res.status(400).json({
                    success : false,
                    message : 'Service already exists!'
               })
          }

          const service = await Service.create({
               serviceName,
               price,
          });

          res.status(201).json({
               success : true,
               data : service
          });

     } catch(error) {
          res.status(500).json({
               success : false,
               message : error.message
          })
     }
}



/////////////// Get All Services

export const getServices = async (req, res) => {
     try{
          const services = await Service.find({
               active : true,
          })

          res.json(services)
     } catch(error) {
          res.status(500).json({
               error : error.message
          })
     }
}


//////////// Update Service

export const updateServices = async (req, res) => {
     try {
          const service = await Service.findByIdAndUpdate(
               req.params.id,
               req.body,
               {
                    new : true,
                    // runValidators : true
               }
          );

          if(!service) {
               return res.status(500).json({
                    message : 'Service not found!'
               })
          }

          res.json(service)
     } catch(error) {
          res.status(500).json({
               message : error.message
          })
     }
}


/////////// Soft Delete Service

export const deleteService = async (req, res) => {
     try{
          const service = await Service.findByIdAndUpdate(
               req.params.id,
               {
                    active : false
               },
               {
                    new : true
               }
          );

          if(!service) {
               return res.status(404).json({
                    success : false,
                    message : "Service not found!"
               })
          }

          res.json({
               success : true,
               message : "Service deactivated!",
               data : service
          })

     } catch(error) {
          res.status(500).json({
               message : error.message
          })
     }
}





