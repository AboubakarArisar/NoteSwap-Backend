// const studentSchema = require("../models/student.model");
// const catchAsyncError = require("../middlewares/catchAsyncError");

// const changePoints = catchAsyncError(async (studentId, changePoints) => {
//   try {
//     // const student = await studentSchema.findById(studentId);

//     if (changePoints > 0) {
//       const studentUpdated = await studentSchema.findByIdAndUpdate(
//         {
//           _id: studentId,
//         },
//         {
//           $inc: {
//             points: changePoints,
//           },
//         },
//         {
//           new: true,
//         }
//                 $inc: {
//                     if((points < 0) && (points + changePoints < 0)) {
//                 res.status(400).json({
//                     success: false,
//                     message: "Insufficient points",
//                 });

//         }
//             else {
//                 points: changePoints,
//                     }
//                 }
//       );
//     } else {
//         const studentUpdated = await studentSchema.findByIdAndUpdate(
//             {
//             _id: studentId,
//             },
//             {
//                 $inc: {
//                     if((points < 0) && (points + changePoints < 0)) {
//                 res.status(400).json({
//                     success: false,
//                     message: "Insufficient points",
//                 });

//         }
//             else {
//                 points: changePoints,
//                     }
//                 }
//                ,
//             },
//             {
//             new: true,
//             }
//         );
//     }
//     const studentUpdated = await studentSchema.findByIdAndUpdate(
//       {
//         _id: studentId,
//       },
//       {
//         $inc: {
//           points: changePoints,
//         },
//       },
//       {
//         new: true,
//       }
//     );

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// });
