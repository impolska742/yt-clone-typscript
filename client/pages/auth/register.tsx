import {
    TextInput,
    Button,
    Container,
    Title,
    Paper,
    PasswordInput,
    Stack,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification, updateNotification } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons'
import { AxiosError } from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { registerUser } from '../../api'

const RegisterPage = () => {
    const router = useRouter()

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
        },
    })

    const mutation = useMutation<
        string,
        AxiosError,
        Parameters<typeof registerUser>[0]
    >(registerUser, {
        onMutate: () => {
            showNotification({
                id: 'register',
                title: 'Creating account',
                message: 'Please wait ...',
                loading: true,
            })
        },
        onSuccess: () => {
            updateNotification({
                id: 'register',
                title: 'Success',
                message: 'Account created successfully',
                loading: false,
                color: 'teal',
                icon: <IconCheck />,
                styles: (theme) => ({
                    root: {
                        backgroundColor: theme.colors.teal[6],
                        borderColor: theme.colors.teal[6],

                        '&::before': { backgroundColor: theme.white },
                    },

                    title: { color: theme.white },
                    description: { color: theme.white },
                    closeButton: {
                        color: theme.white,
                        '&:hover': { backgroundColor: theme.colors.teal[9] },
                    },
                }),
            })

            router.push('/auth/login')
        },
        onError: () => {
            updateNotification({
                id: 'register',
                title: 'Error',
                message: 'Could not create account',
                loading: false,
                color: 'red',
                icon: <IconX />,
                styles: (theme) => ({
                    root: {
                        backgroundColor: theme.colors.red[6],
                        borderColor: theme.colors.red[6],

                        '&::before': { backgroundColor: theme.white },
                    },

                    title: { color: theme.white },
                    description: { color: theme.white },
                    closeButton: {
                        color: theme.white,
                        '&:hover': { backgroundColor: theme.colors.red[9] },
                    },
                }),
            })
        },
    })

    return (
        <>
            <Head>
                <title>Register User</title>
            </Head>

            <Container>
                <Title>Register</Title>
                <Paper shadow="md" p={30} mt={30} radius={30} withBorder={true}>
                    <form
                        onSubmit={form.onSubmit((values) =>
                            mutation.mutate(values),
                        )}
                        action="submit"
                    >
                        <Stack>
                            <TextInput
                                label="Email"
                                placeholder="jane@example.com"
                                required={true}
                                {...form.getInputProps('email')}
                            />
                            <TextInput
                                label="Username"
                                placeholder="coolname123"
                                required={true}
                                {...form.getInputProps('username')}
                            />
                            <PasswordInput
                                label="Password"
                                placeholder="Your strong password"
                                required={true}
                                {...form.getInputProps('password')}
                            />
                            <PasswordInput
                                label="Confirm Password"
                                placeholder="Your strong password"
                                required={true}
                                {...form.getInputProps('confirmPassword')}
                            />
                            <Button type="submit">Register</Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default RegisterPage
