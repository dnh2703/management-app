import { IDepartmentAPIBody } from '~/types/department.types'
import axiosPrivate from '../config/axios.private'

const departmentApi = {
  getAllDepartment: (page?: string, q?: string, size?: string) =>
    axiosPrivate.get(`department?q=${q}&page=${page}&size=${size}`),
  getAllEmployeeInDepartment: (id: string) => {
    return axiosPrivate.get(`department/${id}/employee`)
  },
  getSingleDepartment: (id: string) => {
    return axiosPrivate.get(`department/${id}`)
  },
  updateDepartment: (id: string, data: IDepartmentAPIBody) => {
    return axiosPrivate.patch(`department/${id}`, data)
  },
  createDepartment: (data: IDepartmentAPIBody) => {
    return axiosPrivate.post('department', data)
  },
  deleteDepartment: (id: string) => {
    return axiosPrivate.delete(`department/${id}`)
  }
}

export default departmentApi
