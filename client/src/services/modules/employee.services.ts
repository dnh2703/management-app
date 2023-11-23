import { IEmployeeAPIBody } from '~/types/employee.types'
import axiosPrivate from '../config/axios.private'

const employeeApi = {
  getAllEmployee: (page?: string, q?: string, size?: string) => {
    return axiosPrivate.get(`employee?q=${q}&page=${page}&size=${size}`)
  },
  getSingleEmployee: (id: string) => {
    return axiosPrivate.get(`employee/${id}`)
  },
  getAllEmployeeWithoutDepartment: () => {
    return axiosPrivate.get(`employee/no-department`)
  },
  createEmployee: (data: IEmployeeAPIBody) => {
    return axiosPrivate.post(`employee`, data)
  },
  updateEmployee: (id: string, data: IEmployeeAPIBody) => {
    return axiosPrivate.patch(`employee/${id}`, data)
  },
  deleteEmployee: (id: string) => {
    return axiosPrivate.delete(`employee/${id}`)
  }
}

export default employeeApi
