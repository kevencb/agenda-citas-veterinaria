import express from "express";
import dotenv from "dotenv"
import connectionDB from "./config/db.js"

// Habilitamos el servidor
const app = express();
dotenv.config()

connectionDB()

app.use('/', (req, res) => {
    res.send("Hola Mundo")
})

app.listen(4000, () => {
    console.log("Servidor funcionando en el puerto 4000")
})