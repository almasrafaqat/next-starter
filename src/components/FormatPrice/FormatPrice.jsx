import { useSelector, useDispatch } from 'react-redux';
import { selectCurrency, fetchExchangeRate } from '@/store/slices/currencySlice';
import { useEffect } from 'react';

const FormatPrice = ({ price, fromCurrency = 'USD' }) => {
  const dispatch = useDispatch();
  const {
    currency,
    locale,
    exchangeRates,
    status
  } = useSelector(selectCurrency);

  useEffect(() => {
    if (status === 'succeeded' && currency !== 'USD' && !exchangeRates[currency]) {
      dispatch(fetchExchangeRate(currency));
    }
  }, [dispatch, status, currency, exchangeRates]);

  const convertPrice = (price) => {
    if (!exchangeRates[currency]) {
      return price;
    }

    if (fromCurrency === currency) {
      return price;
    }

    if (fromCurrency !== 'USD') {
      // Convert to USD first
      price = price / exchangeRates[fromCurrency];
    }

    // Convert from USD to target currency
    return price * exchangeRates[currency];
  };

  const convertedAmount = convertPrice(price);

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedAmount);
};

export default FormatPrice;

