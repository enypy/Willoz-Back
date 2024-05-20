import express from "express"
import { getUserListings, getUserInfos } from "../controllers/users.js"
import authenticateUser from "../middleware/authentication.js"

const router = express.Router()

router.get('/infos/:id', getUserInfos)
router.use(authenticateUser)
router.get('/listings', getUserListings)

export default router