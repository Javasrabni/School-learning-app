import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  materialTitle: String,
  user: String,
  username: { type: String, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
