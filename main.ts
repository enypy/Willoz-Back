import express from "express"
import connectDB from "./db/connect.js"
import DBError from "./errors/db-error.js"
import rateLimiter from "express-rate-limit"
import listingsRouter from "./routes/listings.js"
import authRouter from "./routes/auth.js"

const app = express()

app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
}))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/listings', listingsRouter)

const hostname = process.env.SERVER_HOST || '127.0.0.1'
const port = Number(process.env.PORT) || 3000

const start = async () => {    
    try {
        if(!process.env.MONGO_URI) {
            throw new DBError("MONGO DB CONNECTION: process.env.MONGO_URI is undefined")
        }
        await connectDB(process.env.MONGO_URI)
        app.listen(port, hostname, () =>
            console.log(`Server is listening on http://${hostname}:${port}...`)
        )
    } catch (error) {
        console.error(error)
    }
}

start()