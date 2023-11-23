import Select from 'react-select'

const MultiSelect = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return <Select className='rounded-md outline-black' isMulti options={options} />
}

export default MultiSelect
