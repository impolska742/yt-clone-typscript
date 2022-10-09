import axios from 'axios'

const base = process.env.NEXT_PUBLIC_API_ENDPOINT
const userBase = `${base}/api/users`
const authBase = `${base}/api/auth`

export async function registerUser(payload: {
    username: string
    password: string
    email: string
    confirmPassword: string
}) {
    const res = await axios.post(userBase, payload)
    return res.data
}

export async function loginUser(payload: { email: string; password: string }) {
    return axios
        .post(authBase, payload, {
            withCredentials: true,
        })
        .then((res) => res.data)
}
