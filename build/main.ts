import "express-async-errors"
import express from "express"
import connectDB from "./db/connect.js"
import rateLimiter from "express-rate-limit"
import listingsRouter from "./routes/listings.js"
import authRouter from "./routes/auth.js"
import authenticateUser from "./middleware/authentication.js"
import validateEnvVar from "./utils/validateEnvVar.js"
import helmet from "helmet"
import cors from "cors"
import xssClean from "./middleware/xss-clean.js"
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"
import fileUpload from "express-fileupload"
import imagesRouter from "./routes/images.js"

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', 1)

app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
}))

app.use(fileUpload({
    limits: {
        fileSize: 5 * 1024 * 1024, 
    },
    abortOnLimit: true,
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xssClean)


app.use('/api/v1/images', imagesRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/listings', listingsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const hostname = process.env.SERVER_HOST || '127.0.0.1'
const port = Number(process.env.PORT) || 3000

const start = async () => {
    try {
        validateEnvVar()
        await connectDB(process.env.MONGO_URI as string)
        app.listen(port, hostname, () =>
            console.log(`Server listening on http://${hostname}:${port}...`)
        )
    } catch (error) {
        console.error(error)
    }
}

start()