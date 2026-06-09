import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
     {
          customer: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Customer",
               required: true,
          },

          worker: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User",
               required: true,
          },

          services: [
               {
                    service: {
                         type: mongoose.Schema.Types.ObjectId,
                         ref: "Service"
                    },

                    serviceName: String,
                    price: Number
               }
          ],

          totalAmount : {
               type : Number,
               required : true
          },
     },

     {
          timestamps: true
     }
)

const Bill = mongoose.model('Bill', billSchema)

export default Bill





