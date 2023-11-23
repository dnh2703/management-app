import { createSlice } from '@reduxjs/toolkit'
import { ICustomer } from '~/types/customer.types'
import { IDepartment } from '~/types/department.types'
import { IEmployee } from '~/types/employee.types'
import { IProject } from '~/types/project.types'

type DashboardState = {
  isLoading: boolean
  customers: ICustomer[]
  departments: IDepartment[]
  employees: IEmployee[]
  projects: IProject[]
}

const initialState: DashboardState = {
  isLoading: false,
  customers: [],
  departments: [],
  employees: [],
  projects: []
}

const dashboardSlice = createSlice({
  initialState,
  name: 'dashboard',
  reducers: {
    getDataDashboardAction: (state) => {
      state.isLoading = true
    },
    getDataDashboardSuccessAction: (state, action) => {
      state.isLoading = false
      state.customers = action.payload.ListCustomer
      state.departments = action.payload.ListDepartment
      state.employees = action.payload.ListEmployee
      state.projects = action.payload.ListProject
    },
    getDataDashboardErrorAction: (state) => {
      state.isLoading = false
    }
  }
})

export const { getDataDashboardAction, getDataDashboardErrorAction, getDataDashboardSuccessAction } =
  dashboardSlice.actions

const dashboardReducer = dashboardSlice.reducer

export default dashboardReducer
