import BadRequestError from "../errors/bad-request.js"
import NotFoundError from "../errors/not-found.js"
import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import Listing from "../models/Listing.js"
import { ListingQuery, ListingQueryParams } from "build/types/ListingQueryParams.js"

const getAllListings: RequestHandler = async (req, res) => {
    const { limit, offset, city, startDate, endDate, minPrice, maxPrice } = req.query as ListingQueryParams
    const limitNumber = parseInt(limit as string) || 10
    const offsetNumber = parseInt(offset as string) || 0
    const query: ListingQuery = {}

    if (city) {
        query['adress.city'] = city
    }

    if (startDate || endDate) {
        query.createdAt = {}
        if (startDate) {
            query.createdAt.$gte = new Date(startDate as string)
        }
        if (endDate) {
            query.createdAt.$lte = new Date(endDate as string)
        }
    }

    if (minPrice || maxPrice) {
        query.price = {}
        if (minPrice) {
            query.price.$gte = parseFloat(minPrice as string)
        }
        if (maxPrice) {
            query.price.$lte = parseFloat(maxPrice as string)
        }
    }

    const allListings = await Listing.find(query)
        .skip(offsetNumber)
        .limit(limitNumber)


    res
        .status(StatusCodes.OK)
        .json({ allListings })
}


const getListing: RequestHandler = async (req, res) => {
    const { id: listingId } = req.params

    const listing = await Listing.find({ _id: listingId })

    if (!listing) throw new NotFoundError(`Listing id ${listingId} not found`)

    res
        .status(StatusCodes.OK)
        .json({ listing })
}

const createListing: RequestHandler = async (req, res) => {
    req.body.createdBy = req.user.userId
    const listing = await Listing.create({ ...req.body })
    res
        .status(StatusCodes.CREATED)
        .json({ listing })
}

const updateListing: RequestHandler = async (req, res) => {
    const {
        user: { userId },
        params: { id: listingId }
    } = req
    const body = req.body

    if (!body.title || !body.description || !body.price || !body.adress?.city || !body.adress?.zipCode) throw new BadRequestError('Title, description, price, city and zipCode fields are required')

    const listing = await Listing.findOneAndUpdate({ createdBy: userId, _id: listingId }, body, { new: true, runValidators: true })

    if (!listing) throw new NotFoundError(`Listing id ${listingId} not found`)

    res
        .status(StatusCodes.CREATED)
        .json({ listing })
}

const deleteListing: RequestHandler = async (req, res) => {
    const { user: { userId }, params: { id: listingId } } = req

    const listing = await Listing.findOneAndDelete({ createdBy: userId, _id: listingId })

    if (!listing) throw new NotFoundError(`Listing id ${listingId} not found`)

    res
        .status(StatusCodes.OK)
        .send()
}

export {
    getAllListings,
    createListing,
    getListing,
    updateListing,
    deleteListing
}