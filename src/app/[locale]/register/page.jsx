"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

import ReusableCard from "@/components/ReusableCard/ReuseableCard";
import { useTranslations } from "next-intl";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { REGISTER_URL } from "@/config/apiConfig";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useLocale } from "next-intl";
import { sanitizeInput } from "@/utils/formHelper";
import ThemedLink from "@/components/ThemeLink/ThemeLink";
import { useRouter } from "@/i18n/routing";
import LayoutContainer from "@/components/LayoutContainer/LayoutContainer";
import { REGISTER_PAGE_BG_IMAGE } from "@/config/gloabalConstants";
import {
  SIGN_IN_ROUTE,
  VERIFY_EMAIL_ROUTE,
  TERMS_ROUTE,
} from "@/config/siteLinks";
import EmailRegisterForm from "./EmailRegisterForm";
import PhoneRegisterForm from "./PhoneRegisterForm";
import GoogleButton from "@/components/GoogleButton/GoogleButton";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerMethod, setRegisterMethod] = useState("email");
  const router = useRouter();
  const trans = useTranslations("translations");
  const { isRtl } = useResponsiveLayout();
  const { openSnackbar } = useSnackbar();
  const locale = useLocale();

  const { status } = useSession();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     openSnackbar(trans("displayMessages.alreadyLoggedIn"), "info");
  //     setTimeout(() => {
  //       router.push(HOME_ROUTE);
  //     }, COUNTER_REDIRECT_TIME);
  //   }
  // }, [status, router, openSnackbar, trans]);

  const registerSchema = z
    .object({
      name: z.string().min(2, trans("form.nameMinError")),
      email: z.string().email(trans("form.invalidEmailError")),
      password: z.string().min(8, trans("form.passwordMinError")),
      confirmPassword: z.string(),
      terms: z
        .boolean()
        .refine((val) => val === true, trans("form.termsNotAcceptedError")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: trans("form.passwordMismatchError"),
      path: ["confirmPassword"],
    });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email),
        password: sanitizeInput(data.password),
        confirmPassword: sanitizeInput(data.confirmPassword),
        terms: data.terms,
      };

      const response = await fetch(REGISTER_URL(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Language": locale,
        },
        body: JSON.stringify(sanitizedData),
        credentials: "include",
      });
      const res = await response.json();

      if (response.ok) {
        openSnackbar(
          res.message || trans("form.registrationSuccess"),
          "success"
        );

        const result = await signIn("credentials", {
          email: sanitizedData.email,
          password: sanitizedData.password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        router.push(VERIFY_EMAIL_ROUTE);
      } else {
        if (res.errors) {
          Object.keys(res.errors).forEach((key) => {
            setError(key, {
              type: "manual",
              message: res.errors[key][0],
            });
          });
          openSnackbar(trans("form.formErrors"), "error");
        } else {
          throw new Error(res.message || trans("form.registrationFailedError"));
        }
      }
    } catch (error) {
      openSnackbar(
        error instanceof Error ? error.message : trans("form.unexpectedError"),
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Sign in failed:", error);

      alert("Sign-in failed, please try again.");
    }
  };

  return (
    <LayoutContainer
      backgroundColor="white"
      component="div"
      useContainer={false}
      backgroundImage={REGISTER_PAGE_BG_IMAGE.path}
      backgroundSize="contain"
      backgroundPosition="left"
    >
      <Grid
        container
        spacing={0}
        alignItems="center"
        direction={isRtl ? "row-reverse" : "row"}
      >
        <Grid size={{ xs: 12, md: 5 }} order={{ xs: 2, md: 1 }}>
          <ReusableCard>
            <Typography variant="h4" align="center" gutterBottom>
              {trans("form.createAccount")}
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
              {trans("form.fillDetails")}
            </Typography>
            <Tabs
              value={registerMethod}
              onChange={(_, value) => setRegisterMethod(value)}
              centered
              sx={{ mb: 2 }}
            >
              <Tab label={trans("form.emailTab")} value="email" />
              <Tab label={trans("form.phoneTab")} value="phone" />
            </Tabs>
            {registerMethod === "email" ? (
              <EmailRegisterForm />
            ) : (
              <PhoneRegisterForm />
            )}
            <GoogleButton handleSignIn={handleSignIn} />
            <Typography align="center" sx={{ mt: 3 }}>
              {trans("form.alreadyHaveAccount")}
              <ThemedLink href={SIGN_IN_ROUTE}>
                {trans("form.login")}
              </ThemedLink>
            </Typography>
          </ReusableCard>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }} order={{ xs: 1, md: 2 }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: "100px", md: "600px" },
              overflow: "hidden",
            }}
          >
            <Image
              src={REGISTER_PAGE_BG_IMAGE.path}
              alt={trans(REGISTER_PAGE_BG_IMAGE.alt)}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </Box>
        </Grid>
      </Grid>
    </LayoutContainer>
  );
}
