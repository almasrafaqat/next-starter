"use client";
import { Box } from "@mui/material";
import NavigationRail from "@/components/NavigationRail/NavigationRail";
import Profile from "./Profile/Profile";
import { CgProfile } from "react-icons/cg";
import React from "react";
import { useResponsiveDevice } from "@/hooks/useResponsiveDevice";
import { useMe } from "@/hooks/useMe";
import HeadingTitle from "@/components/HeadingTitle/HeadingTitle";
import { LoadingCard } from "@/components/ui/LoadingComponents";
import PageHead from "@/components/ui/PageHead/PageHead";

const LoadingLayout = () => {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <LoadingCard />
    </Box>
  );
};

const ProfileSection = () => {
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
    <PageHead title="Manage Profile" index={false}>
      <HeadingTitle title="Manage your profile and account settings" />
      {isLoading && <LoadingLayout />}
      {error && <div>Error: {error.message}</div>}
      {user && <Profile />}
      <NavigationRail items={RailMenuItems} isScrollable={!isSmallScreen} />
    </PageHead>
  );
};

export default ProfileSection;
