import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  class: { type: Number, required: true },
  description: { type: String, default: "" },
  subTopics: [
    {
      title: String,
      content: String,
      quiz: [
        {
          question: String,
          options: [String],
          correctAnswer: String,
          explanation: String,
        },
      ],
    },
  ],
});

export default mongoose.models.Material || mongoose.model("Material", materialSchema);
