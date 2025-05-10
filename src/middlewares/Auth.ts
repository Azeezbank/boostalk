//Demo file for the Auth Middleware Logic
import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import transporter from '../utils/mailer.js';
import crypto from 'crypto';
import dotenv from 'dotenv';

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
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
});

export default router;