import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
     {
          customerName : {
               type : String,
               required : true,
               trim : true
          },

          mobileNumber : {
               type : String,
               required : true,
               unique : true,
               trim : true
          },

          totalVisits : {
               type : Number,
               default : 0,
          },

          active : {
               type : Boolean,
               default : true
          },
     },

     {
          timestamps : true
     }
)

const Customer = mongoose.model('Customer', customerSchema)

export default Customer

