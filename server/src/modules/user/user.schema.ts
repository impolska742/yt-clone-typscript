import { object, string, TypeOf } from 'zod'

export const registerUserSchema = {
    body: object({
        username: string({
            required_error: 'Username is required.',
        }),
        email: string({
            required_error: 'Email is required',
        }),
        password: string({
            required_error: 'Password is required',
        })
            .min(6, 'Password must be atleast 6 characters long.')
            .max(64, 'Password should not be greater than 64 characters.'),
        confirmPassword: string({
            required_error: 'Confirm password is required',
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    }),
}

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>
