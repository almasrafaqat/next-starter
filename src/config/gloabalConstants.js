import { ROUTES } from "@/i18n/routing";
import { Star, Store } from "@mui/icons-material";

const iconComponents = {
  Star,
  Store,
  // Add more icons as needed
};

export const navItems = [
  { icon: "Star", labelKey: ROUTES.BEST_SELLERS.labelKey, href: ROUTES.BEST_SELLERS.path },
  { icon: "Store", labelKey: ROUTES.LOCALE_WAREHOUSE.labelKey, href: ROUTES.LOCALE_WAREHOUSE.path },
  { icon: "Store", labelKey: ROUTES.LOCALE_WAREHOUSE.labelKey, href: ROUTES.LOCALE_WAREHOUSE.path },
  { icon: "Store", labelKey: ROUTES.LOCALE_WAREHOUSE.labelKey, href: ROUTES.LOCALE_WAREHOUSE.path },
  { icon: "Store", labelKey: ROUTES.LOCALE_WAREHOUSE.labelKey, href: ROUTES.LOCALE_WAREHOUSE.path },
  { icon: "Store", labelKey: ROUTES.LOCALE_WAREHOUSE.labelKey, href: ROUTES.LOCALE_WAREHOUSE.path },
  { icon: "Store", labelKey: ROUTES.LOCALE_WAREHOUSE.labelKey, href: ROUTES.LOCALE_WAREHOUSE.path },
  { icon: "Store", labelKey: ROUTES.LOCALE_WAREHOUSE.labelKey, href: ROUTES.LOCALE_WAREHOUSE.path },
  { icon: "Store", labelKey: ROUTES.LOCALE_WAREHOUSE.labelKey, href: ROUTES.LOCALE_WAREHOUSE.path },
  { icon: "Store", labelKey: ROUTES.LOCALE_WAREHOUSE.labelKey, href: ROUTES.LOCALE_WAREHOUSE.path },
  { icon: "Store", labelKey: ROUTES.LOCALE_WAREHOUSE.labelKey, href: ROUTES.LOCALE_WAREHOUSE.path },
  { icon: "Store", labelKey: ROUTES.LOCALE_WAREHOUSE.labelKey, href: ROUTES.LOCALE_WAREHOUSE.path },
];


export const getIconComponent = (iconName) => iconComponents[iconName] || null;



// Other constants
export const SIGN_PAGE_BG_IMAGE = { path: '/imgs/verify-email.jpg', alt: 'image.signInImage'};
export const REGISTER_PAGE_BG_IMAGE = { path: '/imgs/verify-email.jpg', alt: 'image.registerImage'};
export const RESET_PASS_PAGE_BG_IMAGE = { path: '/imgs/verify-email.jpg', alt: 'image.resetPassImage'};
export const FORGOT_PASS_PAGE_BG_IMAGE = { path: '/imgs/verify-email.jpg', alt: 'image.forgotPassImage'};
export const VERIFY_EMAIL_PAGE_BG_IMAGE = { path: '/imgs/verify-email.jpg', alt: 'image.verifyEmailImage'};
export const COUNTER_REDIRECT_TIME = 2000;
export const COUNTER_RESET = 3000;
export const RESEND_COOLDOWN = 60;
