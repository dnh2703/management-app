import { ICustomerAPIBody } from '~/types/customer.types'
import axiosPrivate from '../config/axios.private'

const customerApi = {
  getAllCustomer: (page?: string, q?: string, size?: string) => {
    return axiosPrivate.get(`customer?q=${q}&page=${page}&size=${size}`)
  },
  createCustomer: (data: ICustomerAPIBody) => {
    return axiosPrivate.post(`customer`, data)
  },
  getSingleCustomer: (id: string) => {
    return axiosPrivate.get(`customer/${id}`)
  },
  updateCustomer: (id: string, data: ICustomerAPIBody) => {
    return axiosPrivate.patch(`customer/${id}`, data)
  },
  deleteCustomer: (id: string) => {
    return axiosPrivate.delete(`customer/${id}`)
  }
}

export default customerApi
