import Veterinario from "../models/Veterinario.js"
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {

    const { email } = req.body;

    /**** Inicio: Prevenir registro duplicado ****/
    const usuarioExistente = await Veterinario.findOne({ email: email })
    if (usuarioExistente) {
        const error = new Error('Usuario ya registrado.')
        return res.status(400).json({ msg: error.message })
    }
    /**** Fin: Prevenir registro duplicado ****/

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
    // Unavez autenticado el usuario obtenemos los datos que sacamos desde el authMiddleware
    const { veterinario } = req
    res.json({ perfil: veterinario })
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

const autenticar = async (req, res) => {
    const { email, password } = req.body

    /***** Inicio: Comprobar si el usuario existe ****/
    const usuario = await Veterinario.findOne({ email: email })
    if (!usuario) {
        const error = new Error('Usuario no registrado.')
        return res.status(401).json({ msg: error.message })
    }
    /***** Fin: Comprobar si el usuario existe ****/

    /***** Inicio: Comprobar si la cuenta esta comprobada ****/
    if (!usuario.confirmado) {
        const error = new Error('Cuenta no confirmada.')
        return res.status(403).json({ msg: error.message })
    }
    /***** Fin: Comprobar si la cuenta esta comprobada ****/

    /***** Inicio: Validar el password ****/
    if (await usuario.comprobarPassword(password)) {
        res.json({ token: generarJWT(usuario.id) })
    } else {
        const error = new Error('Password incorrecto.')
        return res.status(403).json({ msg: error.message })
    }
    /***** Fin: Validar el password ****/

}

export { registrar, perfil, confirmar, autenticar }