import express from 'express'
import {
  createCustomer,
  deleteCustomer,
  getAllCustomer,
  getSingleCustomer,
  updateCustomer
} from '~/controllers/customer.controllers'
import { authenticateUser, authorizePermissions } from '~/middlewares/authentication.middlewares'

const router = express.Router()

router
  .route('/')
  .get(authenticateUser, getAllCustomer)
  .post(authenticateUser, authorizePermissions('admin'), createCustomer)
router
  .route('/:id')
  .get(authenticateUser, getSingleCustomer)
  .patch(authenticateUser, authorizePermissions('admin'), updateCustomer)
  .delete(authenticateUser, authorizePermissions('admin'), deleteCustomer)

export default router
