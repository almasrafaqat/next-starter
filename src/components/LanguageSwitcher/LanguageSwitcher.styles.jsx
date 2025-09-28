import { styled } from '@mui/material/styles';

export const SelectWrapper = styled('div')(({ theme }) => ({
  '& .MuiSelect-select': {
    color: theme.palette.primary.contrastText,
    fontSize: '0.875rem',
    padding: theme.spacing(0.5, 1),
  },
  '& .MuiSelect-icon': {
    color: theme.palette.primary.contrastText,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));