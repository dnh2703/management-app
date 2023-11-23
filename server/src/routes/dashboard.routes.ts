import express from 'express'
import { getDashboardData } from '~/controllers/dashboard.controller'
import { authenticateUser } from '~/middlewares/authentication.middlewares'

const router = express.Router()

router.route('/').get(authenticateUser, getDashboardData)

export default router
