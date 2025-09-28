import { createHeaders, API_BASE_URL } from "@/config/apiConfig";
import axios, { AxiosHeaders } from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.accessToken;
    const language = (config.headers?.["X-Language"]) || "en"; // Default to 'en' if not set

    const newHeaders = createHeaders(language, token);

    // Create a new AxiosHeaders instance
    const headers = new AxiosHeaders(config.headers);

    // Add new headers
    if (newHeaders && typeof newHeaders === "object") {
      Object.entries(newHeaders).forEach(([key, value]) => {
        if (value !== undefined) {
          headers.set(key, value);
        }
      });
    }

    // Assign the new headers back to the config
    config.headers = headers;

    if (
      config.url &&
      !config.url.startsWith("http") &&
      config.url.startsWith("/")
    ) {
      config.url = config.url.slice(1);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
