"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Typography,
  Box,

  Tab,
  Tabs,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { signIn } from "next-auth/react";
import ReusableCard from "@/components/ReusableCard/ReuseableCard";
import {  useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useSnackbar } from "@/hooks/useSnackbar";
import { sanitizeInput } from "@/utils/formHelper";
import ThemedLink from "@/components/ThemeLink/ThemeLink";
import { useSearchParams } from "next/navigation";
import {
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
  REGISTER_ROUTE,
} from "@/config/siteLinks";
import LayoutContainer from "@/components/LayoutContainer/LayoutContainer";
import { SIGN_PAGE_BG_IMAGE } from "@/config/gloabalConstants";
import { getErrorMessage } from "@/utils/errorUtils";
import EmailLoginForm from "./EmailLoginForm";
import PhoneLoginForm from "./PhoneLoginForm";
import GoogleButton from "@/components/GoogleButton/GoogleButton";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openSnackbar } = useSnackbar();
  const trans = useTranslations("translations");
  const { isRtl } = useResponsiveLayout();
  const locale = useLocale();
  // const { data: session, status } = useSession();




  // useEffect(() => {
  //   if (status === "authenticated") {
  //     openSnackbar(t("DisplayMessages.alreadyLoggedIn"), "info");
  //     setTimeout(() => {
  //       router.push(HOME_ROUTE);
  //     }, COUNTER_REDIRECT_TIME);
  //   }
  // }, [status, router, openSnackbar, t]);

 

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
      backgroundImage={SIGN_PAGE_BG_IMAGE.path}
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
              {trans("form.welcomeBack")}
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
              {trans("form.enterDetails")}
            </Typography>
            <Tabs
              value={loginMethod}
              onChange={(_, value) => setLoginMethod(value)}
              centered
              sx={{ mb: 2 }}
            >
              <Tab label={trans("form.emailTab")} value="email" />
              <Tab label={trans("form.phoneTab")} value="phone" />
            </Tabs>

            {loginMethod === "email" ? <EmailLoginForm /> : <PhoneLoginForm />}

            <GoogleButton handleSignIn={handleSignIn} />

            <Typography align="center" sx={{ mt: 3 }}>
              {trans("form.noAccount")}
              <ThemedLink href={REGISTER_ROUTE}>
                {trans("form.signUp")}
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
              src={SIGN_PAGE_BG_IMAGE.path}
              alt={trans(SIGN_PAGE_BG_IMAGE.alt)}
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
