import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const TopHeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1, 0),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5, 0),
  },
}));
