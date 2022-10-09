import axios from 'axios'

const base = process.env.NEXT_PUBLIC_API_ENDPOINT
const userBase = `${base}/api/users`
const authBase = `${base}/api/auth`
const videoBase = `${base}/api/videos`

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

export async function getMe() {
    try {
        const res = await axios.get(userBase, {
            withCredentials: true,
        })
        return res.data
    } catch {
        return null
    }
}

export async function uploadVideo({
    formData,
    config,
}: {
    formData: FormData
    config: {
        onUploadProgress: (progressEvent: any) => void
    }
}) {
    return axios
        .post(videoBase, formData, {
            withCredentials: true,
            ...config,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => res.data)
}

export async function updateVideo({
    videoId,
    ...payload
}: {
    videoId: string
    title: string
    description: string
    published: boolean
}) {
    return axios.patch(`${videoBase}/${videoId}`, payload, {
        withCredentials: true,
    })
}
