import express from "express"
import { readMessage, sendMessage, getAllMessages, deleteMessage, getMessage } from "../controllers/messages.js"
import authenticateUser from "../middleware/authentication.js"

const router = express.Router()

router.use(authenticateUser)
router.patch('/:id/read', readMessage)
router.route('/')
    .post(sendMessage)
    .get(getAllMessages)
    .delete(deleteMessage)
router.get('/:id', getMessage)

export default router