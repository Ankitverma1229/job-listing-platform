import mongoose from "mongoose";

const profile = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    mobile: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    linkedInLink: {
      type: String,
    },
    githubLink: {
      type: String,
    },
    resume: {
      type: String,
    },
    educationDetails: [
      {
        type: {
          type: String,
          
        },
        schoolCollegeName: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
      },
    ],
    projectDetails: [
      {
        projectName: {
          type: String,
        },
        projectDescription: {
          type: String,
        },
        projectType: {
          type: String,
          
        },
        projectLink: {
          type: String,
        },
      },
    ],
    experienceDetails: [
      {
        type: {
          type: String,
          
        },
        companyName: {
          type: String,
        },
        company: {
          type: String,
        },
        website: {
          type: String,
        },
        role: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        coverLetter: {
          type: String,
        },
      },
    ],
    totalCoins: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("profile", profile);
