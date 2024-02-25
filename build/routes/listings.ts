import { Router } from "express"
import { getAllListings, createListing, getListing, updateListing, deleteListing } from "../controllers/listings.js"
import authenticateUser from "../middleware/authentication.js"

const router = Router()

router.get('/', getAllListings)
router.get('/:id', getListing)

router.use(authenticateUser)

router.post('/', createListing)
router.route('/:id')
    .patch(updateListing)
    .delete(deleteListing)


export default router