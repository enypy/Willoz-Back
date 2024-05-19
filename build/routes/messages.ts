import express from "express"
import { readMessage, sendMessage, getAllMessages, deleteMessage, getMessage } from "../controllers/messages.js"
import authenticateUser from "../middleware/authentication.js"

const router = express.Router()

router.use(authenticateUser)
router.patch('/:id/read', readMessage)
router.route('/')
    .post(sendMessage)
    .get(getAllMessages)
router.route('/:id')
    .get(getMessage)
    .delete(deleteMessage)

export default router