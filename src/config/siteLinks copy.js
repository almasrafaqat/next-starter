import {
  ShoppingBag,
  Star,
  Person,
  LocalOffer,
  CreditCard,
  Store,
  History,
  LocationOn,
  Security,
  Tune,
  Notifications,
  SwapHoriz,
  Home,
} from '@mui/icons-material';



// Define all routes
export const ROUTES = {
  HOME: { path: "/", labelKey: "link.home", icon: Home },
  SIGN_IN: { path: "/login", labelKey: "link.signIn" },
  REGISTER: { path: "/register", labelKey: "link.register" },
  FORGOT_PASSWORD: { path: "/forgot-password", labelKey: "link.forgotPassword" },
  RESET_PASSWORD: { path: "/reset-password", labelKey: "link.resetPassword" },
  TERMS: { path: "/terms", labelKey: "link.terms" },
  VERIFY_EMAIL: { path: "/verify-email", labelKey: "link.verifyEmail" },
  ORDERS: { path: "/orders", labelKey: "link.userDropdown.orders", icon: ShoppingBag },
  REVIEWS: { path: "/reviews", labelKey: "link.userDropdown.reviews", icon: Star },
  PROFILE: { path: "/profile", labelKey: "link.userDropdown.profile", icon: Person },
  COUPONS: { path: "/coupons", labelKey: "link.userDropdown.coupons", icon: LocalOffer },
  CREDIT_BALANCE: { path: "/credit", labelKey: "link.userDropdown.creditBalance", icon: CreditCard },
  PROVIDERS: { path: "/providers", labelKey: "link.userDropdown.providers", icon: Store },
  HISTORY: { path: "/history", labelKey: "link.userDropdown.history", icon: History },
  ADDRESSES: { path: "/addresses", labelKey: "link.userDropdown.addresses", icon: LocationOn },
  SECURITY: { path: "/security", labelKey: "link.userDropdown.security", icon: Security },
  PERMISSIONS: { path: "/permissions", labelKey: "link.userDropdown.permissions", icon: Tune },
  NOTIFICATIONS: { path: "/notifications", labelKey: "link.userDropdown.notifications", icon: Notifications },
  SWITCH_ACCOUNT: { path: "/switch-account", labelKey: "link.userDropdown.switchAccount", icon: SwapHoriz },
};

// Export individual route paths for easy access
export const HOME_ROUTE = ROUTES.HOME.path;
export const SIGN_IN_ROUTE = ROUTES.SIGN_IN.path;
export const REGISTER_ROUTE = ROUTES.REGISTER.path;
export const FORGOT_PASSWORD_ROUTE = ROUTES.FORGOT_PASSWORD.path;
export const RESET_PASSWORD_ROUTE = ROUTES.RESET_PASSWORD.path;
export const TERMS_ROUTE = ROUTES.TERMS.path;
export const VERIFY_EMAIL_ROUTE = ROUTES.VERIFY_EMAIL.path;

// Export user dropdown items
export const userDropdownItems = [
  ROUTES.ORDERS,
  ROUTES.REVIEWS,
  ROUTES.PROFILE,
  ROUTES.COUPONS,
  ROUTES.CREDIT_BALANCE,
  ROUTES.PROVIDERS,
  ROUTES.HISTORY,
  ROUTES.ADDRESSES,
  ROUTES.SECURITY,
  ROUTES.PERMISSIONS,
  ROUTES.NOTIFICATIONS,
  ROUTES.SWITCH_ACCOUNT,
];



