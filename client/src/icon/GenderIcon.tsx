import { CgGenderFemale, CgGenderMale } from 'react-icons/cg'

interface GenderIconProps {
  gender: 'male' | 'female'
}

const GenderIcon = ({ gender }: GenderIconProps) => {
  if (gender == 'female') {
    return <CgGenderFemale className='text-pink-600' />
  }
  return <CgGenderMale className='text-blue-600' />
}

export default GenderIcon
