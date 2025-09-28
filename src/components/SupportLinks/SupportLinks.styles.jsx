import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';

export const SupportLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
  fontSize: '0.875rem',
  gap: theme.spacing(0.5),
  direction: 'ltr', // Force LTR for link content

  '&:hover': {
    textDecoration: 'underline',
  },

  '.support-text': {
    display: 'inline-block',
    direction: 'ltr', // Force LTR for text
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '0',
  },
}));

export const SupportIcon = styled('span')(({ }) => ({
  display: 'flex',
  alignItems: 'center',
  lineHeight: 1,
}));