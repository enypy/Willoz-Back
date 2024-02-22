import BadRequestError from "../errors/bad-request.js"
import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import path from "path"
import { fileURLToPath } from "url"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"
import NotFoundError from "../errors/not-found.js"
import { fileTypeFromBuffer, fileTypeFromFile, FileTypeResult } from 'file-type'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const uploadImage: RequestHandler = async (req, res) => {
    if (!req.files?.image) throw new BadRequestError("Image file required")

    const { image } = req.files

    if (image instanceof Array) new BadRequestError("Please make sure to send only one image at a time")

    const fileType = await fileTypeFromBuffer(image.data)

    if (!fileType || !/^image/.test(fileType.mime)) throw new BadRequestError("Unsupported file type")

    const filename = uuidv4() + "." + fileType.ext

    image.mv(__dirname + "/../upload/" + filename)

    res
        .status(StatusCodes.OK)
        .json({ url: filename })
}

const getImage: RequestHandler = async (req, res) => {
    const { name } = req.params

    const filePath = __dirname + "/../upload/" + name

    if (!fs.existsSync(filePath)) throw new NotFoundError(`Image ${name} not found`)

    const file = fs.createReadStream(filePath)

    const { mime } = await fileTypeFromFile(filePath) as FileTypeResult
    res
        .setHeader('Content-type', mime)
        .status(StatusCodes.OK)
    file.pipe(res)
}

export { uploadImage, getImage }