import { RequestHandler } from "express"
import Stripe from "stripe"
import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/bad-request.js"
import sendEmail from "../utils/sendEmail.js"

const stripe = new Stripe(process.env.STRIPE_SK as string)

export const createCheckOutSession: RequestHandler = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price: 'price_1PJXyMBcvrkrwIgFPbWs7TdN',
                quantity: 1,
            }],
            mode: 'payment',
            ui_mode: 'embedded',
            redirect_on_completion: 'never'
        })

        res
            .status(StatusCodes.OK)
            .send({ clientSecret: session.client_secret })
    } catch (error) {
        res
            .status(StatusCodes.BAD_REQUEST)
            .send({ error: 'Failed to create checkout session' })
    }

}

export const webhook: RequestHandler = async (req, res) => {
    const sig = req.headers['stripe-signature']

    if (!sig) throw new BadRequestError(`Stripe signature is required`)
    if (!req.rawBody) throw new BadRequestError(`Request body is required`)

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WHSEC as string)
    } catch (err) {
        if (err instanceof Error) {
            console.error(err)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .send(`Webhook Error: ${err.message}`)
        } else {
            throw new BadRequestError(`Webhook signature verification failed`)
        }
    }

    switch (event.type) {
        case 'charge.succeeded':
            const charge = event.data.object as Stripe.Charge
            if (charge.billing_details.email && charge.billing_details.name) {
                const receiptUrl = charge.receipt_url
                const amount = (charge.amount / 100).toFixed(2)
                const currency = charge.currency.toUpperCase()
                const receiptName = charge.billing_details.name.split(' ')[0]

                await sendEmail(
                    charge.billing_details.email,
                    charge.billing_details.name,
                    "Willoz - Thank You for Your Donation!",
                    `Hello ${receiptName},\n\nThank you for your generous payment of ${amount} ${currency}. We appreciate your support!\n\nHere is your receipt: ${receiptUrl}\n\nBest regards,\nThe Willoz Team`,
                    `<p>Hello ${receiptName},</p>
                    <p>Thank you for your generous payment of <strong>${amount} ${currency}</strong>. We appreciate your support!</p>
                    <p>Here is your receipt: <a href="${receiptUrl}">${receiptUrl}</a></p>
                    <p>Best regards,<br>The Willoz Team</p>`
                )
            }
            break
        default:
            break
    }

    res
        .status(StatusCodes.OK)
        .send('Event received')
}