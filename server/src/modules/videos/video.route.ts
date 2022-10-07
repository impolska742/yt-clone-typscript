import express from 'express'
import requireUser from '../../middlewares/requireUser'
import {
    getPublishedVideos,
    updateVideoHandler,
    uploadVideoHandler,
} from './video.controller'

const router = express.Router()

router.post('/', requireUser, uploadVideoHandler)
router.patch('/:videoId', requireUser, updateVideoHandler)
router.get('/', getPublishedVideos)

export default router
