import busboy from 'busboy'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Video } from './video.model'
import { createVideo } from './video.service'
import fs from 'fs'

const MIME_TYPES = ['video/mp4']

function getPath({
    videoId,
    extension,
}: {
    videoId: Video['videoId']
    extension: Video['extension']
}) {
    const dir: string = `${process.cwd()}/videos`

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }

    return `${dir}/${videoId}.${extension}`
}

export async function uploadVideoHandler(req: Request, res: Response) {
    const bb = busboy({ headers: req.headers })
    const user = res.locals.user
    const video = await createVideo({ owner: user._id })

    bb.on('file', async (_, file, info) => {
        if (!MIME_TYPES.includes(info.mimeType)) {
            await video.delete()
            return res.status(StatusCodes.BAD_REQUEST).send('Invalid file type')
        }

        const extension = info.mimeType.split('/')[1]

        const filePath = getPath({
            videoId: video.videoId,
            extension: extension,
        })

        video.extension = extension

        await video.save()

        const stream = fs.createWriteStream(filePath)

        file.pipe(stream)
    })

    bb.on('close', () => {
        res.writeHead(StatusCodes.CREATED, {
            Connection: 'close',
            'Content-Type': 'application/json',
        })

        res.write(JSON.stringify(video))

        res.end()
    })

    return req.pipe(bb)
}
