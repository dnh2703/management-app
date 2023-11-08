import express from 'express'
import { getAllUser } from '~/controllers/user.controllers'
import { authenticateUser } from '~/middlewares/authentication.middlewares'

const router = express.Router()

router.route('/').get(authenticateUser, getAllUser)

export default router
