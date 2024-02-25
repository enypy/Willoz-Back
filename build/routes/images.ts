import { getImage, uploadImage } from "../controllers/images.js"
import { Router } from "express"
import authenticateUser from "../middleware/authentication.js"

const router = Router()

router.get('/:name', getImage)
router.use(authenticateUser)
router.post('/upload', uploadImage)

export default router

