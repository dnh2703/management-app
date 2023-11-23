import express from 'express'
import {
  createEmployee,
  deleteEmployee,
  getAllEmployee,
  getAllEmployeeWithoutDepartment,
  getSingleEmployee,
  updateEmployee
} from '~/controllers/employee.controllers'
import { authenticateUser, authorizePermissions } from '~/middlewares/authentication.middlewares'

const router = express.Router()

router
  .route('/')
  .get(authenticateUser, getAllEmployee)
  .post(authenticateUser, authorizePermissions('admin'), createEmployee)
router.route('/no-department').get(authenticateUser, getAllEmployeeWithoutDepartment)
router
  .route('/:id')
  .get(authenticateUser, getSingleEmployee)
  .patch(authenticateUser, authorizePermissions('admin'), updateEmployee)
  .delete(authenticateUser, authorizePermissions('admin'), deleteEmployee)

export default router
