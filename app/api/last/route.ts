import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const COINLAYER_API_KEY = process.env.COINLAYER_API_KEY
	const API_ENDPOINT = `http://api.coinlayer.com/live?access_key=${COINLAYER_API_KEY}&target=EUR&expand=1`

	try {
		// const { userId } = auth()
		// if (!userId) return new NextResponse("Unauthorized", { status: 401 })
		const response = await fetch(API_ENDPOINT)
		const data = await response.json()

		if (data.success) {
			const transformedData = Object.keys(data.rates).map((cryptoCode) => ({
				crypto: cryptoCode,
				rate: data.rates[cryptoCode].rate,
				high: data.rates[cryptoCode].high, // Placeholder, not actual high
				low: data.rates[cryptoCode].low, // Placeholder, not actual low
			}))

			return new NextResponse(
				JSON.stringify(
					{
						last_updated: new Date().toISOString(), // Current date and time
						rates: transformedData,
					},
					null,
					2
				),
				{ status: 200 }
			)
		} else return new NextResponse("Internal error", { status: 500 })
	} catch (error) {
		console.log("[INTERNAL_ERROR]", error)
		return new NextResponse("Internal error", { status: 500 })
	}
}
