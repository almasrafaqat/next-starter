"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { sanitizeInput } from "@/utils/formHelper";
import ReusableCard from "@/components/ReusableCard/ReuseableCard";
import ThemedLink from "@/components/ThemeLink/ThemeLink";
import { useLocale } from "next-intl";
import { REGISTER_URL } from "@/config/apiConfig";
import { useAlert } from "@/hooks/useAlert";
import { AlertMessage } from "../AlertMessage/AlertMessage";
import { TERMS_ROUTE, VERIFY_EMAIL_ROUTE } from "@/config/siteLinks";



const RegisterModal = ({
  open,
  onClose,
  onSwitchToSignIn,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { openAlert, closeAlert, } = useAlert();
  const router = useRouter();
  const trans = useTranslations("translations");
  const { isRtl } = useResponsiveLayout();
  const locale = useLocale();

  // useEffect(() => {
  //   if (open) {
  //     clearAlert();
  //   }
  // }, [open, clearAlert]);

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
    closeAlert();
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
        openAlert(res.message || trans("form.registrationSuccess"), "success");

        const result = await signIn("credentials", {
          email: sanitizedData.email,
          password: sanitizedData.password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        setTimeout(() => {
          onClose();
          router.push(VERIFY_EMAIL_ROUTE);
        }, 1500);
      } else {
        if (res.errors) {
          Object.keys(res.errors).forEach((key) => {
            setError(key, {
              type: "manual",
              message: res.errors[key][0],
            });
          });

          openAlert(trans("form.formErrors"), "error");
        } else {
          throw new Error(res.message || trans("form.registrationFailedError"));
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      openAlert(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {trans("form.createAccount")}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            left: isRtl ? 8 : "",
            right: isRtl ? "" : 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ReusableCard>
          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            {trans("form.fillDetails")}
          </Typography>
          <AlertMessage />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 3 }}>
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
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                )}
              />
            </Box>
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
                    label={trans("form.passwordLabel")}
                    placeholder={trans("form.passwordPlaceholder")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
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
                    InputProps={{
                      endAdornment: (
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
            <Box sx={{ mb: 3 }}>
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label={
                      <Typography variant="body2">
                        {trans("form.termsAgreement")}{" "}
                        <ThemedLink href={TERMS_ROUTE}>
                          {trans("form.termsAndConditions")}
                        </ThemedLink>
                      </Typography>
                    }
                  />
                )}
              />
              {errors.terms && (
                <Typography color="error" variant="caption">
                  {errors.terms.message}
                </Typography>
              )}
            </Box>
            <Button
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
                trans("form.signUp")
              )}
            </Button>
          </form>
          <Typography align="center" sx={{ mt: 3 }}>
            {trans("form.alreadyHaveAccount")}
            <Button onClick={onSwitchToSignIn}>{trans("form.login")}</Button>
          </Typography>
        </ReusableCard>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
