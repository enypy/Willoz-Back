import NotFoundError from "errors/not-found.js"
import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import Listing from "models/Listing.js"

const getAllListings : RequestHandler  = async (req, res) => {
    const allListings = await Listing.find()
    const userCreatedListings = await Listing.find({ createdBy: req.user.userId })
    res
        .status(StatusCodes.OK)
        .json({ allListings, userCreatedListings })
}

const getListing : RequestHandler  = async (req, res) => {
    const { id: listingId } = req.params

    const listing = await Listing.find({ _id: listingId })

    if (!listing) throw new NotFoundError(`Listing id ${listingId} not found`)

    res
        .status(StatusCodes.OK)
        .json({ listing })
}

const createListing : RequestHandler  = async (req, res) => {
    req.body.createdBy = req.user.userId
    const listing = await Listing.create({ ...req.body })
    res
        .status(StatusCodes.CREATED)
        .json({ listing })
}

const updateListing : RequestHandler  = async (req, res) => {

}

const deleteListing : RequestHandler  = async (req, res) => {

}

export {
    getAllListings,
    createListing,
    getListing,
    updateListing,
    deleteListing
}