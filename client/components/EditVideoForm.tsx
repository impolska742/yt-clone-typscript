import { Button, Stack, Switch, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { AxiosError, AxiosResponse } from 'axios'
import React from 'react'
import { useMutation } from 'react-query'
import { updateVideo } from '../api'
import { useVideo } from '../context/videos'
import { Video } from '../types'

const EditVideoForm = ({
    videoId,
    setOpened,
}: {
    videoId: string
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { refetch } = useVideo()

    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            published: true,
        },
    })

    const mutation = useMutation<
        AxiosResponse<Video>,
        AxiosError,
        Parameters<typeof updateVideo>[0]
    >(updateVideo, {
        onSuccess: () => {
            setOpened(false)
            refetch()
        },
    })

    return (
        <form
            onSubmit={form.onSubmit((values) =>
                mutation.mutate({ videoId, ...values }),
            )}
        >
            <Stack>
                <TextInput
                    label="Title"
                    required
                    placeholder="My awesome video"
                    {...form.getInputProps('title')}
                />

                <TextInput
                    label="Description"
                    required
                    {...form.getInputProps('description')}
                />

                <Switch
                    label="Published"
                    {...form.getInputProps('published')}
                />
                <Button type="submit">Save</Button>
            </Stack>
        </form>
    )
}

export default EditVideoForm
