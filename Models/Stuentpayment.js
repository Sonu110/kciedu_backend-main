// models/studentPayment.js
const mongoose = require('mongoose');

const studentPaymentSchema = new mongoose.Schema({
    studentId: { type: Number, required: true },
    studentName: { type: String, required: true },
    selectCourse: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    receiptNo: { type: String, required: true },
    paymentAmount: { type: Number, required: true },
    totalBalance: { type: Number, required: true },
    paymentMode: { type: String, required: true },
    note: { type: String },
    studentPaymentsdata: 
    {type: mongoose.Schema.Types.ObjectId,
        ref: "userdata",
        required: true, }
        ,
    createdAt: { type: Date, default: Date.now },
});

const StudentPayment = mongoose.model('StudentPayment', studentPaymentSchema);

module.exports = StudentPayment;
