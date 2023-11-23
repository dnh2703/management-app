import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IProject } from '~/types/project.types'

type ProjectState = {
  isLoading: boolean
  projects: IProject[]
  projectsWithoutCustomer: IProject[]
  totalPage: number
  isDeleted: boolean
}

export type ProjectQueryAction = {
  q?: string
  page?: string
  size?: string
  status?: string
}

const initialState: ProjectState = {
  isLoading: false,
  isDeleted: false,
  projects: [],
  projectsWithoutCustomer: [],
  totalPage: 0
}

const projectSlice = createSlice({
  initialState,
  name: 'project',
  reducers: {
    getAllProjectAction: (state, action: PayloadAction<ProjectQueryAction>) => {
      action
      state.isLoading = true
    },
    getAllProjectSuccessAction: (state, action) => {
      state.isLoading = false
      state.projects = action.payload.ListProject
      state.totalPage = action.payload.totalPage
    },
    getAllProjectErrorAction: (state) => {
      state.isLoading = false
    },
    deleteProjectAction: (state, action: PayloadAction<{ id: string }>) => {
      state.isDeleted = false
      action
    },
    deleteProjectSuccessAction: (state) => {
      state.isDeleted = true
      toast.success('Success! Project removed.')
    },
    deleteProjectErrorAction: (state) => {
      state
      toast.error('Something went wrong')
    }
  }
})

export const {
  getAllProjectAction,
  getAllProjectErrorAction,
  getAllProjectSuccessAction,
  deleteProjectAction,
  deleteProjectErrorAction,
  deleteProjectSuccessAction
} = projectSlice.actions

const projectReducer = projectSlice.reducer

export default projectReducer
