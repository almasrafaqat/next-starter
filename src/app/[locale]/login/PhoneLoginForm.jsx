"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useSnackbar } from "@/hooks/useSnackbar";
import { getErrorMessage } from "@/utils/errorUtils";
import { sanitizeInput } from "@/utils/formHelper";
import { FORGOT_PASSWORD_ROUTE, HOME_ROUTE } from "@/config/siteLinks";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import { Link } from "@/i18n/routing";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

const PhoneLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openSnackbar } = useSnackbar();
  const trans = useTranslations("translations");
  const locale = useLocale();
  const { isRtl } = useResponsiveLayout();

  const loginSchema = z.object({
    phone: z.string().regex(/^\+\d{10,15}$/, trans("form.invalidPhoneFormat")),
    password: z.string().min(8, trans("form.passwordMinError")),
    remember: z.boolean().optional(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
      remember: false,
    },
  });

  // Remember phone logic
  useEffect(() => {
    const rememberedPhone = localStorage.getItem("rememberedPhone");
    if (rememberedPhone) {
      setValue("phone", rememberedPhone);
      setValue("remember", true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const sanitizedPhone = sanitizeInput(data.phone);
      const sanitizedPassword = sanitizeInput(data.password);
      const callbackUrl = searchParams.get("callbackUrl") || HOME_ROUTE;

      const result = await signIn("credentials", {
        phone: sanitizedPhone,
        password: sanitizedPassword,
        remember: data.remember,
        language: locale,
        redirect: false,
        callbackUrl,
      });

      if (data.remember) {
        localStorage.setItem("rememberedPhone", sanitizedPhone);
      } else {
        localStorage.removeItem("rememberedPhone");
      }

      if (result?.error) {
        openSnackbar(getErrorMessage(result.error), "error");
      } else {
        router.push(callbackUrl);
      }
    } catch (error) {
      openSnackbar(getErrorMessage(error), "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label={trans("form.phoneLabel")}
            placeholder={trans("form.phonePlaceholder")}
            error={!!errors.phone}
            helperText={
              errors.phone?.message || trans("form.phoneFormatHelper")
            }
            sx={{
              mb: 2,
              "& .MuiInputBase-input::placeholder": {
                fontSize: "12px", // Change font size
                letterSpacing: "2px", // Add letter spacing
              },
            }}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label={trans("form.passwordLabel")}
            placeholder={trans("form.passwordPlaceholder")}
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexDirection: isRtl ? "row-reverse" : "row",
        }}
      >
        <Controller
          name="remember"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label={trans("form.rememberMe")}
              sx={{ mb: 2 }}
            />
          )}
        />
        <Link href={FORGOT_PASSWORD_ROUTE} style={{ textDecoration: "none" }}>
          <Typography
            component="span"
            sx={{
              color: "primary.main",
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            {trans("form.forgotPassword")}
          </Typography>
        </Link>
      </Box>

      <PrimaryButton
        fullWidth
        type="submit"
        variant="contained"
        disabled={isLoading}
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
        ) : (
          trans("form.login")
        )}
      </PrimaryButton>
    </form>
  );
};

export default PhoneLoginForm;
