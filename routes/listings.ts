import { Router } from "express"
import { getAllListings, createListing, getListing, updateListing, deleteListing } from "../controllers/listings.js"

const router = Router()

router.route('/')
    .get(getAllListings)
    .post(createListing)
router.route('/:id')
    .get(getListing)
    .patch(updateListing)
    .delete(deleteListing)


export default router