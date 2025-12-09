// lib/seedMaterials.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Material from "../models/Material";
// import { connectDB } from "./db";

// // Pastikan MONGO_URL ada
// if (!process.env.MONGO_URL) {
//   throw new Error("MongoDB belum terkonfigurasi pada .env.local");
// }

// Data materi
export const materialsData = [
  // ===== KELAS 7 =====
  {
    class: 7,
    title: "Bilangan Bulat",
    description: "Pengertian dan contoh bilangan bulat",
    subTopics: [
      {
        title: "Pengertian bilangan bulat",
        content: "Bilangan bulat adalah ...",
        quiz: [
          {
            question: "Bilangan mana yang termasuk bilangan bulat?",
            options: ["1.5", "0", "-3", "2.7"],
            correctAnswer: "0,-3",
            explanation: "Bilangan bulat meliputi bilangan negatif, nol, dan positif tanpa pecahan."
          }
        ]
      },
      {
        title: "Contoh bilangan bulat",
        content: "Contoh bilangan bulat: -2, -1, 0, 1, 2",
        quiz: []
      },
      {
        title: "Latihan soal",
        content: "Kerjakan soal berikut: ...",
        quiz: []
      }
    ]
  },
  {
    class: 7,
    title: "Bilangan Pecahan",
    description: "Pengertian dan operasi bilangan pecahan",
    subTopics: [
      {
        title: "Pengertian pecahan",
        content: "Pecahan adalah ...",
        quiz: [
          {
            question: "Pecahan 1/2 termasuk pecahan ...?",
            options: ["Biasa", "Campuran", "Desimal"],
            correctAnswer: "Biasa",
            explanation: "1/2 adalah pecahan biasa karena berbentuk a/b."
          }
        ]
      },
      { title: "Penjumlahan & pengurangan", content: "", quiz: [] },
      { title: "Latihan soal", content: "", quiz: [] }
    ]
  }
  // Tambahkan materi lain sesuai kebutuhan dengan format yang sama
];

async function seed() {
  try {
    await mongoose.connect('mongodb+srv://javasrabnii_db_user:R0H5dqcgmWKOtFRD@sch-learning-app.drzqj19.mongodb.net/?appName=sch-learning-app');

    // Hapus data lama
    await Material.deleteMany({});
    console.log("Old materials cleared");

    // Insert data baru
    await Material.insertMany(materialsData);
    console.log("Materials seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
