import { AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  DepartmentQueryAction,
  deleteDepartmentAction,
  deleteDepartmentErrorAction,
  deleteDepartmentSuccessAction,
  getAllDepartmentAction,
  getAllDepartmentErrorAction,
  getAllDepartmentSuccessAction
} from './departmentSlice'
import departmentApi from '~/services/modules/department.services'
import { PayloadAction } from '@reduxjs/toolkit'

function* getAllDepartment(action: PayloadAction<DepartmentQueryAction>) {
  try {
    const { page, q, size } = action.payload
    const res: AxiosResponse = yield call(departmentApi.getAllDepartment, page, q, size)
    yield put(getAllDepartmentSuccessAction(res.data))
  } catch (error) {
    yield put(getAllDepartmentErrorAction())
  }
}

function* deleteDepartment(action: PayloadAction<{ id: string }>) {
  try {
    const { id } = action.payload
    const res: AxiosResponse = yield call(departmentApi.deleteDepartment, id)
    yield put(deleteDepartmentSuccessAction(res.data))
  } catch (error) {
    yield put(deleteDepartmentErrorAction())
  }
}

function* watchDepartment() {
  yield takeEvery(getAllDepartmentAction, getAllDepartment)
  yield takeEvery(deleteDepartmentAction, deleteDepartment)
}

export default watchDepartment
