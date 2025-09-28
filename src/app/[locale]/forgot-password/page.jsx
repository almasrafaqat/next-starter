"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Typography,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import ReusableCard from "@/components/ReusableCard/ReuseableCard";
import { useLocale, useTranslations } from "next-intl";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useSnackbar } from "@/hooks/useSnackbar";
import { sanitizeInput } from "@/utils/formHelper";
import ThemedLink from "@/components/ThemeLink/ThemeLink";
import { FORGOT_PASSWORD_URL } from "@/config/apiConfig";
import { SIGN_IN_ROUTE } from "@/config/siteLinks";
import LayoutContainer from "@/components/LayoutContainer/LayoutContainer";
import { SIGN_PAGE_BG_IMAGE } from "@/config/gloabalConstants";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { openSnackbar } = useSnackbar();
  const trans = useTranslations("translations");
  const { isRtl } = useResponsiveLayout();
  const locale = useLocale();

  const forgotPasswordSchema = z.object({
    email: z.string().email(trans("form.invalidEmailError")),
  });


  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const sanitizedEmail = sanitizeInput(data.email);

      const response = await fetch(FORGOT_PASSWORD_URL(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Language": locale,
        },
        body: JSON.stringify({ email: sanitizedEmail }),
        credentials: "include",
      });

      const responseData = await response.json();
      const apiStatus = responseData.status;
      openSnackbar(responseData.message, apiStatus);
      if (apiStatus === "success") {
        reset();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      openSnackbar(errorMessage, "error");
    } finally {
      setIsLoading(false);
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
              {trans("forgotPassword.forgotPasswordTitle")}
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
              {trans("forgotPassword.forgotPasswordDescription")}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 3 }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={trans("form.emailLabel")}
                      placeholder={trans("form.emailPlaceholder")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  )}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
                sx={{ mb: 2 }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  trans("forgotPassword.resetPasswordButton")
                )}
              </Button>
            </form>
            <Typography variant="body2" align="center">
              {trans("forgotPassword.rememberPassword")}{" "}
              <ThemedLink href={SIGN_IN_ROUTE}>{trans("form.login")}</ThemedLink>
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
              style={{ objectFit: 'cover' }}
              priority
            />
          </Box>
        </Grid>
      </Grid>
    </LayoutContainer>
  );
}
