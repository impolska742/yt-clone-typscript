import { UserModel } from './user.model'

export const createUser = async (user: {
    username: string
    email: string
    password: string
}) => {
    return UserModel.create(user)
}
