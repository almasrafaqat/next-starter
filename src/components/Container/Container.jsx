import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { Box, } from '@mui/material';



const Container = ({ children, ...props }) => {
  const { theme, isSmallScreen } = useResponsiveLayout();
  return (
    <Box
      maxWidth={isSmallScreen ? '98%' : '95%'}
      width="100%"
      margin="0 auto"
      padding={{
        xs: theme.spacing(0, 1),
        sm: theme.spacing(0, 2),
        md: theme.spacing(0, 4),
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Container;