//Demo file for the Auth Middleware Logic
import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import transporter from '../utils/mailer.js';
import crypto from 'crypto';
import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';
import { Op } from 'sequelize';

const router = express.Router();

dotenv.config();
const userId = uuidv4();


// Register Route
router.post("/register", async (req: any, res: any) => {
  const {FullName, Username, Phone, Email, Password } = req.body;
  try {
    const existing = await User.findOne({ where: { Email } });
    if (existing) return res.status(400).json({ message: "Email already registered." });

    const hashedPassword = await bcrypt.hash(Password, 10);
    const verificationOTP = crypto.randomBytes(3).toString('hex');

    const newUser = await User.create({
      id: userId,
      FullName,
      Username,
      Phone,
      Email,
      Password: hashedPassword,
      verificationCode: verificationOTP,
      isVerified: false,
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: Email,
      subject: "Verify your email",
      html: `<p>Your verification code is <b>${verificationOTP}</b></p>`,
    });

    res.status(201).json({ message: "User registered. Verification code sent to email." });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Verify email for registration Route
router.post("/verify", async (req: any, res: any) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({ where: { verificationCode: code } });
    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.verificationCode !== code) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    res.status(200).json({ message: "Account verified successfully." });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

//Middleware to protect route
const authentication = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting: Bearer <token>
  if (!token) return res.status(403).json({ message: 'Token is missing' });

  JWT.verify(token, process.env.SECRET_KEY as string, (err: any, user: any) => {
    if (err) return res.status(401).json({ message: 'Token is invalid' });

    req.user = user; // store decoded user info
    next();
});
};
// Sign in user
router.post("/login", async (req: any, res: any) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({where: { [Op.or]: [{Email:  Email}, {Username: Email}]}});
    if (!user) return res.status(404).json({message: 'User Not Found'});

    const isPasswordMatch = await bcrypt.compare(Password, user.Password);
    if (!isPasswordMatch) return res.status(200).json({message: 'Incorrect password'});

     const token = JWT.sign({id: user.id}, process.env.SECRET_KEY as string, {expiresIn: '1d'});
     console.log('Succes');
     res.json({ token });
  } catch (err: any) {
    res.status(500).json({ message: err.message})
  }
});


// forgot passwork email verification
router.post("/forgot/password", async (req: any, res: any) => {
  const { Email } = req.body;
  try {
    const user = await User.findOne({ where: { Email }});
    if (!user) return res.status(400).json({message: 'Inavlid Emaill Address'});

    const OTP = Math.floor(1000 + Math.random() * 9000).toString(); //Generate 4 digit otp
    //Send Mail to the user
      await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: Email,
      subject: "Verify your email",
      html: `<p>Your verification code is <b>${OTP} for password reset</b></p>`,
    });

    user.verificationCode = OTP;
    await user.save();

    res.status(200).json({ message: 'Verification OTP Sent Successfully'})
  } catch (err: any) {
    return res.status(500).json({message: err.message})
  }
});

//Update password
router.post("/forgot/password/verify", async (req: any, res: any) => {
  const { newPasswordOTP } = req.body;
  try {
  const user = await User.findOne({ where: {verificationCode: newPasswordOTP}});
  if (!user || user.verificationCode !== newPasswordOTP) {
    return res.status(404).json({message: 'No User Found'});
  }
  res.status(200).json({ message: 'Succesful, process to set new password'});
} catch (err: any) {
  return res.status(500).json({message: err.message})
}
});

router.post("/set/newPassword", async (req: any, res: any) => {
  const { Username, newPassword, confirmPassword } = req.body;
  try {
    const user = await User.findOne({where: {Username}});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (newPassword !== confirmPassword) {
      console.log('Password Mismmatch, Input same Password');
      return res.status(400).json({message: 'Password Mismmatch, Input same Password'});
    }

    const hashNewPassword = await bcrypt.hash(confirmPassword, 10);
    user.Password = hashNewPassword;
    await user.save();
    res.status(200).json({message: 'Password updated successfully'});
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({message: 'Unable to update password'})
  }
});

export default router;