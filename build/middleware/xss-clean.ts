import { RequestHandler } from "express"
import xss from "xss"


const xssClean: RequestHandler = (req, res, next) => {
    if (req.body) {
       const jsonBody = JSON.stringify(req.body)
       const cleanJsonBody = xss(jsonBody)
       req.body = JSON.parse(cleanJsonBody)
    }

    if (req.params) {
        for (const [key, value] of Object.entries(req.params)) {
            req.params[xss(key)] = xss(value)
        }
    }

    if (req.query) {
        const jsonQuery = JSON.stringify(req.query)
        const cleanJsonQuery = xss(jsonQuery)
        req.query = JSON.parse(cleanJsonQuery)
    }
    next()
}


export default xssClean