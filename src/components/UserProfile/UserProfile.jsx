"use client";

import React, { useState } from "react";
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
import { Edit, Check, Security, Menu } from "@mui/icons-material";
import { useLocale, useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useSession } from "next-auth/react";
import { AppURL } from "@/config/apiConfig";
import axiosInstance from "@/lib/axiosInstance";
import { sanitizeInput } from "@/utils/formHelper";
import LayoutContainer from "../LayoutContainer/LayoutContainer";
import { useDrawer } from "@/hooks/useDrawer";
import Navbar from "../Navbar/Navbar";
import { ROUTES } from "@/config/siteLinks";
import { SidebarLinks } from "../SidebarLinks/SidebarLinks";

const editProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

const dropdownItems = [
  ROUTES.CUSTOMER.DASHBOARD,
  ROUTES.CUSTOMER.ORDERS,
  ROUTES.CUSTOMER.PROFILE,
  // Add more as needed
];

export const UserProfile = () => {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdatingSession, setIsUpdatingSession] = useState(false);
  const { openSnackbar } = useSnackbar();
  const trans = useTranslations("translations");
  const { isRtl, isMobile } = useResponsiveLayout();
  const locale = useLocale();

  const { showDrawer } = useDrawer();

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

  const handleDrawerToggle = () => {
    showDrawer(<Navbar />, "left");
    // setMobileOpen(!mobileOpen);
  };

  if (isUpdatingSession) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LayoutContainer>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <Menu />
            </IconButton>
          )}
          <Breadcrumbs />
        </Box>

        {/* Main Content */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <SidebarLinks group="CUSTOMER" />

          {/* Profile Content */}
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
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
                              />
                            )}
                          />
                          <IconButton
                            type="submit"
                            color="primary"
                            size="small"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <CircularProgress size={24} />
                            ) : (
                              <Check />
                            )}
                          </IconButton>
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

              {/* Empty Reviews Section */}
              <Box
                sx={{
                  mt: 4,
                  textAlign: "center",
                  p: 4,
                  bgcolor: "grey.50",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {trans("userProfile.reviewEmpty")}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {trans("userProfile.reviewEmptyDescription")}
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  href="/reviews"
                  sx={{ mt: 2 }}
                >
                  {trans("userProfile.goToReviews")}
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </LayoutContainer>
  );
};
