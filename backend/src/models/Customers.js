import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
     {
          customerName : {
               type : String,
               required : [true, "Customer name is required"],
               trim : true,

               minlength : [
                    3,
                    "Customer name must be atleast 3 characters long"
               ],

               maxlength : [
                    50,
                    "Customer name cannot exceed 50 characters"
               ],

               validate : {
                    validator : function(value) {
                         return /^[A-Za-z ]+$/.test(value);
                    },
               },

               message : "Customer name should contain only letters ans spaces"
          },

          mobileNumber : {
               type : String,
               required : true,
               unique : true,
               trim : true,
               validate : {
                    validator : function(value) {
                         return /^[0-9]{10}$/.test(value)
                    },

                    message : 'Mobile number must be exactly 10 digit only'
               }
          },

          totalVisits : {
               type : Number,
               default : 0,
          },

          totalAmount : {
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

