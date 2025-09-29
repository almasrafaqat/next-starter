import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Paper,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Edit, Check, Security, Menu, Close } from "@mui/icons-material";
import { useLocale, useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { Link } from "@/i18n/routing";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useSession } from "next-auth/react";
import { AppURL } from "@/config/apiConfig";
import axiosInstance from "@/lib/axiosInstance";
import { sanitizeInput } from "@/utils/formHelper";
import { useDrawer } from "@/hooks/useDrawer";
import { ROUTES } from "@/config/siteLinks";
import { useDialog } from "@/hooks/useDialog";

const Profile = () => {
  const editProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
  });

  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdatingSession, setIsUpdatingSession] = useState(false);
  const { openSnackbar } = useSnackbar();
  const trans = useTranslations("translations");
  const { isRtl, isMobile } = useResponsiveLayout();
  const locale = useLocale();
  const {
    alert,
    confirm,
    prompt,
    loading: showLoading,
    componentLayout,
  } = useDialog();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: session?.user?.name || "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setIsUpdatingSession(true);
    try {
      const sanitizedName = sanitizeInput(data.name);
      const response = await axiosInstance.post(
        AppURL.ApiUpdateUsername,
        { name: sanitizedName },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Language": locale,
          },
        }
      );

      if (response) {
        await update({
          ...session,
          user: {
            ...session?.user,
            name: sanitizedName,
          },
        });
        openSnackbar(trans("userProfile.updateSuccess"), "success");
        reset(data);
        setIsEditing(false);
      } else {
        throw new Error(trans("userProfile.updateError"));
      }
    } catch (error) {
      openSnackbar(
        error instanceof Error ? error.message : String(error),
        "error"
      );
    } finally {
      setIsLoading(false);
      setIsUpdatingSession(false);
    }
  };

  useEffect(() => {
    if (!isEditing) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsEditing(false);
        reset({ name: session?.user?.name || "" });
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isEditing, reset, session]);

  //if removing this below the user in edit more getting empty state

  //  useEffect(() => {
  //   if (isUpdatingSession) {
  //     showLoading({ title: "Loading...", message: "Please wait..." });
  //   } else {
  //     // Optionally hide loading dialog here
  //     // e.g., hideLoading();
  //   }
  // }, [isUpdatingSession, showLoading]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 3,
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              {/* Avatar */}
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "primary.main",
                  fontSize: "2rem",
                }}
              >
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </Avatar>

              {/* User Info */}
              <Box sx={{ flex: 1, width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  {isEditing ? (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      style={{ width: "100%" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          alignItems: { xs: "stretch", sm: "center" },
                          gap: 1,
                          width: "100%",
                        }}
                      >
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label={trans("userProfile.nameLabel")}
                              error={!!errors.name}
                              helperText={errors.name?.message}
                              autoFocus
                              size={isMobile ? "medium" : "small"}
                            />
                          )}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                            mt: { xs: 1, sm: 0 },
                            justifyContent: {
                              xs: "flex-end",
                              sm: "flex-start",
                            },
                          }}
                        >
                          <IconButton
                            type="submit"
                            color="primary"
                            size={isMobile ? "medium" : "small"}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <CircularProgress size={24} />
                            ) : (
                              <Check />
                            )}
                          </IconButton>
                          <IconButton
                            type="button"
                            color="error"
                            size={isMobile ? "medium" : "small"}
                            onClick={() => {
                              setIsEditing(false);
                              reset({ name: session?.user?.name || "" });
                            }}
                            aria-label={trans("userProfile.cancelEdit")}
                          >
                            <Close />
                          </IconButton>
                        </Box>
                      </Box>
                    </form>
                  ) : (
                    <>
                      <Typography variant="h5">
                        {session?.user?.name}
                      </Typography>
                      <IconButton
                        onClick={() => setIsEditing(true)}
                        size="small"
                        aria-label={trans("userProfile.editName")}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </Box>

                <Typography color="text.secondary" gutterBottom>
                  {session?.user?.email}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {trans("userProfile.joinedDate", {
                    date: session?.user?.createdAt,
                  })}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 4,
                    mt: 2,
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {trans("userProfile.totalReviews")}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6"></Typography>
                    <Typography variant="body2" color="text.secondary">
                      {trans("userProfile.helpfulReviews")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Security Message */}
            <Typography
              variant="body2"
              color="success.main"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Security fontSize="small" />
              {trans("userProfile.securityMessage")}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
