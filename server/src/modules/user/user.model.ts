import { getModelForClass, prop, pre } from '@typegoose/typegoose'
import argon2 from 'argon2'

// Hash the password using pre save hook
@pre<User>('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        // Hash password using argon2
        const hashedPassword = await argon2.hash(this.password)

        // Set the password to the hashed password
        this.password = hashedPassword

        return next()
    }
})
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
    public async comparePassword(password: string): Promise<boolean> {
        return argon2.verify(this.password, password)
    }
}

export const UserModel = getModelForClass(User, {
    schemaOptions: { timestamps: true },
})
