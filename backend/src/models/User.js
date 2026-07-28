import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
     {
          name : {
               type : String,
               required : true,
               trim : true
          },

          username : {
               type : String,
               required : true,
               unique : true,
               trim : true
          },

          password : {
               type : String,
               required : true,
          },

          role : {
               type : String,
               enum : ['admin', 'worker'],
               default : "worker",
               required : true
          },

          phone : {
               type : Number,
               required : true,
               trim : true,
          },

          address : {
               type : String,
               trim : true,
          },

          active : {
               type : Boolean,
               default : true
          }
     },
     {
          timestamps : true
     }
);

const User = mongoose.model('User', userSchema)

export default User;











