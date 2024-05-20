import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import Listing from "../models/Listing.js"
import User from "../models/User.js"
import NotFoundError from "../errors/not-found.js"

const getUserListings: RequestHandler = async (req, res) => {

    const userListings = await Listing.find({ createdBy: req.user.userId })

    res
        .status(StatusCodes.OK)
        .json({ userListings })
}

const getUserInfos: RequestHandler = async (req, res) => {
    const { id } = req.params

    const user = await User.findById(id)

    if (!user) throw new NotFoundError(`User id ${id} not found`)

    res
        .status(StatusCodes.OK)
        .json({ user: { username: user.name, _id: user._id } })
}

export { getUserListings, getUserInfos }