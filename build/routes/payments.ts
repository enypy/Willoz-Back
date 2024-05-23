import { createCheckOutSession, webhook } from "../controllers/payments.js"
import express from "express"

const router = express.Router()


router.post('/create-checkout-session', createCheckOutSession)
router.post('/webhook', webhook)



export default router