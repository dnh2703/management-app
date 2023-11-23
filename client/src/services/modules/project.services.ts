import { IProjectAPIBody } from '~/types/project.types'
import axiosPrivate from '../config/axios.private'

const projectApi = {
  getAllProject: (page?: string, q?: string, size?: string, status?: string) =>
    axiosPrivate.get(`project?q=${q}&page=${page}&size=${size}&status=${status}`),
  createProject: (data: IProjectAPIBody) => {
    return axiosPrivate.post(`project`, JSON.stringify(data))
  },
  getAllProjectWithoutCustomer: () => axiosPrivate.get(`project/no-customer`),
  getAllProjectWithoutDepartment: () => axiosPrivate.get(`project/no-department`),
  getSingleProject: (id: string) => axiosPrivate.get(`project/${id}`),
  updateProject: (id: string, data: IProjectAPIBody) => axiosPrivate.patch(`/project/${id}`, JSON.stringify(data)),
  deleteProject: (id: string) => axiosPrivate.delete(`project/${id}`)
}

export default projectApi
