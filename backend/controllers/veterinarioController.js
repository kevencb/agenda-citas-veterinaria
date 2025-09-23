import Veterinario from "../models/Veterinario.js"

const registrar = async (req, res) => {
    try {
        const veterinario = new Veterinario(req.body)
        const vaterinarioGuardado = await veterinario.save()
        res.json(vaterinarioGuardado)
    } catch (error) {
        console.error(error)
    }


    // const { nombre, email, password } = req.body

    // console.log("****** REGISTRO ********")
    // console.log("Nombre: ", nombre)
    // console.log("E-mail: ", email)
    // console.log("Pass: ", password)
}

const perfil = (req, res) => {
    res.json({ msg: "Mostrando perfil" })
}

export {
    registrar, perfil
}