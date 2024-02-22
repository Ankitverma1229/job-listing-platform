import express from "express";
import profileController from "../controllers/profileController.js";
import { verifiedUser } from "../middleware/authenticteUser.js";

const profileRouter = express.Router();

// Create a new profile
profileRouter.post('/profile', verifiedUser, profileController.createProfile);

// Get profile details
profileRouter.get('/profile/:profileId', verifiedUser, profileController.getProfile);

// Update profile details
profileRouter.put('/profile/:profileId', verifiedUser, profileController.updateProfile);

export default profileRouter;


