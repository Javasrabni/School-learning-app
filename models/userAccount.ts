import mongoose from "mongoose";

const userAccounts = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, maxLength: 20, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    grade: { type: String, default: "Kelas 7" },
    avatar: { type: String, default: "" },
    level: { type: Number, default: 1 },
    points: { type: Number, default: 0 },
    badges: [String],
    streak: { type: Number, default: 0 },

    // Field baru: progress
    progress: [
      {
        materialTitle: { type: String, required: true },
        subTopicIndex: { type: Number, required: true },
        isRead: { type: Boolean, default: false },
        score: { type: Number, default: 0 },
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userAccounts);
