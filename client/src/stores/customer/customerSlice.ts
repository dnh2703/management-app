import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { ICustomer } from '~/types/customer.types'

type CustomerState = {
  isLoading: boolean
  isDeleted: boolean
  customers: ICustomer[]
  customer: ICustomer | null
  totalPage: number
}

export type CustomerQueryAction = {
  q?: string
  page?: string
  size?: string
}

const initialState: CustomerState = {
  isLoading: false,
  isDeleted: false,
  customers: [],
  customer: null,
  totalPage: 0
}

const customerSlice = createSlice({
  initialState,
  name: 'customer',
  reducers: {
    getAllCustomerAction: (state, action: PayloadAction<CustomerQueryAction>) => {
      action
      state.isLoading = true
    },
    getAllCustomerSuccessAction: (state, action) => {
      state.isLoading = false
      state.customers = action.payload.ListCustomer
      state.totalPage = action.payload.totalPage
    },
    getAllCustomerErrorAction: (state) => {
      state.isLoading = false
    },
    deleteCustomerAction: (state, action: PayloadAction<{ id: string }>) => {
      action
      state.isDeleted = false
    },
    deleteCustomerSuccessAction: (state) => {
      state.isDeleted = true
      toast.success('Success! Customer removed.')
    },
    deleteCustomerErrorAction: (state) => {
      state
      toast.error('Something went wrong')
    }
  }
})

export const {
  getAllCustomerAction,
  getAllCustomerErrorAction,
  getAllCustomerSuccessAction,
  deleteCustomerAction,
  deleteCustomerErrorAction,
  deleteCustomerSuccessAction
} = customerSlice.actions

const customerReducer = customerSlice.reducer

export default customerReducer
