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
import { AxiosError } from 'axios'
import Head from 'next/head'
import { useMutation } from 'react-query'
import { loginUser } from '../../api'

const LoginPage = () => {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    })

    const mutation = useMutation<
        string,
        AxiosError,
        Parameters<typeof loginUser>[0]
    >(loginUser, {
        onMutate: () => {
            showNotification({
                id: 'login',
                title: 'Creating account',
                message: 'Please wait ...',
                loading: true,
            })
        },
        onSuccess: () => {
            updateNotification({
                id: 'login',
                title: 'Success',
                message: 'Account created successfully',
                loading: false,
                color: 'teal',
            })
        },
        onError: () => {
            updateNotification({
                id: 'login',
                title: 'Error',
                message: 'Could not create account',
                loading: false,
            })
        },
    })

    return (
        <>
            <Head>
                <title>Login User</title>
            </Head>

            <Container>
                <Title>Login</Title>
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

                            <PasswordInput
                                label="Password"
                                placeholder="Your strong password"
                                required={true}
                                {...form.getInputProps('password')}
                            />

                            <Button type="submit">Login</Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default LoginPage
