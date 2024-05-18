import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import Listing from "../models/Listing.js"

const getUserListings: RequestHandler = async (req, res) => {

    const userListings = await Listing.find({ createdBy: req.user.userId })

    res
        .status(StatusCodes.OK)
        .json({ userListings })
}

export { getUserListings }