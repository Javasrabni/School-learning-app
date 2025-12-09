// models/Progress.ts
import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  materialTitle: { type: String, required: true },
  subTopicIndex: { type: Number, required: true },
  isRead: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Progress || mongoose.model("Progress", progressSchema);
