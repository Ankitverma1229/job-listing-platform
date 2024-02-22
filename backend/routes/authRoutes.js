import express from "express";
import { generateOtp, registerUser } from "../controllers/authController.js";
import { verifiedUser } from "../middleware/authenticteUser.js";

const authRouter = express.Router();

authRouter.route('/generate-otp').post(generateOtp);
authRouter.route('/authenticate-user').post(verifiedUser, registerUser);

export default authRouter;