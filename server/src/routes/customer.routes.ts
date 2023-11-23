import express from 'express'
import {
  createCustomer,
  deleteCustomer,
  getAllCustomer,
  getSingleCustomer,
  updateCustomer
} from '~/controllers/customer.controllers'
import { authenticateUser } from '~/middlewares/authentication.middlewares'

const router = express.Router()

router.route('/').get(authenticateUser, getAllCustomer).post(authenticateUser, createCustomer)
router
  .route('/:id')
  .get(authenticateUser, getSingleCustomer)
  .patch(authenticateUser, updateCustomer)
  .delete(authenticateUser, deleteCustomer)

export default router
