import { Button, Modal } from '@mantine/core'
import React, { useState } from 'react'

const UploadVideo = () => {
    const [opened, setOpened] = useState(false)
    return (
        <>
            <Modal
                closeOnClickOutside={false}
                onClose={() => setOpened(false)}
                opened={opened}
                size="xl"
                title="Upload video"
            >
                Hello
            </Modal>
            <Button onClick={() => setOpened(true)}>Upload video</Button>
        </>
    )
}

export default UploadVideo
