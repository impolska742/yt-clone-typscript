export enum QueryKeys {
    me = 'me',
    videos = 'videos',
}

export interface Me {
    _id: string
    email: string
    username: string
}
