'use client';

import {
  Drawer,
  Box,
  IconButton,
  Typography,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDrawer } from '@/hooks/useDrawer';

const ReuseableDrawer = () => {
  const theme = useTheme();
  const {
    isOpen,
    content,
    title,
    anchor,
    hideDrawer
  } = useDrawer();

  return (
    <Drawer
      anchor={anchor}
      open={isOpen}
      onClose={hideDrawer}
      ModalProps={{
        keepMounted: true,
        style: { zIndex: theme.zIndex.modal - 1 }, // above header 1300; adjust as needed
      }}
      PaperProps={{
        sx: {
          width: anchor === 'right' || anchor === 'left' ? { xs: '90%', sm: 400 } : '100%',
          maxHeight: anchor === 'bottom' ? '85vh' : '100%',
          borderRadius: anchor === 'bottom' ? '16px 16px 0 0' : 0,

        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={hideDrawer}><CloseIcon /></IconButton>
      </Box>

      <Box sx={{ p: 2, overflowY: 'auto' }}>
        {typeof content === 'function' ? content() : content}
      </Box>
    </Drawer>
  );
};

export default ReuseableDrawer;
