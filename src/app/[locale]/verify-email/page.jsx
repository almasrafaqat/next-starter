"use client";

import { useState, useEffect, useCallback } from "react";
import { Button, Typography, CircularProgress, Box, Fade, Alert } from "@mui/material";
import { useSnackbar } from "@/hooks/useSnackbar";
import Grid from "@mui/material/Grid2";
import { useSearchParams } from "next/navigation";
import { ReusableSnackbar } from "@/components/ReusableSnackbar/ReusableSnackbar";
import axiosInstance from "@/lib/axiosInstance";
import { AppURL } from "@/config/apiConfig";
import { useLocale, useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "@/i18n/routing";
import ReusableCard from "@/components/ReusableCard/ReuseableCard";
import Image from "next/image";
import { CheckCircle, Cancel } from "@mui/icons-material";
import DisplayMessage from "@/components/DisplayMessage/DisplayMessage";
import LayoutContainer from "@/components/LayoutContainer/LayoutContainer";
import { HOME_ROUTE, SIGN_IN_ROUTE } from "@/config/siteLinks";
import {
  COUNTER_REDIRECT_TIME,
  RESEND_COOLDOWN,
  VERIFY_EMAIL_PAGE_BG_IMAGE
} from "@/config/gloabalConstants";
import { formatDate } from "@/utils/dateFormatter";



export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const urlStatus = searchParams.get("status") || null;
  const trans = useTranslations("translations");
  const { openSnackbar } = useSnackbar();
  const [countdown, setCountdown] = useState(0);
  const locale = useLocale();
  const { data: session, update } = useSession();
  const router = useRouter();

  const onActionHandler = () => {
    signOut({ redirect: false });
    setTimeout(() => router.push(SIGN_IN_ROUTE), COUNTER_REDIRECT_TIME);
  }


  const handleVerificationStatus = useCallback(
    async (status) => {
      const date = new Date();
      const updateDate = formatDate(date);
      switch (status) {
        case null:
          break;
        case "verified":
          await update({
            ...session,
            user: {
              ...session?.user,
              emailVerified: updateDate,
            },
          });
          openSnackbar(trans("verifyEmail.verificationSuccess"), "success");
          signOut({ redirect: false });
          setTimeout(() => router.push(SIGN_IN_ROUTE), COUNTER_REDIRECT_TIME);
          break;
        case "already_verified":
          openSnackbar(trans("verifyEmail.alreadyVerified"), "success");
          setTimeout(() => router.push(HOME_ROUTE), COUNTER_REDIRECT_TIME);
          break;
        default:
          openSnackbar(trans("verifyEmail.verificationFailed"), "error");
      }
    },
    [openSnackbar, trans, router, update, session]
  );

  useEffect(() => {
    handleVerificationStatus(urlStatus);
  }, [urlStatus, handleVerificationStatus]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendVerification = async () => {
    if (countdown > 0) return;

    setIsLoading(true);
    try {
      const response = await axiosInstance.post(AppURL.ApiEmailVerify, null, {
        headers: {
          "X-Language": locale,
        },
      });
      openSnackbar(response.data.message, response.data.status);
      setCountdown(RESEND_COOLDOWN);
    } catch (error) {
      openSnackbar(trans("verifyEmail.errorMessage" + error), "error");
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailVerified =
    urlStatus === "verified" ||
    urlStatus === "already_verified" ||
    session?.user?.emailVerified != null;
  return (
    <LayoutContainer
      backgroundColor="white"
      component="div"
      useContainer={false}
    >
      <Grid container spacing={0} alignItems="center">
        <Grid size={{ xs: 12, md: 5 }} order={{ xs: 2, md: 1 }}>
          <ReusableCard>
            <Typography variant="h4" align="center" gutterBottom>
              {trans("verifyEmail.title")}
            </Typography>
            <DisplayMessage
              type="info"
              showTitle={false}
              description={trans("verifyEmail.alreadyVerifiedMessage")}
              onClose={() => { }}
              actionText={trans("displayMessages.signOut")}
              onAction={onActionHandler}
              buttonProps={{
                color: "white",
                variant: "outlined",
                size: "small",
              }}
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={2}
            >
              <Typography color="info" variant="h6" align="center">
                {session?.user.email}
              </Typography>
              {isEmailVerified ? (
                <Fade in={isEmailVerified}>
                  <CheckCircle color="success" sx={{ ml: 1 }} />
                </Fade>
              ) : (
                <Cancel color="error" sx={{ ml: 1 }} />
              )}
            </Box>
            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
              {trans("verifyEmail.description")}
            </Typography>
            <Typography variant="body2" align="center" sx={{ mb: 3 }}>
              {trans("verifyEmail.noEmail")}
            </Typography>
            <Button
              fullWidth
              variant="contained"
              onClick={handleResendVerification}
              disabled={isLoading || countdown > 0 || isEmailVerified}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                py: 1.5,
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "secondary.main",
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : countdown > 0 ? (
                trans("verifyEmail.waitMessage", { seconds: countdown })
              ) : isEmailVerified ? (
                trans("verifyEmail.verified")
              ) : (
                trans("verifyEmail.resendButton")
              )}
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => router.push(HOME_ROUTE)}
              sx={{ mt: 2 }}
            >
              {trans("verifyEmail.backButton")}
            </Button>
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
              src={VERIFY_EMAIL_PAGE_BG_IMAGE.path}
              alt={trans(VERIFY_EMAIL_PAGE_BG_IMAGE.alt)}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </Box>
        </Grid>
      </Grid>

      <ReusableSnackbar />
    </LayoutContainer>
  );
}
