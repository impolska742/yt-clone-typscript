import { Video, VideoModel } from './video.model'

export function createVideo(owner: Video['owner']) {
    return VideoModel.create({ owner })
}

export function findVideo(videoId: Video['videoId']) {
    return VideoModel.findOne({ videoId })
}
