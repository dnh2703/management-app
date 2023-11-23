import express from 'express'
import {
  createEmployee,
  deleteEmployee,
  getAllEmployee,
  getAllEmployeeWithoutDepartment,
  getSingleEmployee,
  updateEmployee
} from '~/controllers/employee.controllers'
import { authenticateUser } from '~/middlewares/authentication.middlewares'

const router = express.Router()

router.route('/').get(authenticateUser, getAllEmployee).post(authenticateUser, createEmployee)
router.route('/no-department').get(authenticateUser, getAllEmployeeWithoutDepartment)
router
  .route('/:id')
  .get(authenticateUser, getSingleEmployee)
  .patch(authenticateUser, updateEmployee)
  .delete(authenticateUser, deleteEmployee)

export default router
