import express from 'express'
import {
  createProject,
  deleteProject,
  getAllProject,
  getAllProjectWithoutCustomer,
  getAllProjectWithoutDepartment,
  getSingleProject,
  updateProject
} from '~/controllers/project.controllers'
import { authenticateUser } from '~/middlewares/authentication.middlewares'

const router = express.Router()

router.route('/').get(authenticateUser, getAllProject).post(authenticateUser, createProject)
router.route('/no-customer').get(authenticateUser, getAllProjectWithoutCustomer)
router.route('/no-department').get(authenticateUser, getAllProjectWithoutDepartment)
router
  .route('/:id')
  .get(authenticateUser, getSingleProject)
  .patch(authenticateUser, updateProject)
  .delete(authenticateUser, deleteProject)

export default router
