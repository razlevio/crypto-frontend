import { NextRequest, NextResponse } from "next/server"
import { Crypto } from "@prisma/client"

import { db } from "@/lib/db"

function isAlphabetic(str: string) {
	return /^[A-Za-z]+$/.test(str)
}

export async function POST(req: NextRequest) {
	const COINLAYER_API_KEY = process.env.COINLAYER_API_KEY
	const API_ENDPOINT = `http://api.coinlayer.com/live?access_key=${COINLAYER_API_KEY}&target=EUR&expand=1`

	try {
		const response = await fetch(API_ENDPOINT)
		const data = await response.json()

		if (data.success) {
			let transformedData = Object.keys(data.rates)
				.map((cryptoCode) => {
					if (data.rates[cryptoCode] && isAlphabetic(cryptoCode)) {
						// Check if the rate object exists
						return {
							crypto: cryptoCode,
							rate: data.rates[cryptoCode].rate,
							high: data.rates[cryptoCode].high || 0, // Replace null with 0
							low: data.rates[cryptoCode].low || 0, // Replace null with 0
						}
					}
					return undefined // Explicitly return undefined for missing rate objects
				})
				.filter((item) => item !== undefined)

			console.log(transformedData)

			// Save the data to the database
			await db.crypto.createMany({
				data: transformedData as Crypto[],
			})

			return new NextResponse(JSON.stringify({ rates: transformedData }, null, 2), { status: 200 })
		} else return new NextResponse("Internal error", { status: 500 })
	} catch (error) {
		console.log("[INTERNAL_ERROR]", error)
		return new NextResponse("Internal error", { status: 500 })
	}
}
