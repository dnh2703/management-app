interface IUser {
  _id: string
  name: string
  email: string
  password: string
  role: string
}

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>
}

export { IUser, IUserMethods }
