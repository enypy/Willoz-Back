import BadRequestError from "../errors/bad-request.js"
import NotFoundError from "../errors/not-found.js"
import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import Listing from "../models/Listing.js"
import { ListingQuery, ListingQueryParams } from "build/types/ListingQueryParams.js"
import validateQueryParam from "../utils/validateQueryParam.js"

const getAllListings: RequestHandler = async (req, res) => {
    const { limit, offset, city, startDate, endDate, minPrice, maxPrice } = req.query as ListingQueryParams
    const limitNumber = validateQueryParam(limit) ? parseInt(limit as string) : 10
    const offsetNumber = validateQueryParam(offset) ? parseInt(offset as string) : 0
    const query: ListingQuery = {}

    if (validateQueryParam(city)) {
        query['adress.city'] = city
    }

    if (startDate || endDate) {
        if (validateQueryParam(startDate)) {
            query.createdAt = {}
            query.createdAt.$gte = new Date(startDate as string)
        }
        if (validateQueryParam(endDate)) {
            if (!query.createdAt) query.createdAt = {}
            query.createdAt.$lte = new Date(endDate as string)
        }
    }

    if (minPrice || maxPrice) {
        if (validateQueryParam(minPrice)) {
            query.price = {}
            query.price.$gte = parseFloat(minPrice as string)
        }
        if (validateQueryParam(maxPrice)) {
            if (!query.price) query.price = {}
            query.price.$lte = parseFloat(maxPrice as string)
        }
    }

    const totalListings = await Listing.countDocuments(query)

    const listings = await Listing.find(query)
        .skip(offsetNumber)
        .limit(limitNumber)

    res
        .status(StatusCodes.OK)
        .json({ listings, total: totalListings })
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