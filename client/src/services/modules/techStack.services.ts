import axiosPublic from '../config/axios.public'

const techStackApi = {
  getAllTechStack: () => {
    return axiosPublic.get('techStack')
  }
}

export default techStackApi
