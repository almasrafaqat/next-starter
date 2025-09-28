import { styled } from '@mui/material/styles';
import {  IconButton } from '@mui/material';

export const ScrollWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
}));

export const ScrollContainer = styled('div')(({ theme, isRtl, gap }) => ({
  display: 'flex',
  alignItems: 'center',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  padding: theme.spacing(1, 4), // Added horizontal padding for arrow buttons
  width: '100%',
  direction: isRtl ? 'ltr' : 'ltr',
  gap: theme.spacing(gap), // Consistent gap between items

  // Ensure children maintain their size and don't grow/shrink
  '& > *': {
    flexShrink: 0,
  },
}));

export const ArrowButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  zIndex: 2,
  cursor: 'pointer',
  borderRadius: '4px',
  width: '5%',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
  '&.left': {
    left: -20,
  },
  '&.right': {
    right: -20,
  },
}));

