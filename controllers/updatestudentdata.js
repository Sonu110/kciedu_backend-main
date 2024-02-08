const Students = require('../Models/student');

async function Updatestuentdata (req, res) {
    const { id } = req.params;
    try {
      const {
        firstName,
        lastName,
        course,
        phoneNumber,
        confirmPhoneNumber,
        email,
        dob,
        gender,
        occupation,
        state,
        city,
        postcode,
        address,
      } = req.body;
  
      const existingStudent = await Students.findById(id);
  
      if (!existingStudent) {
        return res.status(404).json({ success: false, error: 'Student not found' });
      }

      if (req.files && req.files['Files'] && req.files['Files'][0]) {
        const photoPath = req.files['Files'][0].path || '';
        existingStudent.photo = photoPath;
    }

      existingStudent.firstname = firstName;
      existingStudent.lastname = lastName;
      existingStudent.course = course;
      existingStudent.Mobilenumber = phoneNumber;
      existingStudent.confirmnumber = confirmPhoneNumber;
      existingStudent.Email = email;
      existingStudent.Date_of_brith = dob;
      existingStudent.gender = gender;
      existingStudent.Occupation = occupation;
      existingStudent.State = state;
      existingStudent.City = city;
      existingStudent.Postcode = postcode;
      existingStudent.Address = address;
    
      const updatedStudent = await existingStudent.save();
  
      res.status(200).json({ success: true, data: updatedStudent });
    } catch (error) {
      console.error('Error updating student data:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

module.exports = Updatestuentdata