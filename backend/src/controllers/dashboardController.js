import Bill from "../models/Bill.js";


const getAnalytics = async (workerId, startDate) => {
     const result = await Bill.aggregate([
          {
               $match : {
                    worker : workerId,
                    createdAt : {
                         $gte : startDate,
                    },
               },
          },

          {
               $group : {
                    _id : null,

                    customers : {
                         $sum : 1,
                    },

                    revenue : {
                         $sum : "$totalAmount",
                    }
               },
          },
     ]);

     return (
          result[0] || {
               customers : 0,
               revenue : 0
          }
     )
}

export const getWorkerDashboard =
     async (req, res) => {
          try {
               ////////////// One Day Analysis
               const today = new Date();
               today.setHours(0, 0, 0, 0);

               ////////////// Week Starts 
               const weekStart = new Date()

               weekStart.setHours(0, 0, 0, 0);

               weekStart.setDate(
                    weekStart.getDate() -
                    weekStart.getDay()
               )

               /////////////// Month Starts
               const monthStart = new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    1
               )

               const [todayStats, weekStats, monthStats] = await Promise.all([
                    getAnalytics(
                         req.user._id,
                         today
                    ),

                    getAnalytics(
                         req.user._id,
                         weekStart
                    ),

                    getAnalytics(
                         req.user._id,
                         monthStart
                    )

               ]);


               res.json({
                    success : true,

                    today : todayStats,
                    week : weekStats,
                    month : monthStats,
               });
               
          //      ///////// Today's Bill
          //      const todaysBills = await Bill.find({
          //           worker: req.user._id,

          //           createdAt: {
          //                $gte: today
          //           },
          //      });

          //      /////////////// Week Bills
          //      const weekBills = await Bill.find({
          //           worker: req.user._id,

          //           createdAt: {
          //                $gte: weekStart
          //           }
          //      })

          //      //////////////// Month Bill
          //      const monthBills = await Bill.find({
          //           worker: req.user._id,
          //           createdAt: {
          //                $gte: monthStart,
          //           }
          //      })

          //      res.json({
          //           success: true,

          // ///// TODAY
          //           today: {
          //                customers: todaysBills.length,

          //                revenue: todaysBills.reduce((acc, bill) => (
          //                     sum + bill.totalAmount
          //                ), 0)
          //           },
     
          // ///// WEEK
          //           week: {
          //                customers: weekBills.length,

          //                revenue: weekBills.reduce((sum, bill) =>
          //                     sum + bill.totalAmount,
          //                     0)
          //           },

          // ///// MONTH
          //           month: {
          //                customers: monthBills.length,

          //                revenue: monthBills.reduce((sum, bill) => sum + bill.totalAmount, 0)
          //           }
          //      })

          } catch (error) {
               res.status(500).json({
                    success : false,
                    message : error.message
               })
          }
     }


