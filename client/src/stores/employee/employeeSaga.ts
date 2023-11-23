import { AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  EmployeeQueryAction,
  deleteEmployeeAction,
  deleteEmployeeErrorAction,
  deleteEmployeeSuccessAction,
  getAllEmployeeAction,
  getAllEmployeeErrorAction,
  getAllEmployeeSuccessAction
} from './employeeSlice'
import employeeApi from '~/services/modules/employee.services'
import { PayloadAction } from '@reduxjs/toolkit'

function* getAllEmployee(action: PayloadAction<EmployeeQueryAction>) {
  try {
    const { page, q, size } = action.payload
    const res: AxiosResponse = yield call(employeeApi.getAllEmployee, page, q, size)
    yield put(getAllEmployeeSuccessAction(res.data))
  } catch (error) {
    yield put(getAllEmployeeErrorAction())
  }
}

function* deleteEmployee(action: PayloadAction<{ id: string }>) {
  try {
    const { id } = action.payload
    const res: AxiosResponse = yield call(employeeApi.deleteEmployee, id)
    yield put(deleteEmployeeSuccessAction(res.data))
  } catch {
    yield put(deleteEmployeeErrorAction())
  }
}

function* watchEmployee() {
  yield takeEvery(getAllEmployeeAction, getAllEmployee)
  yield takeEvery(deleteEmployeeAction, deleteEmployee)
}

export default watchEmployee
