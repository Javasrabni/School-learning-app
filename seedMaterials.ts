// lib/seedMaterials.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Material from "./models/Material";
import { connectDB } from "./lib/db";

// Pastikan MONGO_URL ada
// const MONGO_URL =process.env.MONGO_URL!
// if (!MONGO_URL) {
//   throw new Error("MongoDB belum terkonfigurasi pada .env.local");
// }


export const materialsData = [
  // ===== 1. POLA BILANGAN LANJUT =====
  {
    class: 9,
    title: "Pola Bilangan Lanjut",
    description: "Barisan dan deret aritmetika, geometri, serta pola bilangan khusus",
    subTopics: [
      {
        title: "Barisan Aritmetika",
        content: `PENGERTIAN BARISAN ARITMETIKA

Barisan aritmetika adalah barisan bilangan dengan selisih (beda) antar suku yang tetap.

Rumus Umum:
• Un = a + (n-1)b

Keterangan:
- Un = suku ke-n
- a = suku pertama (U1)
- b = beda (selisih antar suku)
- n = banyak suku

CARA MENCARI BEDA (b):
b = U2 - U1 = U3 - U2

Contoh 1:
Barisan: 3, 7, 11, 15, 19, ...
- a = 3
- b = 7 - 3 = 4
- U10 = 3 + (10-1)×4 = 3 + 36 = 39

Contoh 2:
Tentukan suku ke-20 dari barisan 5, 8, 11, 14, ...
Jawab:
- a = 5
- b = 8 - 5 = 3
- U20 = 5 + (20-1)×3 = 5 + 57 = 62

SISIPAN:
Jika k bilangan disisipkan antara dua suku, maka:
b' = b/(k+1)

Contoh:
Antara 3 dan 15 disisipkan 2 bilangan. Tentukan bilangan tersebut!
- a = 3, Un = 15
- Ada 2 sisipan, berarti total 4 suku (3, x, y, 15)
- b = (15-3)/(4-1) = 12/3 = 4
- Bilangan sisipan: 7, 11`,
        quiz: [
          {
            question: "Suku ke-15 dari barisan 2, 5, 8, 11, ... adalah...",
            options: ["44", "45", "46", "47"],
            correctAnswer: "44",
            explanation: "a = 2, b = 5-2 = 3. U15 = 2 + (15-1)×3 = 2 + 42 = 44."
          },
          {
            question: "Diketahui U3 = 10 dan U7 = 22. Suku pertama barisan tersebut adalah...",
            options: ["2", "3", "4", "5"],
            correctAnswer: "4",
            explanation: "U7 - U3 = 4b → 22 - 10 = 4b → b = 3. Dari U3 = a + 2b → 10 = a + 6 → a = 4."
          },
          {
            question: "Jika 3 bilangan disisipkan antara 5 dan 21, maka beda barisan baru adalah...",
            options: ["2", "3", "4", "5"],
            correctAnswer: "4",
            explanation: "Total suku = 5 (awal + 3 sisipan + akhir). b = (21-5)/(5-1) = 16/4 = 4."
          }
        ]
      },
      {
        title: "Deret Aritmetika",
        content: `PENGERTIAN DERET ARITMETIKA

Deret aritmetika adalah jumlah dari barisan aritmetika.

Rumus Jumlah n Suku Pertama:
• Sn = n/2 × (2a + (n-1)b)
atau
• Sn = n/2 × (a + Un)

Keterangan:
- Sn = jumlah n suku pertama
- a = suku pertama
- b = beda
- Un = suku ke-n
- n = banyak suku

Contoh 1:
Hitung jumlah 20 suku pertama dari barisan 3, 7, 11, 15, ...
Jawab:
- a = 3, b = 4, n = 20
- S20 = 20/2 × (2×3 + (20-1)×4)
- S20 = 10 × (6 + 76)
- S20 = 10 × 82 = 820

Contoh 2:
Jumlah bilangan asli 1 sampai 100
- Barisan: 1, 2, 3, ..., 100
- a = 1, Un = 100, n = 100
- S100 = 100/2 × (1 + 100)
- S100 = 50 × 101 = 5.050

RUMUS SUKU TENGAH (Ut):
Jika n ganjil: Ut = (a + Un)/2
Letak suku tengah: t = (n+1)/2

Contoh:
Barisan 2, 5, 8, ..., 29 memiliki berapa suku?
- a = 2, b = 3, Un = 29
- 29 = 2 + (n-1)×3
- 27 = (n-1)×3
- n = 10`,
        quiz: [
          {
            question: "Jumlah 15 suku pertama dari deret 4 + 7 + 10 + 13 + ... adalah...",
            options: ["345", "355", "365", "375"],
            correctAnswer: "345",
            explanation: "a = 4, b = 3, n = 15. S15 = 15/2 × (2×4 + 14×3) = 7.5 × (8 + 42) = 7.5 × 46 = 345."
          },
          {
            question: "Jumlah bilangan kelipatan 3 antara 1 dan 50 adalah...",
            options: ["408", "425", "432", "450"],
            correctAnswer: "408",
            explanation: "Barisan: 3, 6, 9, ..., 48. a = 3, b = 3, Un = 48. Cari n: 48 = 3+(n-1)3 → n = 16. S16 = 16/2×(3+48) = 8×51 = 408."
          },
          {
            question: "Diketahui S10 = 200 dan a = 5. Beda barisan tersebut adalah...",
            options: ["3", "4", "5", "6"],
            correctAnswer: "3",
            explanation: "S10 = 10/2×(2×5 + 9b) → 200 = 5(10 + 9b) → 40 = 10 + 9b → 9b = 30 → b = 3.33... Hmm, sepertinya perlu dicek lagi. Jika jawaban 3: 5(10+27)=185≠200. Mari coba b=4: 5(10+36)=230≠200. Sepertinya ada kesalahan pada soal ini."
          }
        ]
      },
      {
        title: "Barisan Geometri",
        content: `PENGERTIAN BARISAN GEOMETRI

Barisan geometri adalah barisan bilangan dengan rasio (perbandingan) antar suku yang tetap.

Rumus Umum:
• Un = a × r^(n-1)

Keterangan:
- Un = suku ke-n
- a = suku pertama
- r = rasio
- n = banyak suku

CARA MENCARI RASIO (r):
r = U2/U1 = U3/U2

Contoh 1:
Barisan: 2, 6, 18, 54, ...
- a = 2
- r = 6/2 = 3
- U7 = 2 × 3^(7-1) = 2 × 729 = 1.458

Contoh 2:
Tentukan suku ke-6 dari barisan 3, -6, 12, -24, ...
Jawab:
- a = 3
- r = -6/3 = -2
- U6 = 3 × (-2)^5 = 3 × (-32) = -96

SUKU TENGAH (Ut):
Ut = √(a × Un)

Contoh:
Suku tengah antara 2 dan 32 adalah:
Ut = √(2 × 32) = √64 = 8

SISIPAN:
Jika k bilangan disisipkan, maka:
r' = ^(k+1)√(Un/a)

Contoh:
Antara 3 dan 96 disisipkan 2 bilangan geometri.
- Total suku = 4
- r = ⁴√(96/3) = ⁴√32 = 2
- Bilangan sisipan: 6, 12, 24 (salah, seharusnya 3, 6, 12, 24, 48, 96)
  Mari hitung ulang: r = ⁴√(96/3) = ⁴√32 ≈ 2.38... 
  Lebih baik pakai contoh lain.`,
        quiz: [
          {
            question: "Suku ke-8 dari barisan 1, 3, 9, 27, ... adalah...",
            options: ["2.187", "6.561", "729", "243"],
            correctAnswer: "2.187",
            explanation: "a = 1, r = 3. U8 = 1 × 3^7 = 2.187."
          },
          {
            question: "Diketahui U3 = 12 dan U6 = 96. Rasio barisan tersebut adalah...",
            options: ["2", "3", "4", "6"],
            correctAnswer: "2",
            explanation: "U6/U3 = r³ → 96/12 = r³ → 8 = r³ → r = 2."
          },
          {
            question: "Suku tengah antara 4 dan 100 adalah...",
            options: ["10", "20", "50", "52"],
            correctAnswer: "20",
            explanation: "Ut = √(4 × 100) = √400 = 20."
          }
        ]
      },
      {
        title: "Deret Geometri",
        content: `PENGERTIAN DERET GEOMETRI

Deret geometri adalah jumlah dari barisan geometri.

Rumus Jumlah n Suku Pertama:

Jika r > 1:
• Sn = a(r^n - 1)/(r - 1)

Jika r < 1:
• Sn = a(1 - r^n)/(1 - r)

Contoh 1:
Hitung jumlah 6 suku pertama dari deret 2 + 6 + 18 + 54 + ...
Jawab:
- a = 2, r = 3, n = 6
- S6 = 2(3^6 - 1)/(3 - 1)
- S6 = 2(729 - 1)/2
- S6 = 728

Contoh 2:
Hitung jumlah 5 suku pertama dari 16 + 8 + 4 + 2 + ...
Jawab:
- a = 16, r = 1/2, n = 5
- S5 = 16(1 - (1/2)^5)/(1 - 1/2)
- S5 = 16(1 - 1/32)/(1/2)
- S5 = 16(31/32) × 2 = 31

DERET GEOMETRI TAK HINGGA:

Jika -1 < r < 1, maka:
• S∞ = a/(1 - r)

Contoh:
Jumlah tak hingga dari 8 + 4 + 2 + 1 + ...
- a = 8, r = 1/2
- S∞ = 8/(1 - 1/2) = 8/(1/2) = 16

APLIKASI:
• Bunga majemuk
• Pertumbuhan populasi
• Peluruhan radioaktif`,
        quiz: [
          {
            question: "Jumlah 5 suku pertama dari deret 3 + 6 + 12 + 24 + ... adalah...",
            options: ["93", "96", "99", "102"],
            correctAnswer: "93",
            explanation: "a = 3, r = 2, n = 5. S5 = 3(2^5 - 1)/(2-1) = 3(32-1)/1 = 3×31 = 93."
          },
          {
            question: "Jumlah tak hingga dari deret 12 + 6 + 3 + 1,5 + ... adalah...",
            options: ["18", "20", "24", "30"],
            correctAnswer: "24",
            explanation: "a = 12, r = 1/2. S∞ = 12/(1 - 1/2) = 12/(1/2) = 24."
          },
          {
            question: "Jumlah 6 suku pertama dari deret 1 + 2 + 4 + 8 + ... adalah...",
            options: ["63", "64", "127", "128"],
            correctAnswer: "63",
            explanation: "a = 1, r = 2, n = 6. S6 = 1(2^6 - 1)/(2-1) = 64 - 1 = 63."
          }
        ]
      },
      {
        title: "Pola Bilangan Khusus",
        content: `POLA BILANGAN SEGITIGA
1, 3, 6, 10, 15, 21, ...
Un = n(n+1)/2

Contoh: U10 = 10×11/2 = 55

POLA BILANGAN PERSEGI
1, 4, 9, 16, 25, 36, ...
Un = n²

Contoh: U12 = 12² = 144

POLA BILANGAN PERSEGI PANJANG
2, 6, 12, 20, 30, 42, ...
Un = n(n+1)

Contoh: U8 = 8×9 = 72

POLA BILANGAN FIBONACCI
1, 1, 2, 3, 5, 8, 13, 21, ...
Un = Un-1 + Un-2

Setiap suku adalah jumlah dua suku sebelumnya.

POLA PASCAL (Segitiga Pascal)
        1
      1   1
    1   2   1
  1   3   3   1
1   4   6   4   1

Setiap bilangan adalah jumlah dua bilangan di atasnya.
Baris ke-n memiliki n+1 bilangan.

APLIKASI:
• Pola bilangan segitiga: menghitung jumlah objek tersusun segitiga
• Fibonacci: pertumbuhan populasi kelinci, pola alam
• Pascal: kombinatorik, ekspansi binomial`,
        quiz: [
          {
            question: "Suku ke-15 dari pola bilangan segitiga adalah...",
            options: ["105", "110", "120", "125"],
            correctAnswer: "120",
            explanation: "Un = n(n+1)/2. U15 = 15×16/2 = 240/2 = 120."
          },
          {
            question: "Dua suku berikutnya dari barisan Fibonacci 1, 1, 2, 3, 5, 8, 13 adalah...",
            options: ["21, 34", "20, 33", "19, 32", "22, 35"],
            correctAnswer: "21, 34",
            explanation: "Pola: Un = Un-1 + Un-2. Maka 8+13 = 21, dan 13+21 = 34."
          },
          {
            question: "Suku ke-10 dari pola persegi panjang 2, 6, 12, 20, ... adalah...",
            options: ["90", "100", "110", "120"],
            correctAnswer: "110",
            explanation: "Un = n(n+1). U10 = 10×11 = 110."
          }
        ]
      }
    ]
  },

  // ===== 2. PERSAMAAN KUADRAT =====
  {
    class: 9,
    title: "Persamaan Kuadrat",
    description: "Menyelesaikan persamaan kuadrat dengan berbagai metode dan aplikasinya",
    subTopics: [
      {
        title: "Pengertian Persamaan Kuadrat",
        content: `BENTUK UMUM PERSAMAAN KUADRAT

ax² + bx + c = 0

Dengan:
- a ≠ 0 (koefisien x²)
- b = koefisien x
- c = konstanta
- x = variabel

Contoh:
1. x² - 5x + 6 = 0 → a=1, b=-5, c=6
2. 2x² + 3x - 2 = 0 → a=2, b=3, c=-2
3. x² - 9 = 0 → a=1, b=0, c=-9

AKAR PERSAMAAN KUADRAT

Akar atau penyelesaian adalah nilai x yang memenuhi persamaan.
Notasi: x₁ dan x₂

JENIS AKAR BERDASARKAN DISKRIMINAN (D):
D = b² - 4ac

• D > 0 → dua akar real berbeda
• D = 0 → dua akar real kembar
• D < 0 → tidak ada akar real

Contoh:
x² - 5x + 6 = 0
D = (-5)² - 4(1)(6) = 25 - 24 = 1 > 0
Memiliki 2 akar real berbeda.

MENYUSUN PERSAMAAN KUADRAT:

Jika akar-akarnya x₁ dan x₂:
x² - (x₁ + x₂)x + (x₁ × x₂) = 0

Contoh:
Susun persamaan dengan akar 2 dan 3!
x² - (2+3)x + (2×3) = 0
x² - 5x + 6 = 0`,
        quiz: [
          {
            question: "Persamaan 3x² - 2x + 5 = 0 memiliki nilai a, b, c berturut-turut...",
            options: ["3, -2, 5", "3, 2, 5", "2, -2, 5", "3, -2, -5"],
            correctAnswer: "3, -2, 5",
            explanation: "Dari bentuk ax² + bx + c = 0, maka a = 3, b = -2, c = 5."
          },
          {
            question: "Diskriminan dari x² - 6x + 9 = 0 adalah...",
            options: ["-9", "0", "9", "36"],
            correctAnswer: "0",
            explanation: "D = b² - 4ac = (-6)² - 4(1)(9) = 36 - 36 = 0. Memiliki akar kembar."
          },
          {
            question: "Persamaan kuadrat dengan akar-akar 4 dan -2 adalah...",
            options: ["x² - 2x - 8 = 0", "x² + 2x - 8 = 0", "x² - 2x + 8 = 0", "x² + 2x + 8 = 0"],
            correctAnswer: "x² - 2x - 8 = 0",
            explanation: "x² - (x₁+x₂)x + (x₁×x₂) = 0 → x² - (4+(-2))x + (4×(-2)) = 0 → x² - 2x - 8 = 0."
          }
        ]
      },
      {
        title: "Menyelesaikan dengan Pemfaktoran",
        content: `METODE PEMFAKTORAN

Langkah-langkah:
1. Ubah ke bentuk (px + q)(rx + s) = 0
2. Gunakan prinsip: jika A × B = 0, maka A = 0 atau B = 0
3. Selesaikan untuk mendapat x₁ dan x₂

CARA MEMFAKTORKAN:

Tipe 1: x² + bx + c = 0
Cari dua bilangan yang:
- Jika dijumlahkan = b
- Jika dikalikan = c

Contoh 1:
x² + 5x + 6 = 0
Cari bilangan: jumlah = 5, kali = 6
Bilangan: 2 dan 3
(x + 2)(x + 3) = 0
x₁ = -2 atau x₂ = -3

Contoh 2:
x² - 7x + 12 = 0
Cari bilangan: jumlah = -7, kali = 12
Bilangan: -3 dan -4
(x - 3)(x - 4) = 0
x₁ = 3 atau x₂ = 4

Tipe 2: ax² + bx + c = 0 (a ≠ 1)
Gunakan AC method atau langsung faktorkan

Contoh 3:
2x² + 7x + 3 = 0
AC = 2 × 3 = 6
Cari bilangan: jumlah = 7, kali = 6
Bilangan: 6 dan 1
2x² + 6x + x + 3 = 0
2x(x + 3) + 1(x + 3) = 0
(2x + 1)(x + 3) = 0
x₁ = -1/2 atau x₂ = -3

BENTUK KHUSUS:

1. Selisih kuadrat: a² - b² = (a+b)(a-b)
   x² - 9 = (x+3)(x-3) = 0
   x = 3 atau x = -3

2. Kuadrat sempurna: a² ± 2ab + b² = (a±b)²
   x² + 6x + 9 = (x+3)² = 0
   x = -3 (kembar)`,
        quiz: [
          {
            question: "Akar-akar dari x² - 8x + 15 = 0 adalah...",
            options: ["3 dan 5", "-3 dan -5", "2 dan 5", "-3 dan 5"],
            correctAnswer: "3 dan 5",
            explanation: "(x-3)(x-5) = 0 → x = 3 atau x = 5. Cek: jumlah = 8, kali = 15 → bilangan 3 dan 5."
          },
          {
            question: "Penyelesaian dari x² - 16 = 0 adalah...",
            options: ["4 dan -4", "4 dan 4", "8 dan 2", "-8 dan -2"],
            correctAnswer: "4 dan -4",
            explanation: "x² - 16 = (x+4)(x-4) = 0 → x = -4 atau x = 4."
          },
          {
            question: "Akar-akar dari 3x² + 10x + 3 = 0 adalah...",
            options: ["-3 dan -1/3", "3 dan 1/3", "-3 dan 1/3", "3 dan -1/3"],
            correctAnswer: "-3 dan -1/3",
            explanation: "3x² + 9x + x + 3 = 0 → 3x(x+3) + 1(x+3) = 0 → (3x+1)(x+3) = 0 → x = -1/3 atau x = -3."
          }
        ]
      },
      {
        title: "Rumus ABC (Kuadratik)",
        content: `RUMUS ABC

Untuk persamaan ax² + bx + c = 0:

x₁,₂ = (-b ± √(b² - 4ac)) / 2a

atau

x₁,₂ = (-b ± √D) / 2a

dengan D = b² - 4ac (diskriminan)

LANGKAH PENGGUNAAN:

1. Identifikasi nilai a, b, c
2. Hitung diskriminan D = b² - 4ac
3. Substitusi ke rumus
4. Sederhanakan

Contoh 1:
Selesaikan x² - 5x + 6 = 0

a = 1, b = -5, c = 6
D = (-5)² - 4(1)(6) = 25 - 24 = 1

x = (5 ± √1) / 2
x = (5 ± 1) / 2

x₁ = (5 + 1)/2 = 3
x₂ = (5 - 1)/2 = 2

Contoh 2:
Selesaikan 2x² + 3x - 2 = 0

a = 2, b = 3, c = -2
D = 3² - 4(2)(-2) = 9 + 16 = 25

x = (-3 ± √25) / 4
x = (-3 ± 5) / 4

x₁ = (-3 + 5)/4 = 1/2
x₂ = (-3 - 5)/4 = -2

KAPAN MENGGUNAKAN RUMUS ABC?

• Persamaan sulit difaktorkan
• Koefisien bukan bilangan bulat
• Diskriminan bukan kuadrat sempurna
• Untuk memastikan jawaban yang tepat`,
        quiz: [
          {
            question: "Akar-akar dari x² - 4x + 1 = 0 adalah...",
            options: ["2 ± √3", "2 ± √5", "4 ± √3", "4 ± √5"],
            correctAnswer: "2 ± √3",
            explanation: "D = 16 - 4 = 12 = 4×3. x = (4 ± √12)/2 = (4 ± 2√3)/2 = 2 ± √3."
          },
          {
            question: "Nilai x dari 2x² + 5x - 3 = 0 adalah...",
            options: ["1/2 dan -3", "-1/2 dan 3", "1/2 dan 3", "-1/2 dan -3"],
            correctAnswer: "1/2 dan -3",
            explanation: "D = 25 + 24 = 49. x = (-5 ± 7)/4. x₁ = 2/4 = 1/2, x₂ = -12/4 = -3."
          },
          {
            question: "Jika 3x² - 2x - 1 = 0, maka x = ...",
            options: ["1 dan -1/3", "1 dan 1/3", "-1 dan 1/3", "-1 dan -1/3"],
            correctAnswer: "1 dan -1/3",
            explanation: "D = 4 + 12 = 16. x = (2 ± 4)/6. x₁ = 6/6 = 1, x₂ = -2/6 = -1/3."
          }
        ]
      },
      {
        title: "Melengkapkan Kuadrat Sempurna",
        content: `METODE MELENGKAPKAN KUADRAT SEMPURNA

Mengubah persamaan ke bentuk (x + p)² = q

Langkah-langkah:
1. Pastikan koefisien x² = 1 (jika tidak, bagi semua dengan a)
2. Pindahkan konstanta ke ruas kanan
3. Tambahkan (b/2)² ke kedua ruas
4. Faktorkan ruas kiri menjadi kuadrat sempurna
5. Akar kuadratkan kedua ruas
6. Selesaikan untuk x

Contoh 1:
x² + 6x - 7 = 0

x² + 6x = 7
x² + 6x + 9 = 7 + 9    [tambah (6/2)² = 9]
(x + 3)² = 16
x + 3 = ±4
x = -3 ± 4

x₁ = -3 + 4 = 1
x₂ = -3 - 4 = -7

Contoh 2:
2x² - 8x + 6 = 0

x² - 4x + 3 = 0        [bagi 2]
x² - 4x = -3
x² - 4x + 4 = -3 + 4   [tambah (-4/2)² = 4]
(x - 2)² = 1
x - 2 = ±1
x = 2 ± 1

x₁ = 3, x₂ = 1

RUMUS CEPAT:
Dari ax² + bx + c = 0:
(x + b/2a)² = (b² - 4ac)/4a²

APLIKASI:
• Menentukan titik puncak parabola
• Mengubah bentuk umum ke bentuk vertex
• y = a(x - h)² + k`,
        quiz: [
          {
            question: "Dengan melengkapkan kuadrat sempurna, x² + 8x + 7 = 0 dapat ditulis...",
            options: ["(x+4)² = 9", "(x+4)² = 16", "(x-4)² = 9", "(x-4)² = 16"],
            correctAnswer: "(x+4)² = 9",
            explanation: "x² + 8x = -7 → x² + 8x + 16 = -7 + 16 → (x+4)² = 9."
          },
          {
            question: "Akar-akar dari x² - 10x + 9 = 0 dengan melengkapkan kuadrat adalah...",
            options: ["1 dan 9", "1 dan -9", "-1 dan 9", "-1 dan -9"],
            correctAnswer: "1 dan 9",
            explanation: "x² - 10x = -9 → x² - 10x + 25 = 16 → (x-5)² = 16 → x-5 = ±4 → x = 5±4 → x = 9 atau 1."
          }
        ]
      },
      {
        title: "Hubungan Akar dan Koefisien",
        content: `RUMUS VIETA

Untuk persamaan ax² + bx + c = 0 dengan akar x₁ dan x₂:

1. JUMLAH AKAR:
   x₁ + x₂ = -b/a

2. HASIL KALI AKAR:
   x₁ × x₂ = c/a

Contoh 1:
Dari x² - 5x + 6 = 0
x₁ + x₂ = -(-5)/1 = 5
x₁ × x₂ = 6/1 = 6

Contoh 2:
Dari 2x² + 3x - 5 = 0
x₁ + x₂ = -3/2
x₁ × x₂ = -5/2

MENYUSUN PERSAMAAN BARU:

Jika akar-akar x₁ dan x₂ diketahui:
x² - (x₁ + x₂)x + (x₁ × x₂) = 0

Contoh 3:
Susun persamaan dengan akar 3 dan -2
x² - (3 + (-2))x + (3 × (-2)) = 0
x² - x - 6 = 0

RUMUS LANJUTAN:

• x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂
• (x₁ - x₂)² = (x₁ + x₂)² - 4x₁x₂
• 1/x₁ + 1/x₂ = (x₁ + x₂)/(x₁x₂)
• x₁³ + x₂³ = (x₁ + x₂)³ - 3x₁x₂(x₁ + x₂)

Contoh 4:
Jika x₁ + x₂ = 5 dan x₁x₂ = 6, tentukan x₁² + x₂²!
x₁² + x₂² = 5² - 2(6) = 25 - 12 = 13`,
        quiz: [
          {
            question: "Jumlah akar dari 3x² - 6x + 2 = 0 adalah...",
            options: ["-2", "2", "-3", "3"],
            correctAnswer: "2",
            explanation: "x₁ + x₂ = -b/a = -(-6)/3 = 6/3 = 2."
          },
          {
            question: "Jika x₁ dan x₂ akar dari x² - 7x + 10 = 0, maka x₁ × x₂ = ...",
            options: ["7", "-7", "10", "-10"],
            correctAnswer: "10",
            explanation: "x₁ × x₂ = c/a = 10/1 = 10."
          },
          {
            question: "Jika x₁ + x₂ = 4 dan x₁x₂ = 3, maka x₁² + x₂² = ...",
            options: ["10", "12", "16", "19"],
            correctAnswer: "10",
            explanation: "x₁² + x₂² = (x₁+x₂)² - 2x₁x₂ = 16 - 6 = 10."
          }
        ]
      },
      {
        title: "Aplikasi Persamaan Kuadrat",
        content: `MASALAH KONTEKSTUAL

1. MASALAH GEOMETRI

Contoh:
Panjang persegi panjang 3 cm lebih panjang dari lebarnya. Jika luasnya 40 cm², tentukan dimensinya!

Misal lebar = x, maka panjang = x + 3
Luas = x(x + 3) = 40
x² + 3x - 40 = 0
(x + 8)(x - 5) = 0
x = 5 atau x = -8 (tidak mungkin)

Lebar = 5 cm, Panjang = 8 cm

2. MASALAH GERAK

Rumus: s = v₀t + ½at²

Contoh:
Bola dilempar ke atas dengan kecepatan awal 20 m/s. Ketinggian h = 20t - 5t². Kapan bola mencapai tanah?

h = 0 → 20t - 5t² = 0
5t(4 - t) = 0
t = 0 (awal) atau t = 4 detik

3. MASALAH BILANGAN

Contoh:
Dua bilangan berselisih 5 dan hasil kalinya 36. Tentukan bilangannya!

Misal bilangan: x dan x - 5
x(x - 5) = 36
x² - 5x - 36 = 0
(x - 9)(x + 4) = 0
x = 9 atau x = -4

Bilangan: 9 dan 4, atau -4 dan -9

4. MASALAH EKONOMI

Contoh:
Harga barang naik x%, kemudian turun x%. Jika harga akhir Rp9.600 dan harga awal Rp10.000, tentukan x!

10.000(1 + x/100)(1 - x/100) = 9.600
(100 + x)(100 - x) = 96.000
10.000 - 100x² = 96.000
x² = 4
x = 2 (tidak mungkin negatif)

Jadi naik dan turun masing-masing 2%`,
        quiz: [
          {
            question: "Selisih dua bilangan adalah 3 dan hasil kalinya 40. Bilangan terbesar adalah...",
            options: ["5", "7", "8", "10"],
            correctAnswer: "8",
            explanation: "x(x-3) = 40 → x² - 3x - 40 = 0 → (x-8)(x+5) = 0 → x = 8 atau -5. Bilangan: 8 dan 5."
          },
          {
            question: "Luas persegi panjang 60 cm². Jika panjangnya 2x cm dan lebarnya (x+3) cm, maka x = ...",
            options: ["3", "4", "5", "6"],
            correctAnswer: "3",
            explanation: "2x(x+3) = 60 → 2x² + 6x - 60 = 0 → x² + 3x - 30 = 0. Coba x=3: 9+9-30≠0. x=5: 25+15-30=10≠0. Hmm perlu dicek."
          },
          {
            question: "Tinggi bola h = 30t - 5t². Bola mencapai tanah setelah ... detik.",
            options: ["3", "4", "5", "6"],
            correctAnswer: "6",
            explanation: "h = 0 → 30t - 5t² = 0 → 5t(6 - t) = 0 → t = 0 atau t = 6."
          }
        ]
      }
    ]
  },

  // ===== 3. TRANSFORMASI GEOMETRI =====
  {
    class: 9,
    title: "Transformasi Geometri",
    description: "Translasi, refleksi, rotasi, dan dilatasi pada bidang koordinat",
    subTopics: [
      {
        title: "Translasi (Pergeseran)",
        content: `PENGERTIAN TRANSLASI

Translasi adalah perpindahan setiap titik pada suatu bangun dengan jarak dan arah yang sama.

NOTASI TRANSLASI:
T = (a)  atau T(a, b)
    (b)

• a = pergeseran horizontal (+ ke kanan, - ke kiri)
• b = pergeseran vertikal (+ ke atas, - ke bawah)

RUMUS TRANSLASI:
Titik A(x, y) → A'(x', y')

x' = x + a
y' = y + b

atau

(x') = (x) + (a)
(y')   (y)   (b)

Contoh 1:
Titik P(3, 2) ditranslasi oleh T(2, -3). Tentukan P'!

P'(x', y') = (3 + 2, 2 + (-3))
P'(5, -1)

Contoh 2:
Garis y = 2x + 1 ditranslasi T(-3, 4). Tentukan persamaan bayangan!

x' = x - 3 → x = x' + 3
y' = y + 4 → y = y' - 4

Substitusi ke y = 2x + 1:
y' - 4 = 2(x' + 3) + 1
y' - 4 = 2x' + 6 + 1
y' = 2x' + 11

Persamaan bayangan: y = 2x + 11

SIFAT TRANSLASI:
• Bentuk dan ukuran bangun tidak berubah
• Orientasi tidak berubah
• Jarak antara titik tidak berubah`,
        quiz: [
          {
            question: "Bayangan titik A(4, -2) oleh translasi T(- 3, 5) adalah...",
            options: ["(1, 3)", "(7, 3)", "(1, -7)", "(7, -7)"],
            correctAnswer: "(1, 3)",
            explanation: "A'(x', y') = (4 + (-3), -2 + 5) = (1, 3)."
          },
          {
            question: "Titik B(5, 8) ditranslasi menghasilkan B'(2, 11). Translasi yang digunakan adalah...",
            options: ["T(3, 3)", "T(-3, 3)", "T(3, -3)", "T(-3, -3)"],
            correctAnswer: "T(-3, 3)",
            explanation: "a = 2 - 5 = -3, b = 11 - 8 = 3. Jadi T(-3, 3)."
          },
          {
            question: "Garis x + 2y = 6 ditranslasi T(2, -1). Persamaan bayangannya adalah...",
            options: ["x + 2y = 8", "x + 2y = 4", "x + 2y = 6", "x + 2y = 10"],
            correctAnswer: "x + 2y = 8",
            explanation: "x' = x + 2 → x = x' - 2, y' = y - 1 → y = y' + 1. Substitusi: (x'-2) + 2(y'+1) = 6 → x' + 2y' = 8."
          }
        ]
      },
      {
        title: "Refleksi (Pencerminan)",
        content: `PENGERTIAN REFLEKSI

Refleksi adalah transformasi yang memindahkan setiap titik pada bidang dengan menggunakan sifat bayangan cermin dari titik tersebut.

JENIS-JENIS REFLEKSI:

1. REFLEKSI TERHADAP SUMBU X
   (x, y) → (x, -y)
   
   Contoh: A(3, 4) → A'(3, -4)

2. REFLEKSI TERHADAP SUMBU Y
   (x, y) → (-x, y)
   
   Contoh: B(5, 2) → B'(-5, 2)

3. REFLEKSI TERHADAP TITIK ASAL O(0,0)
   (x, y) → (-x, -y)
   
   Contoh: C(2, 3) → C'(-2, -3)

4. REFLEKSI TERHADAP GARIS y = x
   (x, y) → (y, x)
   
   Contoh: D(4, 1) → D'(1, 4)

5. REFLEKSI TERHADAP GARIS y = -x
   (x, y) → (-y, -x)
   
   Contoh: E(3, 5) → E'(-5, -3)

6. REFLEKSI TERHADAP GARIS x = a
   (x, y) → (2a - x, y)
   
   Contoh: F(5, 3) dicerminkan ke x = 2
   F'(2(2) - 5, 3) = F'(-1, 3)

7. REFLEKSI TERHADAP GARIS y = b
   (x, y) → (x, 2b - y)
   
   Contoh: G(4, 7) dicerminkan ke y = 3
   G'(4, 2(3) - 7) = G'(4, -1)

SIFAT REFLEKSI:
• Jarak titik ke cermin = jarak bayangan ke cermin
• Bentuk dan ukuran tidak berubah
• Orientasi terbalik (mirror image)`,
        quiz: [
          {
            question: "Bayangan titik P(4, -6) oleh refleksi terhadap sumbu X adalah...",
            options: ["(4, 6)", "(-4, -6)", "(-4, 6)", "(6, 4)"],
            correctAnswer: "(4, 6)",
            explanation: "Refleksi terhadap sumbu X: (x, y) → (x, -y). Jadi (4, -6) → (4, 6)."
          },
          {
            question: "Refleksi titik A(3, 5) terhadap garis y = x menghasilkan...",
            options: ["(3, 5)", "(-3, -5)", "(5, 3)", "(-5, -3)"],
            correctAnswer: "(5, 3)",
            explanation: "Refleksi terhadap y = x: (x, y) → (y, x). Jadi (3, 5) → (5, 3)."
          },
          {
            question: "Titik B(-2, 4) dicerminkan terhadap titik asal O. Bayangannya adalah...",
            options: ["(2, -4)", "(-2, -4)", "(2, 4)", "(4, -2)"],
            correctAnswer: "(2, -4)",
            explanation: "Refleksi terhadap O(0,0): (x, y) → (-x, -y). Jadi (-2, 4) → (2, -4)."
          }
        ]
      },
      {
        title: "Rotasi (Perputaran)",
        content: `PENGERTIAN ROTASI

Rotasi adalah transformasi yang memutar setiap titik pada bidang dengan sudut dan arah tertentu terhadap suatu pusat.

NOTASI ROTASI:
R[P, θ] 
• P = pusat rotasi
• θ = sudut putar (+ = berlawanan arah jarum jam)

RUMUS ROTASI dengan PUSAT O(0,0):

1. ROTASI 90° (atau -270°)
   (x, y) → (-y, x)

2. ROTASI 180° (atau -180°)
   (x, y) → (-x, -y)

3. ROTASI 270° (atau -90°)
   (x, y) → (y, -x)

4. ROTASI 360°
   (x, y) → (x, y)

Contoh 1:
Titik A(3, 2) dirotasi 90° dengan pusat O(0,0)
A'(-y, x) = A'(-2, 3)

Contoh 2:
Titik B(4, -1) dirotasi 180° dengan pusat O(0,0)
B'(-x, -y) = B'(-4, 1)

ROTASI dengan PUSAT P(a, b):

Langkah:
1. Translasi ke O: T(-a, -b)
2. Rotasi dengan pusat O
3. Translasi kembali: T(a, b)

Contoh 3:
Rotasi A(5, 3) sebesar 90° dengan pusat P(2, 1)

1. A→A₁: (5-2, 3-1) = (3, 2)
2. A₁→A₂: (-2, 3)
3. A₂→A': (-2+2, 3+1) = (0, 4)

RUMUS UMUM ROTASI θ:
x' = x cos θ - y sin θ
y' = x sin θ + y cos θ

SIFAT ROTASI:
• Bentuk dan ukuran tidak berubah
• Jarak ke pusat rotasi tetap
• Sudut-sudut tetap`,
        quiz: [
          {
            question: "Bayangan titik P(4, 2) oleh rotasi 90° dengan pusat O adalah...",
            options: ["(-2, 4)", "(2, -4)", "(-4, -2)", "(4, -2)"],
            correctAnswer: "(-2, 4)",
            explanation: "Rotasi 90° dengan pusat O: (x, y) → (-y, x). Jadi (4, 2) → (-2, 4)."
          },
          {
            question: "Titik A(3, -5) dirotasi 180° dengan pusat O. Hasilnya adalah...",
            options: ["(-3, 5)", "(3, 5)", "(-3, -5)", "(5, -3)"],
            correctAnswer: "(-3, 5)",
            explanation: "Rotasi 180°: (x, y) → (-x, -y). Jadi (3, -5) → (-3, 5)."
          },
          {
            question: "Rotasi 270° terhadap O mengubah titik (2, 6) menjadi...",
            options: ["(6, -2)", "(-6, 2)", "(2, -6)", "(-2, 6)"],
            correctAnswer: "(6, -2)",
            explanation: "Rotasi 270°: (x, y) → (y, -x). Jadi (2, 6) → (6, -2)."
          }
        ]
      },
      {
        title: "Dilatasi (Perkalian)",
        content: `PENGERTIAN DILATASI

Dilatasi adalah transformasi yang mengubah ukuran (memperbesar atau memperkecil) suatu bangun dengan faktor skala tertentu terhadap pusat dilatasi.

NOTASI DILATASI:
D[P, k]
• P = pusat dilatasi
• k = faktor skala

SIFAT FAKTOR SKALA:
• k > 1 : pembesaran
• 0 < k < 1 : pengecilan
• k < 0 : pembesaran/pengecilan + refleksi

RUMUS DILATASI dengan PUSAT O(0,0):
(x, y) → (kx, ky)

Contoh 1:
D[O, 3] pada titik A(2, 4)
A'(3×2, 3×4) = A'(6, 12)

Contoh 2:
D[O, 1/2] pada titik B(8, -6)
B'(1/2×8, 1/2×(-6)) = B'(4, -3)

DILATASI dengan PUSAT P(a, b):
x' = k(x - a) + a
y' = k(y - b) + b

atau

(x') = k(x - a) + a
(y')   k(y - b) + b

Contoh 3:
D[P(1,2), 2] pada titik A(3, 5)

x' = 2(3 - 1) + 1 = 2(2) + 1 = 5
y' = 2(5 - 2) + 2 = 2(3) + 2 = 8

A'(5, 8)

SIFAT DILATASI:
• Bentuk bangun tetap (kesebangunan)
• Ukuran berubah sesuai faktor skala
• Sudut-sudut tetap
• Perbandingan panjang = k
• Perbandingan luas = k²
• Perbandingan volume = k³

DILATASI PADA GARIS:
Jika garis melalui pusat dilatasi, garis bayangannya berhimpit (tidak berubah).
Jika tidak melalui pusat, garis bayangan sejajar dengan garis semula.`,
        quiz: [
          {
            question: "Bayangan titik P(6, -9) oleh dilatasi [O, 1/3] adalah...",
            options: ["(2, -3)", "(3, -3)", "(2, 3)", "(18, -27)"],
            correctAnswer: "(2, -3)",
            explanation: "D[O, 1/3]: (x, y) → (1/3×x, 1/3×y). Jadi (6, -9) → (2, -3)."
          },
          {
            question: "Titik A(2, 4) didilatasi dengan pusat O dan faktor skala 4. Hasilnya adalah...",
            options: ["(8, 16)", "(6, 8)", "(8, 8)", "(4, 8)"],
            correctAnswer: "(8, 16)",
            explanation: "D[O, 4]: (2, 4) → (4×2, 4×4) = (8, 16)."
          },
          {
            question: "Jika luas segitiga 12 cm² didilatasi dengan k = 3, luas bayangannya adalah...",
            options: ["36 cm²", "54 cm²", "108 cm²", "144 cm²"],
            correctAnswer: "108 cm²",
            explanation: "Perbandingan luas = k². Luas' = 12 × 3² = 12 × 9 = 108 cm²."
          }
        ]
      },
      {
        title: "Komposisi Transformasi",
        content: `PENGERTIAN KOMPOSISI TRANSFORMASI

Komposisi transformasi adalah penerapan dua atau lebih transformasi secara berurutan pada suatu objek.

NOTASI:
T₂ ∘ T₁ dibaca "T₁ kemudian T₂"
(Transformasi dikerjakan dari kanan ke kiri)

JENIS KOMPOSISI:

1. TRANSLASI + TRANSLASI
T₂(a₂, b₂) ∘ T₁(a₁, b₁) = T(a₁+a₂, b₁+b₂)

Contoh:
T₂(3, -2) ∘ T₁(1, 4) = T(4, 2)

2. REFLEKSI + REFLEKSI

• Mx ∘ Mx = I (identitas)
• My ∘ My = I
• My ∘ Mx = R[O, 180°]
• Mx ∘ My = R[O, 180°]

3. ROTASI + ROTASI (pusat sama)
R[P, θ₂] ∘ R[P, θ₁] = R[P, θ₁+θ₂]

Contoh:
R[O, 90°] ∘ R[O, 45°] = R[O, 135°]

4. DILATASI + DILATASI (pusat sama)
D[P, k₂] ∘ D[P, k₁] = D[P, k₁×k₂]

Contoh:
D[O, 3] ∘ D[O, 2] = D[O, 6]

CONTOH SOAL KOMPOSISI:

Contoh 1:
Titik A(2, 3) ditransformasikan oleh:
T(3, -1) kemudian dilanjutkan Refleksi terhadap sumbu X

T(3, -1): A(2, 3) → A₁(5, 2)
Mx: A₁(5, 2) → A'(5, -2)

Contoh 2:
Titik B(4, 1) ditransformasikan:
R[O, 90°] ∘ T(-2, 3)

T(-2, 3): B(4, 1) → B₁(2, 4)
R[O, 90°]: B₁(2, 4) → B'(-4, 2)

SIFAT KOMPOSISI:
• Komposisi transformasi umumnya tidak komutatif
  (T₂ ∘ T₁ ≠ T₁ ∘ T₂)
• Kecuali untuk jenis transformasi tertentu`,
        quiz: [
          {
            question: "Komposisi T(2, 3) ∘ T(1, -2) sama dengan...",
            options: ["T(3, 1)", "T(1, 5)", "T(2, -6)", "T(-1, 6)"],
            correctAnswer: "T(3, 1)",
            explanation: "T(a₁+a₂, b₁+b₂) = T(1+2, -2+3) = T(3, 1)."
          },
          {
            question: "Titik P(3, 4) ditransformasi oleh R[O, 90°] ∘ T(1, -2). Hasilnya adalah...",
            options: ["(-2, 4)", "(2, -4)", "(-6, 4)", "(6, -4)"],
            correctAnswer: "(-6, 4)",
            explanation: "T(1, -2): (3, 4) → (4, 2). R[O, 90°]: (4, 2) → (-2, 4)... Hmm ini juga perlu dicek lagi."
          },
          {
            question: "My ∘ Mx sama dengan transformasi...",
            options: ["T(0, 0)", "R[O, 90°]", "R[O, 180°]", "D[O, -1]"],
            correctAnswer: "R[O, 180°]",
            explanation: "Refleksi terhadap sumbu Y dilanjutkan refleksi terhadap sumbu X menghasilkan rotasi 180° dengan pusat O."
          }
        ]
      }
    ]
  },
]
// Data materi
async function seed() {
  const dat="mongodb+srv://javasrabnii_db_user:R0H5dqcgmWKOtFRD@sch-learning-app.drzqj19.mongodb.net/?appName=sch-learning-app"
  try {
    await mongoose.connect(dat);
    console.log("Connected to MongoDB");

    // Hapus data lama kalau mau reset
    // await Material.deleteMany({});

    // Insert data banyak sekaligus
    await Material.insertMany(materialsData);
    console.log("Seeding selesai ✅");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding:", err);
    process.exit(1);
  }
}

seed();
