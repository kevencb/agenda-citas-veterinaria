import { request } from "express";
import Veterinario from "../models/Veterinario.js"

const registrar = async (req, res) => {

    const { email } = req.body;

    /**** Inicio: Prevenir registro duplicado ****/
    const usuarioExistente = await Veterinario.findOne({ email: email })
    if (usuarioExistente) {
        const error = new Error('Usuario ya registrado.')
        return res.status(400).json({ msg: error.message })
    }
    /**** Fin: Pevenir registro duplicado ****/

    try {
        /**** Inicio: Guardar nuevo veterninario ****/
        const veterinario = new Veterinario(req.body)
        const vaterinarioGuardado = await veterinario.save()
        res.json(vaterinarioGuardado)
        /**** Fin: Guardar nuevo veterninario ****/
    } catch (error) {
        console.error(error)
    }
}

const perfil = (req, res) => {
    res.json({ msg: "Mostrando perfil" })
}

const confirmar = async (req, res) => {
    // Cuando llenamos un form los datos los obtenemos mediante req.body, en caso parámetros se obtienen medianta res.params
    const { token } = req.params

    // findOne nos permite buscar entre las propiedades del objeto
    const usuarioConfirmar = await Veterinario.findOne({ token })

    if (!usuarioConfirmar) {
        const error = new Error('Token no válido')
        return res.status(404).json({ msg: error.message })
    }

    try {
        usuarioConfirmar.token = null
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save()

        res.json({ msg: "Usuario confirmado correctamente." })
    } catch (error) {
        console.error(error)
    }
}

export {
    registrar, perfil, confirmar
}