import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export const DropdownContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  overflow: 'hidden',
}));

export const MenuContainer = styled('div')(({ theme }) => ({
  width: 280,
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  zIndex: 1,
}));

export const UserIconWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  '& > svg': {
    fontSize: 32,
  },
}));