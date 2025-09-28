import { useSelector } from "react-redux"
import { selectCurrency } from "@/store/slices/currencySlice"

const FormatPrice = ({ price, fromCurrency = "PKR" }) => {
  const { currency, locale, symbol, exchangeRates } = useSelector(selectCurrency)

  const convertPrice = (price) => {
    if (fromCurrency === currency) {
      return price // Same currency, no conversion needed
    }

    if (fromCurrency === "PKR") {
      // Convert from PKR to target currency
      const rate = exchangeRates[currency]
      return rate ? price * rate : price
    }

    // If fromCurrency is not PKR, convert to PKR first, then to target
    const fromRate = exchangeRates[fromCurrency]
    if (fromRate) {
      const priceInPKR = price / fromRate
      const targetRate = exchangeRates[currency]
      return targetRate ? priceInPKR * targetRate : priceInPKR
    }

    return price // Fallback if no conversion rate available
  }

  const convertedAmount = convertPrice(price)

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedAmount)
}

export default FormatPrice
