import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IEmployee } from '~/types/employee.types'

type EmployeeState = {
  isLoading: boolean
  isDeleted: boolean
  employees: IEmployee[]
  employeesWithoutCustomer: IEmployee[]
  totalPage: number
}

export type EmployeeQueryAction = {
  q?: string
  page?: string
  size?: string
}

const initialState: EmployeeState = {
  isLoading: false,
  isDeleted: false,
  employees: [],
  employeesWithoutCustomer: [],
  totalPage: 0
}

const employeeSlice = createSlice({
  initialState,
  name: 'employee',
  reducers: {
    getAllEmployeeAction: (state, action: PayloadAction<EmployeeQueryAction>) => {
      action
      state.isLoading = true
    },
    getAllEmployeeSuccessAction: (state, action) => {
      state.isLoading = false
      state.employees = action.payload.ListEmployee
      state.totalPage = action.payload.totalPage
    },
    getAllEmployeeErrorAction: (state) => {
      state.isLoading = false
    },
    deleteEmployeeAction: (state, action: PayloadAction<{ id: string }>) => {
      action
      state.isDeleted = false
    },
    deleteEmployeeSuccessAction: (state) => {
      state.isDeleted = true
      toast.success('Success! Employee removed.')
    },
    deleteEmployeeErrorAction: (state) => {
      state
      toast.error('Something went wrong')
    }
  }
})

export const {
  getAllEmployeeAction,
  getAllEmployeeErrorAction,
  getAllEmployeeSuccessAction,
  deleteEmployeeAction,
  deleteEmployeeErrorAction,
  deleteEmployeeSuccessAction
} = employeeSlice.actions

const employeeReducer = employeeSlice.reducer

export default employeeReducer
