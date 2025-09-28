"use client";

import  { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Typography,
  Box,
  TextField,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { useSearchParams, useParams } from "next/navigation";
import ReusableCard from "@/components/ReusableCard/ReuseableCard";
import { useLocale, useTranslations } from "next-intl";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useSnackbar } from "@/hooks/useSnackbar";
import { sanitizeInput } from "@/utils/formHelper";
import ThemedLink from "@/components/ThemeLink/ThemeLink";
import { RESET_PASSWORD_URL } from "@/config/apiConfig";
import { useRouter } from "@/i18n/routing";
import { SIGN_IN_ROUTE } from "@/config/siteLinks";
import LayoutContainer from "@/components/LayoutContainer/LayoutContainer";
import { RESET_PASS_PAGE_BG_IMAGE } from "@/config/gloabalConstants";

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openSnackbar } = useSnackbar();
  const trans = useTranslations("translations");
  const { isRtl } = useResponsiveLayout();
  const locale = useLocale();
  const params = useParams();

  const resetPasswordSchema = z
    .object({
      email: z.string().email(trans("form.invalidEmailError")),
      password: z.string().min(8, trans("form.passwordMinError")),
      confirmPassword: z.string(),
      token: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: trans("form.passwordMismatchError"),
      path: ["confirmPassword"],
    });


  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      token: "",
    },
  });

  useEffect(() => {
    const token = (params.token) || searchParams.get("token");
    const email = searchParams.get("email");
    if (email) setValue("email", email);
    if (token) setValue("token", token);
  }, [searchParams, setValue, params]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const sanitizedData = {
        email: sanitizeInput(data.email),
        password: sanitizeInput(data.password),
        password_confirmation: sanitizeInput(data.confirmPassword),
        token: sanitizeInput(data.token),
      };

      const response = await fetch(RESET_PASSWORD_URL(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Language": locale,
        },
        body: JSON.stringify(sanitizedData),
        credentials: "include",
      });

      const responseData = await response.json();
      const apiStatus = responseData.status;
      openSnackbar(responseData.message, apiStatus);

      if (apiStatus === "success") {
        reset();
        setTimeout(() => router.push(SIGN_IN_ROUTE), 3000);
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
      backgroundImage={RESET_PASS_PAGE_BG_IMAGE.path}
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
              {trans("resetPassword.resetPasswordTitle")}
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
              {trans("resetPassword.resetPasswordDescription")}
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
              <Box sx={{ mb: 3 }}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      label={trans("form.newPasswordLabel")}
                      placeholder={trans("form.newPasswordPlaceholder")}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      onFocus={() => setIsPasswordFocused(true)}
                      InputProps={{
                        endAdornment: isPasswordFocused && (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type={showConfirmPassword ? "text" : "password"}
                      label={trans("form.confirmPasswordLabel")}
                      placeholder={trans("form.confirmPasswordPlaceholder")}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      onFocus={() => setIsConfirmPasswordFocused(true)}
                      InputProps={{
                        endAdornment: isConfirmPasswordFocused && (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
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
                  trans("resetPassword.resetPasswordButton")
                )}
              </Button>
            </form>
            <Typography variant="body2" align="center">
              {trans("resetPassword.backToSignIn")}{" "}
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
              src={RESET_PASS_PAGE_BG_IMAGE.path}
              alt={trans(RESET_PASS_PAGE_BG_IMAGE.alt)}
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
