import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // <-- Añade esto

const connectionDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`MongoDb conectado en:${url}`)

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1)
    }
}

export default connectionDB;