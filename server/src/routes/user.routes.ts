import express from 'express'
import { getAllUser } from '~/controllers/user.controllers'
import { authenticateUser, authorizePermissions } from '~/middlewares/authentication.middlewares'

const router = express.Router()

router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUser)

export default router
