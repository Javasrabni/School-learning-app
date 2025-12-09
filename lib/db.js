    import mongoose from "mongoose";

    const MONGO_URL = process.env.MONGO_URL 

    if(!MONGO_URL) {
        throw new Error("MongoDB belum terkonfigurasi pada .env.local")
    }

    let cached = global.mongoose;
    if(!cached) {
        cached = global.mongoose = {conn: null, promise: null}
    }

    export async function connectDB() {
        if (cached.conn) {
            // Sudah terkoneksi, langsung return
            return cached.conn
        }
        if(!cached.promise) {
            const opts = {
                bufferCommands: false,  
            }
            cached.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
                console.log("MongoDB Connected")
                return mongoose
            })
        }
        cached.conn = await cached.promise;
        return cached.conn;
    }