import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useResponsiveDevice = () => {
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';
  const isXxsQuery = useMediaQuery(theme.breakpoints.down('xxs'));
  const isMobileQuery = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletQuery = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLaptopQuery = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktopQuery = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isLargeScreenQuery = useMediaQuery(theme.breakpoints.up('xl'));
  const [isDeviceLoading, setDeviceLoading ] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState({
    deviceType: 'unknown',
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
    isLargeScreen: false,
    isTouch: false,
    isRtl: isRtl,
  });

  useEffect(() => {
    const checkDeviceType = () => {
      if (typeof window === 'undefined') {
        return;
      }
  
      const userAgent = navigator.userAgent;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
      let deviceType = 'desktop';
      if (isMobileQuery || /Mobi|Android/i.test(userAgent)) {
        deviceType = 'mobile';
      } else if (isTabletQuery || /iPad|Android.*(mobile)?|Tablet|Touch/.test(userAgent) || isTouch) {
        deviceType = 'tablet';
      } else if (isLaptopQuery) {
        deviceType = 'laptop';
      } else if (isDesktopQuery) {
        deviceType = 'desktop';
      } else if (isLargeScreenQuery) {
        deviceType = 'largeScreen';
      }
  
      setDeviceInfo({
        deviceType,
        isMobile: isMobileQuery,
        isTablet: isTabletQuery,
        isLaptop: isLaptopQuery,
        isDesktop: isDesktopQuery,
        isLargeScreen: isLargeScreenQuery,
        isTouch,
        isRtl,
      });
  
      setDeviceLoading(false);
    };
  
    checkDeviceType();
  
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkDeviceType, 150);
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  
  }, [
    isMobileQuery,
    isTabletQuery,
    isLaptopQuery,
    isDesktopQuery,
    isLargeScreenQuery,
    isRtl,
    theme
  ]);
  
  
  return {
    ...deviceInfo,
    isXxs: isXxsQuery,
    isDeviceLoading,
    isSmallScreen: isXxsQuery || isMobileQuery || isTabletQuery,
  };
};

