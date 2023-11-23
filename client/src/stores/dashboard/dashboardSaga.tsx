import { AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import { getDataDashboardAction, getDataDashboardErrorAction, getDataDashboardSuccessAction } from './dashboardSlice'
import dashboardApi from '~/services/modules/dashboard.services'

function* getDataDashboard() {
  try {
    const res: AxiosResponse = yield call(dashboardApi.getDataDashboard)
    yield put(getDataDashboardSuccessAction(res.data))
  } catch (error) {
    yield put(getDataDashboardErrorAction())
  }
}

function* watchDashboard() {
  yield takeEvery(getDataDashboardAction, getDataDashboard)
}

export default watchDashboard
