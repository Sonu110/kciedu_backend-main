    const express = require('express');
    const Admin = express.Router();

    const cloudinary = require('cloudinary').v2;
    const NewStudentHanddle = require('../controllers/Newstudent')
    const Updatestuentdata = require('../controllers/updatestudentdata')
    const multer = require('multer');
    const { CloudinaryStorage } = require('multer-storage-cloudinary');
    const Students = require('../Models/student');
    const StudentPayment = require('../Models/Stuentpayment')
    const Placement = require('../Models/Placement')

    const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'png', 'pdf'],
    },
    });




    const uploadsMiddleware = multer({ storage: cloudinaryStorage });


    Admin.post('/studentadmission', uploadsMiddleware.fields([{ name: 'Files' }]),NewStudentHanddle )
   
    Admin.get('/Allstudentdata', async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let pageSize = parseInt(req.query.pageSize) || 5;

        const skipValue = (page - 1) * pageSize;

        const totalRecords = await Students.countDocuments({ Student: req.admin._id }); // Count records for the specific admin

        const studentdata = await Students.find({ Student: req.admin._id }).skip(skipValue).limit(pageSize).exec();


        res.status(200).json({ data: studentdata, total: totalRecords, success: true });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ data: "Error fetching student data", success: false });
    }
    });

    Admin.get('/searchStudents', async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;   
           const adminId = req.admin._id;

        const studentdata = await Students.find(
          
            {  Student: adminId, firstname: { $regex: searchTerm, $options: 'i' } });

        res.status(200).json({ data: studentdata, success: true });
    } catch (error) {
        console.error('Error searching students:', error);
        res.status(500).json({ data: "Error searching students", success: false });
    }
    });

    Admin.delete('/deleteStudent/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Students.findByIdAndDelete(id);
    
        

        if (!deletedStudent) {
        return res.status(404).json({ success: false, error: 'Student not found' });
        }

        res.status(200).json({ success: true, data: deletedStudent });
    } catch (error) {
        console.error('Error deleting student data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
    });




    Admin.get('/getStudent/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const studentData = await Students.findById(id );

        if (!studentData) {
        return res.status(404).json({ success: false, error: 'Student not found' });
        }

        res.status(200).json({ success: true, data: studentData });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
    });


    Admin.get('/getStudents/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const studentData = await Students.findOne({ StudentID: id });
        const studentPaymentData = await StudentPayment.find({ studentId: id });

        if (!studentData) {
        return res.status(404).json({ success: false, error: 'Student not found' });
        }

        if (!studentPaymentData) {
        return res.status(404).json({ success: false, error: 'Student payment data not found' });
        }

        res.status(200).json({ success: true, data: studentData, paymentsData: studentPaymentData });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
    });

    Admin.get('/paymentupdatedata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const studentData = await StudentPayment.findById({_id : id} );
    
        if (!studentData) {
        return res.status(404).json({ success: false, error: 'Student not found' });
        }

        res.status(200).json({ success: true, data: studentData });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
    });



    Admin.put('/updateStudent/:id',  uploadsMiddleware.fields([{ name: 'Files' }]),Updatestuentdata);


    Admin.post('/payments', async (req, res) => {

    
    try {
        const {
        studentId,
        studentName,
        selectCourse,
        totalAmount,
        Receiptno,
        paymentAmount,
        totalBalance,
        paymentMode,
        note,
        } = req.body;

    

        const adminId = req.admin._id;

        const newPayment = new StudentPayment({
        studentId,
        studentName,
        selectCourse,
        totalAmount,
        receiptNo: Receiptno,
        paymentAmount,
        totalBalance,
        paymentMode,
        note,
        studentPaymentsdata: adminId,
        });

        const savedPayment = await newPayment.save();
        res.json(savedPayment);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
    });

    Admin.put('/paymentsupdate/:id', async (req, res) => {

    try {
        const paymentId = req.params.id;
        const {
        studentId,
        studentName,
        selectCourse,
        totalAmount,
        Receiptno,
        paymentAmount,
        totalBalance,
        paymentMode,
        note,
        } = req.body;

        const updatedPayment = await StudentPayment.findByIdAndUpdate(
        paymentId,
        {
            $set: {
            studentId,
            studentName,
            selectCourse,
            totalAmount,
            receiptNo: Receiptno,
            paymentAmount,
            totalBalance,
            paymentMode,
            note,
            },
        },
        { new: true }
        );

        if (!updatedPayment) {
        return res.status(404).json({ error: 'Payment not found' });
        }

        res.json(updatedPayment);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
    });



    Admin.get('/allpaymentreceipt', async (req, res) => {
    try {
        const payemntrecipt = await StudentPayment.find({ studentPaymentsdata: req.admin._id }).exec();
        res.status(200).json({ data: payemntrecipt, success: true });
    } catch (error) {
        console.error('Error fetching course data:', error);
        res.status(500).json({ data: "Error fetching course data", success: false });
    }
    });

    Admin.post('/placement', uploadsMiddleware.fields([{ name: 'image' }]), async (req, res) => {
       
      


        try {
            
            if (req.files['image']) {
                photoPath = req.files['image'][0].path;
              }
              
              const newPlacement = new Placement({
                jobName: req.body.jobName,
                description: req.body.description,
                experience: req.body.experience,
                salary: req.body.salary,
                imageUrl: photoPath,
              });
              
              const savedPlacement = await newPlacement.save();
              
          res.status(201).json(savedPlacement);
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      })

Admin.delete('/placement/:id', async(req,res)=>{

    try {
        const { id } = req.params;
        console.log("sdfsdfsd",id);
        const deletedStudent = await Placement.findByIdAndDelete(id);
    
        

        if (!deletedStudent) {
        return res.status(404).json({ success: false, error: 'Student not found' });
        }

        res.status(200).json({ success: true, data: deletedStudent });
    } catch (error) {
        console.error('Error deleting student data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

})

    module.exports = Admin;
