import { useState, useEffect } from 'react';

export const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    deviceType: 'unknown',
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const checkDeviceType = () => {
      if (typeof window === 'undefined') {
        return;
      }

      const userAgent = navigator.userAgent;
      const width = window.innerWidth;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      let deviceType = 'desktop';
      let isMobile = false;
      let isTablet = false;
      let isDesktop = false;

      if (width < 768 || /Mobi|Android/i.test(userAgent)) {
        deviceType = 'mobile';
        isMobile = true;
      } else if (width < 1024 || /iPad|Android.*(mobile)?|Tablet|Touch/.test(userAgent) || isTouch) {
        deviceType = 'tablet';
        isTablet = true;
      } else {
        deviceType = 'desktop';
        isDesktop = true;
      }

      setDeviceInfo({ deviceType, isMobile, isTablet, isDesktop });
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);

    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  return deviceInfo;
};

// For non-React usage or if you prefer a function
export const getDeviceType = () => {
  if (typeof window === 'undefined') {
    return {
      deviceType: 'unknown',
      isMobile: false,
      isTablet: false,
      isDesktop: false,
    };
  }

  const userAgent = navigator.userAgent;
  const width = window.innerWidth;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (width < 768 || /Mobi|Android/i.test(userAgent)) {
    return {
      deviceType: 'mobile',
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    };
  }

  if (width < 1024 || /iPad|Android.*(mobile)?|Tablet|Touch/.test(userAgent) || isTouch) {
    return {
      deviceType: 'tablet',
      isMobile: false,
      isTablet: true,
      isDesktop: false,
    };
  }

  return {
    deviceType: 'desktop',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  };
};



// export const getDeviceType = () => {
//   // Check if window is available (client-side)
//   if (typeof window === 'undefined') {
//     return 'unknown';
//   }

//   const userAgent = navigator.userAgent;
//   const width = window.innerWidth;

//   // Check for touch capability
//   const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

//   // Mobile detection
//   if (width < 768 || /Mobi|Android/i.test(userAgent)) {
//     return 'mobile';
//   }

//   // Tablet detection
//   if (width < 1024 || /iPad|Android.*(mobile)?|Tablet|Touch/.test(userAgent) || isTouch) {
//     return 'tablet';
//   }

//   // Default to desktop
//   return 'desktop';
// };