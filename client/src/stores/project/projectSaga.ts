import { AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  ProjectQueryAction,
  deleteProjectAction,
  deleteProjectErrorAction,
  deleteProjectSuccessAction,
  getAllProjectAction,
  getAllProjectErrorAction,
  getAllProjectSuccessAction
} from './projectSlice'
import projectApi from '~/services/modules/project.services'
import { PayloadAction } from '@reduxjs/toolkit'

function* getAllProject(action: PayloadAction<ProjectQueryAction>) {
  try {
    const { page, q, size, status } = action.payload
    const res: AxiosResponse = yield call(projectApi.getAllProject, page, q, size, status)
    yield put(getAllProjectSuccessAction(res.data))
  } catch (error) {
    yield put(getAllProjectErrorAction())
  }
}

function* deleteProject(action: PayloadAction<{ id: string }>) {
  try {
    const { id } = action.payload
    const res: AxiosResponse = yield call(projectApi.deleteProject, id)
    yield put(deleteProjectSuccessAction(res.data))
  } catch (error) {
    yield put(deleteProjectErrorAction())
  }
}

function* watchProject() {
  yield takeEvery(getAllProjectAction, getAllProject)
  yield takeEvery(deleteProjectAction, deleteProject)
}

export default watchProject
