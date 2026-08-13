import Bill from "../models/Bill.js";


const getAnalytics = async (workerId, startDate) => {

     const matchStage = {
          createdAt : {
               $gte : startDate,
          },
     }

     // ONly filter by worker when worker ID is provided
     if(workerId) {
          matchStage.worker = workerId;
     }

     const result = await Bill.aggregate([
          {
               $match : matchStage,
          },
          {
               $group : {
                    _id : null,

                    totalCustomersServed : {
                         $sum : 1,
                    },

                    revenue : {
                         $sum : "$totalAmount",
                    }
               },
          },
     ]);

     if(result.length === 0) {
          return {
               totalCustomersServed : 0,
               revenue : 0
          };
     }

     return {
          totalCustomersServed : result[0]?.totalCustomersServed || 0,
          revenue : result[0]?.revenue || 0,
     }
}

export const getDashboard =
     async (req, res) => {
          try {
               ////////////// One Day Analysis
               const today = new Date();
               today.setHours(0, 0, 0, 0);

               ////////////// Week Starts 
               const weekStart = new Date()

               weekStart.setHours(0, 0, 0, 0);

               weekStart.setDate(
                    weekStart.getDate() - weekStart.getDay()
               )

               /////////////// Month Starts
               const monthStart = new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    1
               )

               const workerId = req.user.role === 'admin' ? null : req.user._id;

               const [todayStats, weekStats, monthStats] = await Promise.all([
                    getAnalytics(
                         workerId,
                         today,
                    ),

                    getAnalytics(
                         workerId,
                         weekStart,
                    ),

                    getAnalytics(
                         workerId,
                         monthStart,
                    )

               ]);


               res.json({
                    success : true,

                    today : todayStats,
                    week : weekStats,
                    month : monthStats,
               });

          } catch (error) {
               res.status(500).json({
                    success : false,
                    message : error.message
               })
          }
     }


