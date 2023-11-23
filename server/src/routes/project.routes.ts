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
import { authenticateUser, authorizePermissions } from '~/middlewares/authentication.middlewares'

const router = express.Router()

router.route('/').get(authenticateUser, getAllProject).post(authenticateUser, createProject)
router.route('/no-customer').get(authenticateUser, getAllProjectWithoutCustomer)
router.route('/no-department').get(authenticateUser, getAllProjectWithoutDepartment)
router
  .route('/:id')
  .get(authenticateUser, getSingleProject)
  .patch(authenticateUser, authorizePermissions('admin'), updateProject)
  .delete(authenticateUser, authorizePermissions('admin'), deleteProject)

export default router
