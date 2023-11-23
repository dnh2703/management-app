import { LoginSchema } from '../Login/login.schema'

export interface RegisterSchema extends LoginSchema {
  confirm_password: string
}
