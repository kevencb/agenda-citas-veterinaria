import express from 'express'
import { registrar, perfil, confirmar, autenticar } from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js'

const router = express.Router()

// Rutas públicas
router.post('/', registrar)
router.get('/confirmar/:token', confirmar)
router.post('/login', autenticar)

// Rutas protegidas
router.get('/perfil', checkAuth, perfil)


export default router;