import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import generarId from "../helpers/generarId.js";

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null,
        trim: true
    },
    token: {
        type: String,
        default: generarId
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

veterinarioSchema.pre('save', async function (next) {
    // Si el password ya esta hasheao al momento de actualizar alguna u¡información el password no va a ser hasheado nuevamente
    if (!this.isModified('password')) {
        next() //Middleware de express
    }
    // genSalt: Son las rondas de hasheo
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default Veterinario;