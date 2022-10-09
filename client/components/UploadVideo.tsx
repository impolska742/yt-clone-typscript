import { Button, Group, Modal, Progress, Text } from '@mantine/core'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { ArrowBigUpLine } from 'tabler-icons-react'
import { uploadVideo } from '../api'
import EditVideoForm from './EditVideoForm'

const UploadVideo = () => {
    const [opened, setOpened] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)

    const mutation = useMutation(uploadVideo)

    const config = {
        onUploadProgress: (progressEvent: any) => {
            const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
            )
            setProgress(percent)
        },
    }

    function upload(files: Array<File>) {
        const formData = new FormData()
        formData.append('video', files[0])
        mutation.mutate({ formData, config })
    }

    return (
        <>
            <Modal
                closeOnClickOutside={false}
                onClose={() => setOpened(false)}
                opened={opened}
                size="xl"
                title="Upload video"
            >
                {progress === 0 && (
                    <Dropzone
                        onDrop={(files) => {
                            upload(files)
                        }}
                        accept={[MIME_TYPES.mp4]}
                        multiple={false}
                    >
                        <Group
                            position="center"
                            spacing="xl"
                            style={{
                                minHeight: '50vh',
                                justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <ArrowBigUpLine />
                            <Text>Drag video here or click to find</Text>
                        </Group>
                    </Dropzone>
                )}

                {progress > 0 && (
                    <Progress
                        size="xl"
                        label={`${progress}%`}
                        value={progress}
                        mb="xl"
                    />
                )}

                {mutation.data && (
                    <EditVideoForm
                        videoId={mutation.data.videoId}
                        setOpened={setOpened}
                    />
                )}
            </Modal>
            <Button onClick={() => setOpened(true)}>Upload video</Button>
        </>
    )
}

export default UploadVideo
