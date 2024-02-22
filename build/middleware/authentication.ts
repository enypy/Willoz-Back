import jwt, { Secret } from "jsonwebtoken"
import UnauthenticatedError from "../errors/unauthenticated.js"
import { RequestHandler } from "express"

const auth: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) throw new UnauthenticatedError('Authentication invalid')

    const token = authHeader.split(' ')[1]

    try {
        const payload  = jwt.verify(token, process.env.JWT_SECRET as Secret) as DecodedJWT
        req.user = { userId: payload.userId, name: payload.name }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }

}

export default auth