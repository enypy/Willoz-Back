import { getImage, uploadImage } from "../controllers/images.js"
import { Router } from "express"

const router = Router()

router.post('/upload', uploadImage)
router.get('/:name', getImage)

export default router

