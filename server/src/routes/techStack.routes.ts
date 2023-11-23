import express from 'express'
import { createTechStack, getAllTechStack } from '~/controllers/techStack.controllers'

const router = express.Router()

router.route('/').get(getAllTechStack).post(createTechStack)

export default router
