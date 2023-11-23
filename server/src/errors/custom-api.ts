import { StatusCodes } from 'http-status-codes'

class CustomAPIError extends Error {
  statusCode: StatusCodes
  name: string
  constructor(name: string, statusCode: StatusCodes, message: string) {
    super(message)
    this.statusCode = statusCode
    this.name = name
  }
}

export default CustomAPIError
