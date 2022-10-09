import express from 'express'
import requireUser from '../../middlewares/requireUser'
import {
    getPublishedVideos,
    streamVideoHandler,
    updateVideoHandler,
    uploadVideoHandler,
} from './video.controller'

const router = express.Router()

router.post('/', requireUser, uploadVideoHandler)
router.get('/', getPublishedVideos)
router.patch('/:videoId', requireUser, updateVideoHandler)
router.get('/:videoId', streamVideoHandler)

export default router
