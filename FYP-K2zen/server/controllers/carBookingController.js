// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // ✅ Approve Booking (Send Confirmation Email)
// export const approveBooking = async (req, res) => {
//   try {
//     const booking = await CarBooking.findById(req.params.id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     booking.status = "Booked";
//     await booking.save();

//     // ✅ Update Car status
//     await RentCar.findByIdAndUpdate(booking.carId, { status: "Booked" });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: booking.email,
//       subject: "✅ Booking Approved",
//       text: `Dear ${booking.fullName}, Your booking for ${booking.carName} is successfully approved!`
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ success: true, message: "Booking Approved ✅ & Email Sent!" });

//   } catch (error) {
//     console.error("❌ Approve Error:", error);
//     res.status(500).json({ success: false, message: "Approve failed", error: error.message });
//   }
// };

// // ❌ Reject Booking (Send Rejection Email)
// export const rejectBooking = async (req, res) => {
//   try {
//     const booking = await CarBooking.findById(req.params.id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     booking.status = "Rejected";
//     booking.rejectionReason = req.body.reason || "No reason provided";
//     await booking.save();

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: booking.email,
//       subject: "❌ Booking Rejected",
//       text: `Dear ${booking.fullName}, Sorry! Your booking has been rejected.\nReason: ${booking.rejectionReason}`
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ success: true, message: "Booking Rejected & Email Sent!" });

//   } catch (error) {
//     console.error("❌ Reject Error:", error);
//     res.status(500).json({ success: false, message: "Reject failed", error: error.message });
//   }
// };
