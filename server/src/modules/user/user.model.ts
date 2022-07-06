import { getModelForClass, prop, pre } from '@typegoose/typegoose'
import argon2 from 'argon2'

export class User {
    // Username property
    @prop({ required: true, unique: true })
    public username: string

    // Email property
    @prop({ required: true, unique: true })
    public email: string

    // Password property
    @prop({ required: true })
    public password: string

    // Compare password
    public comparePassword(password: string): Promise<boolean> {
        return argon2.verify(this.password, password)
    }
}

// Hash the password using pre save hook
pre<User>('save', async function (next) {
    const user = this

    if (user.isModified('password') || user.isNew) {
        // Hash password using argon2
        const hashedPassword = await argon2.hash(user.password)

        // Set the password to the hashed password
        user.password = hashedPassword
    }

    next()
})

// Export user model with schemaoptions timestamps as true
export const UserModel = getModelForClass(User, {
    schemaOptions: { timestamps: true },
})
