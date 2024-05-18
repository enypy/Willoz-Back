import express from "express"
import { getUserListings } from "../controllers/users.js"
import authenticateUser from "../middleware/authentication.js"

const router = express.Router()

router.use(authenticateUser)
router.get('/listings', getUserListings)

export default router