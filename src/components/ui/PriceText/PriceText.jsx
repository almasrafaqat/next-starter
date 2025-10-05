import FormatPrice from '@/components/FormatPrice/FormatPrice';
import { styled, Typography } from '@mui/material';
import React from 'react'

const StyledPriceText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

const PriceText = ({ price, currency,  sx = {}, ...props }) => {
  return (
    <StyledPriceText variant="subtitle2" sx={sx} {...props}>
      <FormatPrice price={price} fromCurrency={currency} />
    </StyledPriceText>
  )
}

export default PriceText