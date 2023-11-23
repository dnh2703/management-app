const handleNumberParam = (param: string | null): '' | number => {
  return param ? (isNaN(parseInt(param)) ? '' : parseInt(param)) : ''
}

const handleStringParam = (param: string | null) => {
  return param ? param : ''
}

export { handleNumberParam, handleStringParam }
