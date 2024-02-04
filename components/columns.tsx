"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
export type Crypto = {
	crypto: string
	rate: number
	high: number
	low: number
}

// Define a currency formatter for USD
const currencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "EUR",
})

export const columns: ColumnDef<Crypto>[] = [
	{
		accessorKey: "crypto",
		header: "Crypto",
		cell: (info) => info.getValue() as string,
	},
	{
		accessorKey: "rate",
		header: "Rate",
		cell: (info) => currencyFormatter.format(info.getValue() as number),
	},
	{
		accessorKey: "high",
		header: "High",
		cell: (info) => currencyFormatter.format(info.getValue() as number),
	},
	{
		accessorKey: "low",
		header: "Low",
		cell: (info) => currencyFormatter.format(info.getValue() as number),
	},
]
