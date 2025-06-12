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
import authentication from '../middlewares/midleware'

const router = express.Router();

dotenv.config();

// Register Route
router.post("/register", async (req: any, res: any) => {
  const {FullName, Username, Phone, Email, Password } = req.body;
  const userId = uuidv4();
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

// Sign in user
router.post("/login", async (req: any, res: any) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({where: { [Op.or]: [{Email:  Email}, {Username: Email}]}});
    if (!user) return res.status(404).json({message: 'User Not Found'});

    const isPasswordMatch = await bcrypt.compare(Password, user.Password);
    if (!isPasswordMatch) return res.status(200).json({message: 'Incorrect password'});

     const token = JWT.sign({id: user.id, email: user.Email}, process.env.SECRET_KEY as string, {expiresIn: '1d'});
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

    const token = JWT.sign({id: user.id}, process.env.SECRET_KEY!, {expiresIn: '15m'});
    const passwordResetLink = `https://boostalk.com/reset/password?token=${token}`;

    //Send password rest link to the user
      await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: Email,
      subject: "Password Reset Link",
      html: `
      <p>Click the link below to reset your password:</p>
        <a href="${passwordResetLink}" target="_blank"><b>${passwordResetLink}</b></a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });
    res.status(200).json({ message: 'Password Reset Link Sent Successfully'})
  } catch (err: any) {
    return res.status(500).json({message: err.message})
  }
});

//Update password
router.post("/reset/password", async (req: any, res: any) => {
  const token = req.query.token;
  const { newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
      console.log('PasswordMismatch, Please input same password');
      return res.status(400).json({message: 'PasswordMismatch, Please input same password'});
    }
  try {
    const decoded: any = JWT.verify(token, process.env.SECRET_KEY!);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({message: 'User not found'})
    }

    const hashedPassword = await bcrypt.hash(confirmPassword, 10);
    user.Password = hashedPassword;

    await user.save();

    res.status(200).json({message: 'Password Updated'});
} catch (err: any) {
  console.error(err.message)
  return res.status(500).json({message: err.message})
}
});


//Change password
router.post("/change/password", authentication, async (req: any, res: any) => {
  
  const userid = req.user.id;
  const userMail = req.user.Email;
  try {
    const user = await User.findOne({ where: { id: userid }});
    if (!user) return res.status(404).json({message: 'User Not Found'});

    const token = JWT.sign({id: user.id,}, process.env.SECRET_KEY!, {expiresIn: '15m'});
    const passwordResetLink = `https://boostalk.com/new/password?token=${token}`;

    //Send password rest link to the user
      await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userMail,
      subject: "Password Reset Link",
      html: `
      <p>Click the link below to reset your password:</p>
        <a href="${passwordResetLink}" target="_blank"><b>${passwordResetLink}</b></a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });
    res.status(200).json({ message: 'Password Reset Link Sent Successfully'})
  } catch (err: any) {
    return res.status(500).json({message: err.message})
  }
});


// Change user password
router.post("/new/password", authentication, async (req: any, res: any) => {
  const { newPassword, confirmNewPassword } = req.body;
  const userid = req.user.id;
  try {
    const user = await User.findOne({where: { id: userid}});

    if (!user) {
      console.log('Password Cannot be found, reset your password with forgot password');
      return res.status(404).json({message: 'Password Cannot be found, reset your password with forgot password'});
    }

    if (newPassword !== confirmNewPassword) {
      console.log('Password Mismatch, the new password input same password for both new pass and confirm password field');
      return res.status(403).json({message: 'Forbiden, Password Mismatch, the new password input same password for both new pass and confirm password field'})
    }

    const hashedPassword = await bcrypt.hash(confirmNewPassword, 10);
    user.Password = hashedPassword;
    await user.save();

    res.status(200).json({message: 'Password Changed Successfully'});
  } catch (err: any) {
    console.error(err.message)
    return res.status(500).json({message: err.message})
  }
});

export default router;
