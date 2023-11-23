import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IDepartment } from '~/types/department.types'

type DepartmentState = {
  isLoading: boolean
  isDeleted: boolean
  departments: IDepartment[]
  departmentsWithoutCustomer: IDepartment[]
  totalPage: number
}

export type DepartmentQueryAction = {
  q?: string
  page?: string
  size?: string
}

const initialState: DepartmentState = {
  isLoading: false,
  isDeleted: false,
  departments: [],
  departmentsWithoutCustomer: [],
  totalPage: 0
}

const departmentSlice = createSlice({
  initialState,
  name: 'department',
  reducers: {
    getAllDepartmentAction: (state, action: PayloadAction<DepartmentQueryAction>) => {
      action
      state.isLoading = true
    },
    getAllDepartmentSuccessAction: (state, action) => {
      state.isLoading = false
      state.departments = action.payload.ListDepartment
      state.totalPage = action.payload.totalPage
    },
    getAllDepartmentErrorAction: (state) => {
      state.isLoading = false
    },
    deleteDepartmentAction: (state, action: PayloadAction<{ id: string }>) => {
      action
      state.isDeleted = false
    },
    deleteDepartmentSuccessAction: (state) => {
      state.isDeleted = true
      toast.success('Success! Department removed.')
    },
    deleteDepartmentErrorAction: (state) => {
      state
      toast.error('Something went wrong')
    }
  }
})

export const {
  getAllDepartmentAction,
  getAllDepartmentErrorAction,
  getAllDepartmentSuccessAction,
  deleteDepartmentAction,
  deleteDepartmentErrorAction,
  deleteDepartmentSuccessAction
} = departmentSlice.actions

const departmentReducer = departmentSlice.reducer

export default departmentReducer
