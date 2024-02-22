import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("user", userSchema);
