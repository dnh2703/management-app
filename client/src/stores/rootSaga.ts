import { all } from 'redux-saga/effects'
import watchProject from './project/projectSaga'
import watchCustomer from './customer/customerSaga'
import watchDepartment from './department/departmentSaga'
import watchEmployee from './employee/employeeSaga'
import watchDashboard from './dashboard/dashboardSaga'

export default function* rootSaga() {
  yield all([watchProject(), watchCustomer(), watchDepartment(), watchEmployee(), watchDashboard()])
}
