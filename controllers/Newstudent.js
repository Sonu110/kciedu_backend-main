const Students = require('../Models/student');
async function NewStudentHanddle (req,res) {
    
  console.log("this is working");

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
  
  
      // Generate a random username and password
      const username = generateRandomUsername();
      const password = generateRandomPassword();
      const admissionDate = new Date().toLocaleDateString();
      const studentID = generateStudentID();
  
      if (req.files['Files']) {
        photoPath = req.files['Files'][0].path;
      }
      // Create a new student instance
      const newStudent = new Students({
        firstname:  firstName,
        lastname: lastName,
        course,
        Mobilenumber: phoneNumber,
        confirmnumber : confirmPhoneNumber,
        Email:  email,
        Date_of_brith: dob,
        gender,
        Occupation: occupation,
        State: state,
        City: city,
        Postcode: postcode,
        Address: address,
        username,
        StudentID: studentID,
        Admission_date: admissionDate,
        password:password, // Hash the generated password
        photo: photoPath, // Save the file path or null if it doesn't exist
      });
  
      // Save the student to the database
      const savedStudent = await newStudent.save();
  
      res.status(201).json({ success: true, student: savedStudent, username, password });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  
  function generateStudentID() {
    return Math.floor(10000000 + Math.random() * 90000000);
  }
  
  // Function to generate a random username (you can adjust as needed)
  function generateRandomUsername() {
    return 'user_' + Math.floor(Math.random() * 10000);
  }
  
  // Function to generate a random password (you can adjust as needed)
  function generateRandomPassword() {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const passwordLength = 8;
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * randomChars.length);
      password += randomChars.charAt(randomIndex);
    }
    return password;
  }

module.exports = NewStudentHanddle