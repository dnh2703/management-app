import axiosPrivate from '../config/axios.private'

const dashboardApi = {
  getDataDashboard: () => axiosPrivate.get('dashboard')
}

export default dashboardApi
