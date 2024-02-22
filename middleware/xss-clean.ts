import { RequestHandler } from "express"
import xss from "xss";


const xssClean: RequestHandler = (req, res, next) => {

    if (req.body && Array.isArray(req.body)) {
        const newData = req.body.map(item => {
            const newItem = {};
            for (const [key, value] of Object.entries(item)) {
                    newItem[xss(key)] = xss(value);
            }
            return newItem;
        })
        next()
    }

    if(req.params) {
        for (const [key, value] of Object.entries(req.params)) {
            req.params[xss(key)] = xss(value);
    }
    }
}


export default xssClean