import { AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  CustomerQueryAction,
  deleteCustomerAction,
  deleteCustomerErrorAction,
  deleteCustomerSuccessAction,
  getAllCustomerAction,
  getAllCustomerErrorAction,
  getAllCustomerSuccessAction
} from './customerSlice'
import customerApi from '~/services/modules/customer.services'
import { PayloadAction } from '@reduxjs/toolkit'

function* getAllCustomer(action: PayloadAction<CustomerQueryAction>) {
  try {
    const { page, q, size } = action.payload
    const res: AxiosResponse = yield call(customerApi.getAllCustomer, page, q, size)
    yield put(getAllCustomerSuccessAction(res.data))
  } catch (error) {
    yield put(getAllCustomerErrorAction())
  }
}

function* deleteCustomer(action: PayloadAction<{ id: string }>) {
  try {
    const { id } = action.payload
    const res: AxiosResponse = yield call(customerApi.deleteCustomer, id)
    yield put(deleteCustomerSuccessAction(res.data))
  } catch (error) {
    yield put(deleteCustomerErrorAction())
  }
}

function* watchCustomer() {
  yield takeEvery(getAllCustomerAction, getAllCustomer)
  yield takeEvery(deleteCustomerAction, deleteCustomer)
}

export default watchCustomer
