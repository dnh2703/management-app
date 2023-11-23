import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'
import rootSaga from './rootSaga'
import projectReducer from './project/projectSlice'
import customerReducer from './customer/customerSlice'
import departmentReducer from './department/departmentSlice'
import employeeReducer from './employee/employeeSlice'
import dashboardReducer from './dashboard/dashboardSlice'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    project: projectReducer,
    customer: customerReducer,
    department: departmentReducer,
    employee: employeeReducer,
    dashboard: dashboardReducer
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
