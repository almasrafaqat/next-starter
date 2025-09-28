import { SIGN_IN_URL, SANCTUM_URL, SOCIAL_LOGIN } from "@/config/apiConfig";
import { formatDate } from "@/utils/dateFormatter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        phone: { label: "Phone", type: "text" }, // added for future
        otp: { label: "OTP", type: "text" }, // added for future
        language: { label: "Language", type: "text" },
      },
      async authorize(credentials) {
        const res = await fetch(SANCTUM_URL, {
          method: "GET",
        });

        const language = credentials?.language || "en";
        const setCookieHeader = res.headers.get("set-cookie");

        const cookies = setCookieHeader?.split(", ");
        let sessionKey = null;
        let xsrfToken = null;

        for (const cookie of cookies) {
          if (cookie.startsWith("laravel_session=")) {
            sessionKey = cookie.split("=")[1];
          } else if (cookie.startsWith("XSRF-TOKEN=")) {
            xsrfToken = cookie.split("=")[1];
          }
          if (sessionKey && xsrfToken) {
            break;
          }
        }

        const data = {
          email: credentials?.email,
          password: credentials?.password,
          phone: credentials?.phone, // added for future
          otp: credentials?.otp, // added for future
        };

        const headers = new Headers({
          Cookie: `laravel_session=${sessionKey}`,
          "Content-Type": "application/json",
          "X-Language": language,
        });

        if (xsrfToken) {
          headers.append("X-XSRF-TOKEN", xsrfToken);
        }

        const options = {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        };

        try {
          const response = await fetch(SIGN_IN_URL(), options);
          const contentType = response.headers.get("content-type");

          if (contentType && contentType.includes("application/json")) {
            const responseData = await response.json();

            if (response.ok && responseData.status === "success") {
              // Extract user and token from the 'data' key
              return {
                ...responseData.data,
                // Optionally, add status/message if you want
                status: responseData.status,
                message: responseData.message,
              };
            } else {
              // Handle validation or general errors
              if (responseData.errors) {
                // Validation errors
                const errorMessages = Object.values(responseData.errors).flat();
                throw new Error(errorMessages.join(". "));
              } else if (responseData.message) {
                throw new Error(responseData.message);
              } else {
                throw new Error("Authentication failed");
              }
            }
          } else {
            const text = await response.text();
            console.error("Unexpected response:", text);
            throw new Error(
              "Unexpected response from server. Please try again later."
            );
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          throw error;
        }

        return null;
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account, profile, session, trigger }) {
      if (trigger === "update" && session?.user) {
        token.user = { ...token.user, ...session.user };
      }
      if (user) {
        // Credentials login (your backend)
        if (user.user && user.access_token) {
          token.accessToken = user.access_token;
          token.user = {
            id: user.user.id,
            name: user.user.name,
            email: user.user.email,
            emailVerified: user.user.email_verified_at
              ? formatDate(user.user.email_verified_at)
              : null,
            createdAt: formatDate(user.user.created_at),
            preferredLanguage: user.user.language,
            roles: user.user.user_roles,
          };
        }
        // Google login (user is Google profile)
        else if (account?.provider === "google") {
          token.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.email_verified || null,
            // Add more fields as needed
          };
          // Optionally, set accessToken if available
          token.accessToken = account.access_token || null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        ...session.user,
        ...token.user,
      };
      return session;
    },
  },

  events: {
    error(message) {
      console.error(message);
    },
  },
  csrf: true,
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // updateAge: 24 * 60 * 60, // 24 hours
    secret: process.env.NEXTAUTH_SECRET,
  },
};
