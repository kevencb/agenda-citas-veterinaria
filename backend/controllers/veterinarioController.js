import Veterinario from "../models/Veterinario.js"

const registrar = async (req, res) => {
    const { email } = req.body;
    // Pevenir registro duplicado
    const usuarioExistente = await Veterinario.findOne({ email: email })
    if (usuarioExistente) {
        const error = new Error('Usuario ya registrado.')
        return res.status(400).json({ msg: error.message })
    }

    try {
        // Guardar nuevo veterninario
        const veterinario = new Veterinario(req.body)
        const vaterinarioGuardado = await veterinario.save()
        res.json(vaterinarioGuardado)
    } catch (error) {
        console.error(error)
    }
}

const perfil = (req, res) => {
    res.json({ msg: "Mostrando perfil" })
}

export {
    registrar, perfil
}