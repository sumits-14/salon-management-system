import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
     {
          serviceName : {
               type : String,
               required : true,
               trim : true
          },

          price : {
               type : Number,
               required : true,
               min : 0
          },

          active : {
               type : Boolean,
               default : true
          },
     },
     {
          timestamps : true
     }
);

const Service = mongoose.model('Service', serviceSchema);

export default Service;





