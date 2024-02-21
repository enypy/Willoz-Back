interface IUser {
  name: string
  email: string
  password: string
}

interface IUserMethods {
  createJWT(): string
  comparePassword(pwd: string): Promise<boolean>
}

type UserModel = Model<IUser, {}, IUserMethods>