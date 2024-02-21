const validateEnvVar = () => {
    if (!process.env.MONGO_URI) throw new Error("Please provide process.env.MONGO_URI")
    if (!process.env.JWT_SECRET) throw new Error("Please provide process.env.JWT_SECRET")
    if (!process.env.JWT_LIFETIME) throw new Error("Please provide process.env.JWT_LIFETIME")
}

export default validateEnvVar