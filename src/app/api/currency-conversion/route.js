import { NextResponse } from "next/server"

// Hardcoded PKR exchange rates
const PKR_RATES = {
  PKR: 1,
  USD: 0.0036,
  EUR: 0.0033,
  GBP: 0.0028,
  AED: 0.013,
  SAR: 0.013,
  INR: 0.3,
  JPY: 0.54,
  AUD: 0.0055,
  CAD: 0.0049,
  CHF: 0.0032,
  CNY: 0.026,
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from") || "PKR"
    const to = searchParams.get("to")

    if (!to) {
      return NextResponse.json({ error: "Missing target currency" }, { status: 400 })
    }

    // Handle PKR-based conversions
    if (from === "PKR") {
      const currencies = to.split(",")
      const rates = {}

      currencies.forEach((currency) => {
        if (PKR_RATES[currency]) {
          rates[currency] = PKR_RATES[currency]
        }
      })

      return NextResponse.json({ rates })
    }

    // Fallback to external API for non-PKR conversions
    const response = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`)

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates")
    }

    const data = await response.json()
    return NextResponse.json({ rates: data.rates })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
