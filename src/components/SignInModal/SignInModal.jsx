"use client";

import  { useState } from "react";
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
import { useLocale, useTranslations } from "next-intl";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { sanitizeInput } from "@/utils/formHelper";
import ReusableCard from "@/components/ReusableCard/ReuseableCard";
import { useAlert } from "@/hooks/useAlert";
import { AlertMessage } from "../AlertMessage/AlertMessage";
import GoogleButton from "@/components/GoogleButton/GoogleButton";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";



const SignInModal = ({
  open,
  onClose,
  onSwitchToRegister,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { openAlert, closeAlert, clearAlert } = useAlert();
  const locale = useLocale();
  const trans = useTranslations("translations");
  const { isRtl } = useResponsiveLayout();

  // useEffect(() => {
  //   if (open) {
  //     clearAlert();
  //   }
  // }, [open, clearAlert]);

  const handleClose = () => {
    clearAlert();
    onClose();
  };

  const signInSchema = z.object({
    email: z.string().email(trans("form.invalidEmailError")),
    password: z.string().min(8, trans("form.passwordMinError")),
    remember: z.boolean().optional(),
  });


  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    closeAlert();
    try {
      const sanitizedEmail = sanitizeInput(data.email);
      const sanitizedPassword = sanitizeInput(data.password);

      const result = await signIn("credentials", {
        email: sanitizedEmail,
        password: sanitizedPassword,
        remember: data.remember,
        language: locale,
        redirect: false,
      });

      if (result?.error) {
        openAlert(result.error, "error");
      } else {
        openAlert(trans("displayMessages.success"), "success");
        reset();
        onClose();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      openAlert(errorMessage, "error");
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
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {trans("form.login")}
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
            {trans("form.enterDetails")}
          </Typography>
          <AlertMessage />
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
                    control={<Checkbox {...field} />}
                    label={trans("form.rememberMe")}
                  />
                )}
              />
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
          <GoogleButton handleSignIn={handleSignIn} />
          <Typography align="center" sx={{ mt: 3 }}>
            {trans("form.noAccount")}
            <Button onClick={onSwitchToRegister}>{trans("form.signUp")}</Button>
          </Typography>
          
        </ReusableCard>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
