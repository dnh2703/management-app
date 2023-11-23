import express from 'express'
import {
  createDepartment,
  deleteDepartment,
  getAllDepartment,
  getAllEmployeeInDepartment,
  getSingleDepartment,
  updateDepartment
} from '~/controllers/department.controllers'
import { authenticateUser, authorizePermissions } from '~/middlewares/authentication.middlewares'

const router = express.Router()

router.route('/').get(authenticateUser, getAllDepartment).post(authenticateUser, createDepartment)
router
  .route('/:id')
  .patch(authenticateUser, authorizePermissions('admin'), updateDepartment)
  .delete(authenticateUser, authorizePermissions('admin'), deleteDepartment)
  .get(authenticateUser, getSingleDepartment)
router.route('/:id/employee').get(authenticateUser, getAllEmployeeInDepartment)

export default router
