import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import omit from '../helpers/omit'
import { findUserByEmail } from '../user/user.service'
import { LoginBody } from './auth.schema'
import { signJWT } from './auth.utils'

const domain = process.env.domain || 'localhost'

export async function loginHandler(
    req: Request<{}, {}, LoginBody>,
    res: Response,
) {
    const { email, password } = req.body

    // 1. Find the user with given email
    // ~ Check user exists - false - return error
    // 2. Verify password
    // ~ if Wrong password - return error
    // 3. Sign a JWT
    // 4. Add a cookie to the response
    // 5. Respond

    // find the user by email
    const user = await findUserByEmail(email)

    if (!user) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .send('Invalid email or password')
    } else {
        const checkPasswordsMatch = await user.comparePassword(password)
        if (!checkPasswordsMatch)
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .send('Invalid email or password')
    }

    const payload = omit(user.toJSON(), ['password'])

    const jwt = signJWT(payload)

    res.cookie('accessToken', jwt, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: false,
    })

    return res.status(StatusCodes.OK).send(jwt)
}
