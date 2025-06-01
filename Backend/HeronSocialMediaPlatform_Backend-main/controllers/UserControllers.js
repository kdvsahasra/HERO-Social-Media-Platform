const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {Storage} = require('@google-cloud/storage');
const { UserType, MedalType } = require('../enums/enumList');
// const path = require('path');
// const fs = require('fs');

// const uploadDir = path.join(__dirname, '../uploads');

// // Ensure the upload directory exists
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }


// const serverBaseUrl = 'http://localhost:3001';


//User registration
const register = asyncHandler(async (req, res) => {
    try {
        const { fullName, username, password, level,gender, subject } = req.body;

        if (!fullName|| !username || !password || !level, !gender, !subject) {
            return res.status(400).json({ message: "Please fill all required fields." });
        }

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
  
       
        const user = new User({
            fullName,
            username,
            password: hashPassword,
            level,
            gender,
            subject
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error during registration", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


const login = asyncHandler(async (req, res) => {
    const {username, password} = req.body;
    const JWT_SECRECT = 'manuss' 
    try {
        const user = await User.findOne({ username });

        if(!user){
            res.status(404).json({message:'User not Found'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:'Invalid Password'});
        }

        const token = jwt.sign({ id: user._id.toString() }, JWT_SECRECT, { expiresIn: '1h' });
        res.status(200).json({token,user});
    } catch (error) {
        console.log('Error during login', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//Update user details
const updateUser = asyncHandler(async (req, res) => {
    // Get userId from the token (stored in req.user.id by your authMiddleware)
    const userId = req.user.id;
    const updateFields = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let profileImageUrl = user.profileImage; 

        if (req.file) {
            const fileName = `profile_${Date.now()}_${req.file.originalname}`;
            const filePath = path.join(uploadDir, fileName);

            // Save new file to local storage
            fs.writeFileSync(filePath, req.file.buffer);

            // Update profile image URL
            profileImageUrl = `${serverBaseUrl}/uploads/${fileName}`;
        }

        // Update fields dynamically
        for (const field in updateFields) {
            if (['fullName', 'username', 'email', 'password', 'mobile', 'userType', 'level', 'bio', 'achievements', 'medals', 'academicProgress'].includes(field)) {
                if (field === 'password') {
                    updateFields[field] = await bcrypt.hash(updateFields[field], 10);
                }
                user[field] = updateFields[field];
            }
        }

        // Update profile image if changed
        user.profileImage = profileImageUrl;

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error during update', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Request Password Reset
const requestPasswordResetWithOTP = asyncHandler(async(req,res) =>{
    const startTime = new Date().getTime();

    const{email} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try{

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message:'User not found'});
        }
    
        //Generate OTP
    
        const otp = Math.floor(100000 + Math.random() * 900000);
    
        user.resetOTP = otp;
        user.resetOTPExpiration = Date.now() + 600000;
    
        await user.save();
    
        // Send an email with the reset link containing the token
    
        const transporter = nodemailer.createTransport({
            service:'gmail',
            host: "smtp.gmail.com",
            port:465,
            secure: true,
            auth: {
                user: 'manulperera5@gmail.com',
                pass: 'lksr heqd wwoz dmsb',
            },
            tls:{
                rejectUnauthorized:false
            }
        });
    
      
        const mailOptions = {
            from: {
                name:'Hero SocialMedia Platform',
                address:'manulperera5@gmail.com'
            },
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`,
        };
    
        transporter.sendMail(mailOptions,(error,info) =>{
            if(error){
                console.error('Error sending email',error);
                return res.status(500).json({message:'Failed to send OTP email'});
            }

            const endTime = new Date().getTime();
        console.log('Backend response time:', endTime - startTime, 'ms');
    
            res.status(200).json({message:'OTP sent successfully'});
        })
    }catch (error) {
        console.error('Error requesting password reset', error);
        res.status(500).json({ message: 'Failed to request password reset' });
    }
       
})


const verifyOTPAndPassword = asyncHandler(async(req,res) =>{
    const {email,otp} = req.body;
 
    console.log("Request Body:", req.body);  // Debugging line to see the entire request body
 
    if (!email) {
        console.log("Email not received");
        return res.status(400).json({ message: 'Email not received' });
    }
 
    if (!otp) {
        console.log("OTP not received");
        return res.status(400).json({ message: 'OTP not received' });
    }
 
    console.log("Received email:", email);
    console.log("Received OTP:", otp);
 
    const user = await User.findOne({ email: email.toLowerCase() });  // Ensure email is in lowercase
 
    console.log("User:", user);
 
    if(!user) {
        console.log("User not found");
        return res.status(400).json({ message: 'User not found' });
    }
 
    if(user.resetOTP !== otp) {
        console.log("Invalid OTP");
        return res.status(400).json({ message: 'Invalid OTP' });
    }
 
    if(user.resetOTPExpiration < Date.now()) {
        console.log("Expired OTP");
        return res.status(400).json({ message: 'Expired OTP' });
    }
 
    user.resetOTP = null;
    user.resetOTPExpiration = null;
 
    await user.save();
 
    res.status(200).json({ message: 'OTP verified successfully!' });
 })


 // New password
const updatePassword = asyncHandler(async(req,res) =>{
    const {email, newPassword} = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if(!user){
        return res.status(404).json({message:'User not found'});
    }

    // Hash the password and update user's password
    const hashedPassword = await bcrypt.hash(newPassword,10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({message:'Password updated successfully!'});
});

// Delete account
const deleteAccount = asyncHandler(async(req,res) =>{
    const {username} = req.body;

    try {
        const user = await Users.findOneAndDelete({username});

        if(!user){
            throw new Error('User not found');
        }

        res.status(200).json({message:'Account deleted successfully'});
    } catch (error) {
        console.error('Failed to delete account',error);
        res.status(500).json({message:'Failed to delete account'});
    }
});

//Students approves assigned teacher
const approveTeacher = asyncHandler(async (req, res) => {
    try {
        const studentId = req.user.id;

    const student = await User.findById(studentId);
    
    if(!student || student.userType !== 'student') {
        return res.status(404).json({message:'Student not found'});
    }

    if (!student.assignedTeacher || !student.assignedTeacher.teacherId) {
        return res.status(400).json({ message: 'No teacher assigned' });
      }
  
      if (student.assignedTeacher.isApproved) {
        return res.status(400).json({ message: 'Teacher already approved' });
      }

    student.assignedTeacher.isApproved = true;
    await student.save();
    res.status(200).json({message:'Teacher approved successfully'});

    } catch (error) {
        console.error('Failed to approve teacher',error);
        res.status(500).json({message:'Internal server error'});
    }
});

const getClassOverview = asyncHandler(async (req, res) => {
    const teacherId = req.user.id;
    const students = await User.find({
        userType:'student',
        'assignedTeacher.teacherId': teacherId,
        'assignedTeacher.isApproved': true
    }).select('fullName email level points academicProgress');

    res.status(200).json(students);
});

const getuserById = asyncHandler(async(req,res) =>{
    try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if(!user){
        return res.status(404).json({message:'User not found'});
    }
    res.status(200).json(user);
    } catch (error) {
        console.error('Failed to get user');
        res.status(500).json({message:'Internal server error'});
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
   try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events', details: error.message });
    }
});


module.exports = {register,login,updateUser,requestPasswordResetWithOTP,verifyOTPAndPassword,updatePassword,getAllUsers,approveTeacher,getClassOverview,getuserById};