"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslations, useLocale } from "next-intl";
import { useSnackbar } from "@/hooks/useSnackbar";
import { sanitizeInput } from "@/utils/formHelper";
import { REGISTER_URL } from "@/config/apiConfig";
import { useRouter } from "@/i18n/routing";
import { VERIFY_EMAIL_ROUTE, TERMS_ROUTE } from "@/config/siteLinks";
import ThemedLink from "@/components/ThemeLink/ThemeLink";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

export default function EmailRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const trans = useTranslations("translations");
  const { openSnackbar } = useSnackbar();
  const locale = useLocale();
  const router = useRouter();

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label={trans("form.nameLabel")}
            placeholder={trans("form.namePlaceholder")}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ mb: 3 }}
          />
        )}
      />
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
            sx={{ mb: 3 }}
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
            type={showPassword ? "text" : "password"}
            label={trans("form.passwordLabel")}
            placeholder={trans("form.passwordPlaceholder")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
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
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Controller
        name="terms"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} />}
            label={
              <Typography variant="body2">
                {trans("form.termsAgreement")}
                <ThemedLink href={TERMS_ROUTE}>
                  {trans("form.termsAndConditions")}
                </ThemedLink>
              </Typography>
            }
            sx={{ mb: 3 }}
          />
        )}
      />
      {errors.terms && (
        <Typography color="error" variant="caption">
          {errors.terms.message}
        </Typography>
      )}
      <PrimaryButton
        fullWidth
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{
          mt: 2,
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
          trans("form.signUp")
        )}
      </PrimaryButton>
    </form>
  );
}
