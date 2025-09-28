import { styled } from '@mui/material/styles';
import { Paper, ListItem, Typography } from '@mui/material';

export const RecentViewsContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'show',
})(({ theme, show }) => ({
  width: 300,
  backgroundColor: theme.palette.background.paper,
  borderLeft: `1px solid ${theme.palette.divider}`,
  transform: show ? 'translateX(0)' : 'translateX(100%)',
  opacity: show ? 1 : 0,
  transition: theme.transitions.create(['transform', 'opacity'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const ProductItem = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer',
  },
}));

export const StockLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme, variant }) => ({
  fontSize: '0.75rem',
  padding: '2px 6px',
  borderRadius: 2,
  backgroundColor: variant === 'low' ? 'yellow' : 'red',
  color: variant === 'low' ? 'black' : 'white',
}));

export const PriceText = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

