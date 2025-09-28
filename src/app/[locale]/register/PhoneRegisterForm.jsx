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
import { TERMS_ROUTE } from "@/config/siteLinks";
import ThemedLink from "@/components/ThemeLink/ThemeLink";
import { getErrorMessage } from "@/utils/errorUtils";
import { signIn } from "next-auth/react";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

export default function PhoneRegisterForm() {
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
      phone: z
        .string()
        .regex(/^\+\d{10,15}$/, trans("form.invalidPhoneFormat")),
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
      phone: "",
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
        phone: sanitizeInput(data.phone),
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

      let res;
      try {
        res = await response.json();
      } catch {
        res = {};
      }

      if (response.ok) {
        openSnackbar(
          res.message || trans("form.registrationSuccess"),
          "success"
        );

        // Optionally, auto-login after registration
        const loginResult = await signIn("credentials", {
          phone: sanitizedData.phone,
          password: sanitizedData.password,
          redirect: false,
        });
        if (loginResult?.error) {
          openSnackbar(getErrorMessage(loginResult.error), "error");
        } else {
          router.push("/"); // or dashboard
        }
        // router.push("/"); // or a phone verification page if you have one
      } else {
        // Use errorUtils for error message
        openSnackbar(
          getErrorMessage(res) || trans("form.registrationFailedError"),
          "error"
        );

        // Optionally, set field errors if available
        if (res.errors) {
          Object.keys(res.errors).forEach((key) => {
            setError(key, {
              type: "manual",
              message: res.errors[key][0],
            });
          });
        }
      }
    } catch (error) {
      openSnackbar(
        getErrorMessage(error) || trans("form.unexpectedError"),
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
        name="phone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label={trans("form.phoneLabel")}
            placeholder="+923001234567"
            error={!!errors.phone}
            helperText={
              errors.phone?.message || trans("form.phoneFormatHelper")
            }
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
