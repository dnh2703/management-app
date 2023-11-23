import { LoginSchema } from '../Login/login.schema'

export interface RegisterSchema extends LoginSchema {
  name: string
  confirm_password: string
}
