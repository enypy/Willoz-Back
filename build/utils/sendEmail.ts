export default async function sendEmail(receiptEmail: string, receiptName: string, subject: string, textContext: string, htmlContent: string) {
    try {
        const apiKeyPublic = process.env.MJ_APIKEY_PUBLIC as string
        const apiKeyPrivate = process.env.MJ_APIKEY_PRIVATE as string
        const authHeader = 'Basic ' + Buffer.from(`${apiKeyPublic}:${apiKeyPrivate}`).toString('base64')

        const response = await fetch('https://api.mailjet.com/v3.1/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader
            },
            body: JSON.stringify({
                "Messages": [
                    {
                        "From": {
                            "Email": process.env.MJ_FROM_EMAIL,
                            "Name": process.env.MJ_FROM_NAME
                        },
                        "To": [
                            {
                                "Email": receiptEmail,
                                "Name": receiptName
                            }
                        ],
                        "Subject": subject,
                        "TextPart": textContext,
                        "HTMLPart": htmlContent,
                    }
                ]
            })
        })

        if (!response.ok) {
            throw new Error(`Failed to send email: ${response.statusText}`)
        }

        const data = await response.json()
    } catch (error) {
        console.error('Error sending email:', error)
    }

}