import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useResponsiveLayout = () => {
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

  return { 
    theme, 
    isRtl, 
    isMobile, 
    isTablet, 
    isLaptop, 
    isDesktop, 
    isLargeScreen,
    isSmallScreen: isMobile || isTablet,
   };
};