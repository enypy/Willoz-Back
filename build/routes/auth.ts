import express from "express"
import { getUser, login, register } from "../controllers/auth.js"
import authenticateUser from "../middleware/authentication.js"

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.use(authenticateUser)
router.get('/', getUser)

export default router