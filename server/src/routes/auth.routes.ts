import express from 'express'
import { login, logout, refreshToken, register } from '~/controllers/auth.controllers'
import { authenticateUser } from '~/middlewares/authentication.middlewares'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', authenticateUser, logout)
router.post('/token', refreshToken)

export default router
