
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://tijaratplus-admin.test/api";

export const STORAGE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL || "http://tijaratplus-admin.test";

/**using for getting cookie */
export const SANCTUM_URL = `${API_BASE_URL.replace(
  /\/api$/,
  ""
)}/sanctum/csrf-cookie`;


export const SIGN_IN_URL = () => `${API_BASE_URL}/login`;
export const REGISTER_URL = () => `${API_BASE_URL}/register`;
export const FORGOT_PASSWORD_URL = () => `${API_BASE_URL}/password/forgot`;
export const RESET_PASSWORD_URL = () => `${API_BASE_URL}/password/reset`;
export const SOCIAL_LOGIN = () => `${API_BASE_URL}/social-login`;

export const AppURL = {
  ApiGetCategories: `${API_BASE_URL}/categories`,
  ApiUser: `${API_BASE_URL}/user`,
  ApiUpdateUsername: `${API_BASE_URL}/user/name`,
  ApiEmailVerify: `${API_BASE_URL}/email/verification-notification`,
  ApiUserBanners: `${API_BASE_URL}/user-banners`,
};


export const createHeaders = (language, token) => ({
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Language": language,
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});
export const getImageUrl = (path) => {
  if (!path) return "";
  // return `${STORAGE_URL}${path}`;
  if (path.startsWith("http")) return path;
  return `${STORAGE_URL}/${path.replace(/^\//, "")}`;
};
