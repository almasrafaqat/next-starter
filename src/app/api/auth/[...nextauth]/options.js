import { SIGN_IN_URL, SANCTUM_URL, SOCIAL_LOGIN } from "@/config/apiConfig";
import { formatDate } from "@/utils/dateFormatter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
  pages: {
    signIn: "/en/login",
    // signOut: '/auth/signout',
  },
  callbacks: {
    async jwt({ token, user, account, profile, session, trigger }) {
      console.log("JWT callback:", {
        token,
        user,
        account,
        profile,
        session,
        trigger,
      });

      // Only on initial sign-in
      if (user && account) {
        if (account.provider === "google") {
          const res = await fetch(SOCIAL_LOGIN(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              provider: "google",
              provider_id: user.id || user.sub,
              email: user.email,
              name: user.name,
              avatar: user.picture || user.image,
              access_token: account.access_token,
            }),
          });
          const data = await res.json();
          const userData = data.data?.user;
          const accessToken = data.data?.access_token;

          if (!res.ok || !userData || !accessToken) {
            // Handle error: log, throw, or set a fallback
            console.error("Social login failed:", data);
            throw new Error(data.message || "Social login failed");
          }

          token.user = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            roles: userData.user_roles,
            // ...other fields
          };
          token.accessToken = accessToken;
        } else if (user.user && user.access_token) {
          // Credentials login (your backend)
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
      }

      // On session restore, just return the token as is
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

  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // updateAge: 24 * 60 * 60, // 24 hours
    secret: process.env.NEXTAUTH_SECRET,
  },
};
