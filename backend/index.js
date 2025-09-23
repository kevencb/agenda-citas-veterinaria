import express from "express";
import dotenv from "dotenv"
import connectionDB from "./config/db.js"
import veterinarioRoutes from "./routes/veterinarioRoutes.js"

// Habilitamos el servidor
const app = express();
app.use(express.json()) // Le indicamos a express que le vamos a enviar información tipo json()
dotenv.config()

connectionDB()

app.use('/api/veterinarios/', veterinarioRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`)
})