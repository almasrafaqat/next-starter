import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const COMMON_CURRENCIES = [
  "PKR", // Base currency
  "USD",
  "EUR",
  "GBP",
  "AED", // UAE Dirham (common in Pakistan)
  "SAR", // Saudi Riyal (common in Pakistan)
  "INR", // Indian Rupee (neighboring country)
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
]

const PKR_EXCHANGE_RATES = {
  PKR: 1, // Base currency
  USD: 0.0036, // 1 PKR = 0.0036 USD (approximately 278 PKR = 1 USD)
  EUR: 0.0033, // 1 PKR = 0.0033 EUR
  GBP: 0.0028, // 1 PKR = 0.0028 GBP
  AED: 0.013, // 1 PKR = 0.013 AED
  SAR: 0.013, // 1 PKR = 0.013 SAR
  INR: 0.3, // 1 PKR = 0.30 INR
  JPY: 0.54, // 1 PKR = 0.54 JPY
  AUD: 0.0055, // 1 PKR = 0.0055 AUD
  CAD: 0.0049, // 1 PKR = 0.0049 CAD
  CHF: 0.0032, // 1 PKR = 0.0032 CHF
  CNY: 0.026, // 1 PKR = 0.026 CNY
}

export const fetchCommonExchangeRates = createAsyncThunk(
  "currency/fetchCommonExchangeRates",
  async (_, { rejectWithValue }) => {
    try {
      // Return hardcoded PKR rates since APIs don't support PKR
      return PKR_EXCHANGE_RATES
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchExchangeRate = createAsyncThunk(
  "currency/fetchExchangeRate",
  async (currency, { rejectWithValue }) => {
    try {
      if (PKR_EXCHANGE_RATES[currency]) {
        return { [currency]: PKR_EXCHANGE_RATES[currency] }
      }

      // Fallback to API for currencies not in our hardcoded rates
      const response = await fetch(`/api/currency-conversion?from=PKR&to=${currency}`)
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rate")
      }
      const data = await response.json()
      return { [currency]: data.rates[currency] }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const initialState = {
  currency: "PKR",
  symbol: "₨",
  locale: "en-PK",
  language: "en",
  exchangeRates: PKR_EXCHANGE_RATES, // Initialize with PKR rates
  status: "idle",
  error: null,
}

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      const { currency, symbol, locale } = action.payload
      state.currency = currency
      state.symbol = symbol
      state.locale = locale
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    updateExchangeRates: (state, action) => {
      state.exchangeRates = { ...state.exchangeRates, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommonExchangeRates.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchCommonExchangeRates.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.exchangeRates = { ...state.exchangeRates, ...action.payload }
      })
      .addCase(fetchCommonExchangeRates.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.exchangeRates = { ...state.exchangeRates, ...action.payload }
      })
  },
})

export const { setCurrency, setLanguage, updateExchangeRates } = currencySlice.actions

export const selectCurrency = (state) => state.currency
export const selectedCurrent = (state) => state.currency.currency
export const storeLanguage = (state) => state.currency.language

export const convertFromPKR = (amountInPKR, targetCurrency, exchangeRates) => {
  if (targetCurrency === "PKR") return amountInPKR
  const rate = exchangeRates[targetCurrency]
  return rate ? (amountInPKR * rate).toFixed(2) : amountInPKR
}

export default currencySlice.reducer
