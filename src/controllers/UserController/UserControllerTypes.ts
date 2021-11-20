export type fileType = {
    mimetype: string
    fieldname: string
    originalname: string
    encoding: string
    destination: string
    filename: string
    path: string
    size: number
}

export type userType = {
    name: string
    password: string
    lastname: string
    avatar: fileType
}