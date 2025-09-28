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