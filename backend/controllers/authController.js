import User from "../models/user.js";
import nodemailer from "nodemailer";
import { validateData } from "../utils/validateUserInput.js";
import dotenv from "dotenv";
import Jwt from "jsonwebtoken";

dotenv.config();

const secretKey = process.env.JWT_SECRET;
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const newOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const generateOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "Please provide an email address to generate OTP.",
    });
  }

  try {
    validateData(email);

      const OTP = newOtp();

      // Create a token
      const token = Jwt.sign(
        {
          email,
          OTP,
        },
        secretKey,
        {
          expiresIn: 900000,
        }
      );

      const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: "OTP for profile registration",
        html: `<p>Welcome to our application. This is your new OTP, valid for 15 minutes: <strong>${OTP}</strong></p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: "Failed to send email." });
        } else {
          return res
            .status(201)
            .json({ message: "Email sent successfully.", token: token });
        }
      });
    
  } catch (error) {
    console.error("Error in otp generation:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const registerUser = async (req, res) => {
  const { email, otp } = req.body;
  const user = req.user;
  console.log(user);

  if (!email || !otp) {
    return res
      .status(400)
      .json({ error: "All input parameters are required." });
  }

  try {
    validateData(email);
    const existingUser = await User.findOne({ email });

    

    if (user.OTP !== otp) {
      return res.status(401).json({ error: "Invalid OTP." });
    }

    if (user.email !== email) {
      return res
        .status(401)
        .json({
          error: "This OTP is not accossicated with the provided email_id...!",
        });
    }

    // If OTP is valid, create the user
    if (!existingUser) {
      const newUser = await User.create({ email });  
       return res.status(201).json({ message: "OTP verified" });

    } else {
      return res.status(201).json({message: "OTP verified"})
    }

  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ error: error.message });
  }
};
