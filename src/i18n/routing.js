import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";


export const routing = defineRouting({
  locales: ["en", "ur", 'ur-ro'],
  defaultLocale: "en",
});


export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ur", label: "URdu (پاکستان)" },
  { code: "ur-ro", label: "Roman Urdu" },
];


export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);


export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;

const rtlLanguages = ['ur'];

export function getLanguageDirection(locale) {
  return rtlLanguages.includes(locale) ? 'rtl' : 'ltr';
}
export { detectBrowserLanguage } from './languageDetection';
export function localizedUrl(path, locale) {
  return `/${locale}${path}`;
}

export const ROUTES = {
  HOME: { path: "/", labelKey: "Link.home" },
  SIGN_IN: { path: "/signin", labelKey: "Link.signIn" },
  REGISTER: { path: "/register", labelKey: "Link.register" },
  FORGOT_PASSWORD: { path: "/forgot-password", labelKey: "Link.forgotPassword" },
  RESET_PASSWORD: { path: "/reset-password", labelKey: "Link.resetPassword" },
  TERMS: { path: "/terms", labelKey: "Link.terms" },
  VERIFY_EMAIL: { path: "/verify-email", labelKey: "Link.verifyEmail" },
  ORDERS: { path: "/orders", labelKey: "Link.UserDropdown.orders", icon: 'ShoppingBag' },
  REVIEWS: { path: "/reviews", labelKey: "Link.UserDropdown.reviews", icon: 'Star' },
  PROFILE: { path: "/profile", labelKey: "Link.UserDropdown.profile", icon: 'Person' },
  COUPONS: { path: "/coupons", labelKey: "Link.UserDropdown.coupons", icon: 'LocalOffer' },
  CREDIT_BALANCE: { path: "/credit", labelKey: "Link.UserDropdown.creditBalance", icon: 'CreditCard' },
  PROVIDERS: { path: "/providers", labelKey: "Link.UserDropdown.providers", icon: 'Store' },
  HISTORY: { path: "/history", labelKey: "Link.UserDropdown.history", icon: 'History' },
  ADDRESSES: { path: "/addresses", labelKey: "Link.UserDropdown.addresses", icon: 'LocationOn' },
  SECURITY: { path: "/security", labelKey: "Link.UserDropdown.security", icon: 'Security' },
  PERMISSIONS: { path: "/permissions", labelKey: "Link.UserDropdown.permissions", icon: 'Tune' },
  NOTIFICATIONS: { path: "/notifications", labelKey: "Link.UserDropdown.notifications", icon: 'Notifications' },
  SWITCH_ACCOUNT: { path: "/switch-account", labelKey: "Link.UserDropdown.switchAccount", icon: 'SwapHoriz' },
  BEST_SELLERS: { path: "/best-sellers", labelKey: "link.bestSellers" },
  LOCALE_WAREHOUSE: { path: "/local-warehouse", labelKey: "link.topRated" },
  
};



export const HOME_ROUTE = ROUTES.HOME.path;
export const SIGN_IN_ROUTE = ROUTES.SIGN_IN.path;
export const REGISTER_ROUTE = ROUTES.REGISTER.path;
export const FORGOT_PASSWORD_ROUTE = ROUTES.FORGOT_PASSWORD.path;
export const RESET_PASSWORD_ROUTE = ROUTES.RESET_PASSWORD.path;
export const TERMS_ROUTE = ROUTES.TERMS.path;
export const VERIFY_EMAIL_ROUTE = ROUTES.VERIFY_EMAIL.path;

