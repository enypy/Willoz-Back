const validateEnvVar = () => {
    if (!process.env.MONGO_URI) throw new Error("Please provide process.env.MONGO_URI")
    if (!process.env.JWT_SECRET) throw new Error("Please provide process.env.JWT_SECRET")
    if (!process.env.JWT_LIFETIME) throw new Error("Please provide process.env.JWT_LIFETIME")
    if (!process.env.STRIPE_SK) throw new Error("Please provide process.env.STRIPE_SK")
    if (!process.env.STRIPE_WHSEC) throw new Error("Please provide process.env.STRIPE_WHSEC")
    if (!process.env.MJ_APIKEY_PUBLIC) throw new Error("Please provide process.env.MJ_APIKEY_PUBLIC")
    if (!process.env.MJ_APIKEY_PRIVATE) throw new Error("Please provide process.env.MJ_APIKEY_PRIVATE")
    if (!process.env.MJ_FROM_EMAIL) throw new Error("Please provide process.env.MJ_FROM_EMAIL")
}

export default validateEnvVar