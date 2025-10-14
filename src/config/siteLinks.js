import { icons } from "./routeIcons"; // Centralize icons separately

// Base route configuration
const BASE_ROUTES = {
  HOME: { path: "/", labelKey: "link.home", icon: icons.HOME },
  AUTH: {
    SIGN_IN: { path: "/login", labelKey: "link.login" },
    REGISTER: { path: "/register", labelKey: "link.register" },
    FORGOT_PASSWORD: {
      path: "/forgot-password",
      labelKey: "link.forgotPassword",
    },
    RESET_PASSWORD: { path: "/reset-password", labelKey: "link.resetPassword" },
    VERIFY_EMAIL: { path: "/verify-email", labelKey: "link.verifyEmail" },
  },
  LEGAL: {
    TERMS: { path: "/terms", labelKey: "link.terms" },
    PRIVACY: { path: "/privacy", labelKey: "link.privacy" },
  },
};

// Customer routes
// const CUSTOMER_ROUTES = {
//   DASHBOARD: {
//     path: "/customer",
//     labelKey: "link.dashboard",
//     icon: icons.DASHBOARD,
//   },
//   PROFILE: {
//     path: "/customer/profile",
//     labelKey: "link.profile",
//     icon: icons.PROFILE,
//   },
//   // ORDER_DETAIL: { path: "/customer/orders", labelKey: "link.orderDetail", icon: icons.PROFILE },
//   // ... other customer routes
// };

const CUSTOMER_ROUTES = {
  DASHBOARD: {
    path: "/customer",
    labelKey: "link.dashboard",
    icon: icons.DASHBOARD,
  },
  PROFILE: {
    path: "/customer/profile",
    labelKey: "link.profile",
    icon: icons.PROFILE,
    // children: [
    //   {
    //     path: "/customer/profile",
    //     labelKey: "link.Profile",
    //     icon: icons.SETTINGS,
    //   },
    //   {
    //     path: "/customer/profile/settings",
    //     labelKey: "link.profile.settings",
    //     icon: icons.SETTINGS,
    //   },
    //   {
    //     path: "/customer/profile/security",
    //     labelKey: "link.profile.security",
    //     icon: icons.SECURITY,
    //   },
    //   {
    //     path: "/customer/profile/addresses",
    //     labelKey: "link.profile.addresses",
    //     icon: icons.ADDRESS,
    //   },
    // ],
  },
  plans: {
    path: "/customer/plans",
    labelKey: "link.plan",
    icon: icons.PLAN,
  },
  invoice: {
    path: "/customer/invoices",
    labelKey: "link.invoices",
    icon: icons.INVOICE,
  },
  settings: {
    path: "/customer/settings",
    labelKey: "link.settings",
    icon: icons.SETTINGS,
  },
  // ...other routes
};

// Admin routes
const ADMIN_ROUTES = {
  DASHBOARD: {
    path: "/admin",
    labelKey: "link.admin.dashboard",
    icon: icons.DASHBOARD,
  },
  USERS: {
    path: "/admin/users",
    labelKey: "link.admin.users",
    icon: icons.USERS,
  },
  // ... other admin routes
};

const CHEF_ROUTES = {
  DASHBOARD: {
    path: "/chef",
    labelKey: "link.chefLinks.dashboard",
    icon: icons.DASHBOARD,
  },
  ORDERS: {
    path: "/chef/orders",
    labelKey: "link.chefLinks.orders",
    icon: icons.SHOPPING_BAG,
  },
  PROFILE: {
    path: "/chef/profile",
    labelKey: "link.chefLinks.profile",
    icon: icons.PROFILE,
  },
  Media: {
    path: "/chef/media",
    labelKey: "link.chefLinks.mediaLibrary",
    icon: icons.MEDIA,
  },
  Dish: {
    path: "/chef/dishes",
    labelKey: "link.chefLinks.dishesManagement",
    icon: icons.DISH,
  },
  Kitchen: {
    path: "/chef/kitchen",
    labelKey: "link.chefLinks.kitchenManagement",
    icon: icons.KITCHEN,
  },
  // ... other chef routes
};

// Combine all routes
export const ROUTES = {
  ...BASE_ROUTES,
  CUSTOMER: CUSTOMER_ROUTES,
  ADMIN: ADMIN_ROUTES,
  CHEF: CHEF_ROUTES,
};

// Helper functions for route generation

export const generateCustomerRoutes = (customerId, orderId) => ({
  PROFILE: `${CUSTOMER_ROUTES.PROFILE.path}/${customerId}`,
  ORDERS: `${CUSTOMER_ROUTES.ORDERS.path}?customerId=${customerId}`,
  // ORDER_DETAIL: `${CUSTOMER_ROUTES.ORDER_DETAIL.path}/${orderId}`,
});

// Route groups for navigation
export const NAVIGATION_GROUPS = {
  MAIN: [ROUTES.HOME, ROUTES.CUSTOMER.DASHBOARD],
  CUSTOMER: Object.values(CUSTOMER_ROUTES),
  ADMIN: Object.values(ADMIN_ROUTES),
  AUTH: Object.values(BASE_ROUTES.AUTH),
  CHEF: Object.values(CHEF_ROUTES),
};

export const HOME_ROUTE = ROUTES.HOME.path;
export const SIGN_IN_ROUTE = ROUTES.AUTH.SIGN_IN.path;
export const REGISTER_ROUTE = ROUTES.AUTH.REGISTER.path;
export const FORGOT_PASSWORD_ROUTE = ROUTES.AUTH.FORGOT_PASSWORD.path;
export const RESET_PASSWORD_ROUTE = ROUTES.AUTH.RESET_PASSWORD.path;
export const TERMS_ROUTE = ROUTES.LEGAL.TERMS.path;
export const VERIFY_EMAIL_ROUTE = ROUTES.AUTH.VERIFY_EMAIL.path;

// Individual route exports
export const { HOME, AUTH, LEGAL, CUSTOMER, ADMIN, CHEF } = ROUTES;
