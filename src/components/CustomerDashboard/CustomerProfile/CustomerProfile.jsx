"use client";
import { Box, Typography } from "@mui/material";
import CustomTypography from "@/components/Typography/CustomTypography";
import NavigationRail from "@/components/NavigationRail/NavigationRail";
import Profile from "./Profile/Profile";
import { CgProfile } from "react-icons/cg";
import React from "react";
import { useResponsiveDevice } from "@/hooks/useResponsiveDevice";
import { useMe } from "@/hooks/useMe";

const CustomerProfile = () => {
  const { isSmallScreen } = useResponsiveDevice();
  const { data: user, isLoading, error } = useMe();
  
  const RailMenuItems = [
    {
      key: "Profile",
      label: "Profile",
      select: true,
      icon: <CgProfile />,
      component: Profile,
    },
  ];

  return (
    <Box>
      <CustomTypography variant="h5" gutterBottom>
        Your Profile
      </CustomTypography>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {user && <Profile />}
      <NavigationRail items={RailMenuItems} isScrollable={!isSmallScreen} />
    </Box>
  );
};

export default CustomerProfile;
