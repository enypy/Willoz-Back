import BadRequestError from "../errors/bad-request.js"
import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import path from "path"
import { fileURLToPath } from "url"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const uploadImage: RequestHandler = (req, res) => {
    const { image } : any = req.files

    if (!image) throw new BadRequestError("Image file required")

    if (!/^image/.test(image.mimetype)) throw new BadRequestError("The file is not an image")

    const filename = uuidv4() + "." + image.name.split(".")[1]

    image.mv(__dirname + "/../upload/" + filename)

    res
        .status(StatusCodes.OK)
        .json({ url: filename })
}

const getImage: RequestHandler = (req, res) => {
    console.log(req.params)
    const { name } = req.params

    const file = fs.createReadStream(__dirname + "/../upload/" + name)

    res
    .setHeader("Content-type", "image/png")
    .status(StatusCodes.OK)
    file.pipe(res)
}

export { uploadImage, getImage }