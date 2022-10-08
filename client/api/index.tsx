import axios from 'axios'

const base = process.env.NEXT_PUBLIC_API_ENDPOINT
const userBase = `${base}/api/users`

export async function registerUser(payload: {
    username: string
    password: string
    email: string
    confirmPassword: string
}) {
    const res = await axios.post(userBase, payload)
    return res.data
}
