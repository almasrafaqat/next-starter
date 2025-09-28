import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const PromotionItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  height: '100%',
  width: '100%',

  '& svg': {
    fontSize: '1.3rem',
    flexShrink: 0,
  },
}));
