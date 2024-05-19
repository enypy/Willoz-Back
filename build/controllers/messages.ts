import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import Message from "../models/Message.js"
import BadRequestError from "../errors/bad-request.js"
import NotFoundError from "../errors/not-found.js"

export const sendMessage: RequestHandler = async (req, res) => {
    const senderId = req.user.userId
    const { receiverId, content } = req.body

    if (!receiverId || !content) {
        throw new BadRequestError("Receiver ID and content are required")
    }

    const message = await Message.create({ senderId, receiverId, isOpen: false, content })
    res
        .status(StatusCodes.CREATED)
        .json({ message })
}

export const readMessage: RequestHandler = async (req, res) => {
    const { id } = req.params
    const userId = req.user.userId

    const message = await Message.findById(id)

    if (!message) {
        throw new NotFoundError(`Message with id ${id} not found`)
    }

    if (message.senderId.toString() !== userId && message.receiverId.toString() !== userId) {
        throw new BadRequestError("You are not authorized to read this message")
    }

    message.isOpen = true
    await message.save()

    res
        .status(StatusCodes.OK)
        .json({ message })
}

export const getAllMessages: RequestHandler = async (req, res) => {
    const userId = req.user.userId

    const messages = await Message.find({
        $or: [
            { senderId: userId },
            { receiverId: userId }
        ]
    })

    res
        .status(StatusCodes.OK)
        .json({ messages })
}

export const getMessage: RequestHandler = async (req, res) => {
    const { id } = req.params
    const userId = req.user.userId

    const message = await Message.findById(id)
    if (!message) {
        throw new NotFoundError(`Message with id ${id} not found`)
    }

    if (message.senderId.toString() !== userId && message.receiverId.toString() !== userId) {
        throw new BadRequestError("You are not authorized to view this message")
    }

    res
        .status(StatusCodes.OK)
        .json({ message })
}

export const deleteMessage: RequestHandler = async (req, res) => {
    const { id } = req.params
    const userId = req.user.userId

    const message = await Message.findById(id)
    if (!message) {
        throw new NotFoundError(`Message with id ${id} not found`)
    }

    if (message.senderId.toString() !== userId && message.receiverId.toString() !== userId) {
        throw new BadRequestError("You are not authorized to delete this message")
    }

    await message.deleteOne()

    res
        .status(StatusCodes.OK)
        .send()
}
