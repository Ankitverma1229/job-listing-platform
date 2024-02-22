import Profile from "../models/profile.js";
import User from "../models/user.js";
// Controller for handling profile-related operations
const profileController = {
  // Function to create a new profile
  createProfile: async (req, res) => {
    try {
      const { name, mobile, profilePic, linkedInLink, githubLink, resume, educationDetails, projectDetails, experienceDetails } = req.body;
      const userEmail = req.user.email;
      // Calculate total coins earned based on the fields filled
      let totalCoins = 0;
      // Assuming coins mapping is predefined somewhere
      const coinsMapping = {
        name: 10,
        mobile: 25,
        profilePic: 50,
        linkedInLink: 30,
        githubLink: 50,
        resume: 30,
        // Add coins for education, project, and experience details accordingly
      };
      Object.keys(coinsMapping).forEach(field => {
        if (req.body[field]) {
          totalCoins += coinsMapping[field];
        }
      });

      const newProfile = new Profile({
        name,
        mobile,
        profilePic,
        linkedInLink,
        githubLink,
        resume,
        educationDetails,
        projectDetails,
        experienceDetails,
        totalCoins,
      });

      const savedProfile = await newProfile.save();
      await User.findOneAndUpdate({ email: userEmail }, { profile: savedProfile._id });

      res.status(201).json({message: "Profile created successfully..",savedProfile, profileId: savedProfile._id});
    } catch (error) {
      console.error("Error creating profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Function to update profile details
  updateProfile: async (req, res) => {
    try {
      const { profileId } = req.params;
      const updatedProfile = await Profile.findByIdAndUpdate(profileId, req.body, { new: true });
      
      if (!updatedProfile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      res.status(200).json(updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Function to get profile details
  getProfile: async (req, res) => {
    try {
      const { profileId } = req.params;
      const profile = await Profile.findById(profileId);
      
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      res.status(200).json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Add more profile-related functions as needed
};

export default profileController;
