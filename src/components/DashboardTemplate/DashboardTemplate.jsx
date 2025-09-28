"use client";
import React, { useState } from "react";
import LayoutContainer from "../LayoutContainer/LayoutContainer";
import { useResponsiveDevice } from "@/hooks/useResponsiveDevice";
import { Box } from "@mui/material";
import { SidebarLinks } from "../SidebarLinks/SidebarLinks";
import Navbar from "../Navbar/Navbar";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import {
  MenuFab,
  MenuPill,
  MenuRailHandle,
} from "../NavigationBars/NavigationBars";
import { useDrawer } from "@/hooks/useDrawer";

const DefaultAds = ({ group }) => (
  <Box
    sx={{
      p: 2,
      border: "1px dashed grey",
      borderRadius: 2,
      textAlign: "center",
    }}
  >
    {group} Ads / Promo Space
  </Box>
);

const DashboardTemplate = ({
  children,
  group = "CHEF", // default group
  AdsComponent = DefaultAds, // allow custom ads component
  breadcrumbsProps = {},
  sidebarProps = {},
  navbarProps = {},
  ...rest
}) => {
  const { showDrawer, hideDrawer, isOpen } = useDrawer();
  const { isSmallScreen } = useResponsiveDevice();

  const handleNavClick = () => {
    if (isOpen) {
      hideDrawer();
    } else {
      showDrawer(
        <Navbar
          group={group}
          {...navbarProps}
          content={<AdsComponent group={group} />}
          orientation="vertical"
        />,
        `${group} Dashboard`,
        "left"
      );
    }
  };

  return (
    <LayoutContainer isPadding={false} useContainer={!isSmallScreen} {...rest}>
      {/* Optional: Always-visible rail handle on larger screens */}
      <Box sx={{ display: { xs: "block", md: "block" } }}>
        <MenuRailHandle onOpen={handleNavClick} open={isOpen} />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ mb: 2, p: { xs: 0, md: 2 } }}>
          <Breadcrumbs {...breadcrumbsProps} />
        </Box>

        {/* Main content area with responsive layout */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2, md: 4 },
          }}
        >
          {/* Sidebar Links - displayed differently based on screen size */}
          <Box
            sx={{
              width: { xs: "100%", md: "250px" },
              flexShrink: 0,
            }}
          >
            <SidebarLinks group={group} {...sidebarProps} />

            {/* Mobile navbar */}
            <Box
              sx={{
                display: { xs: "block", md: "none" },
                mt: 2,
              }}
            >
              <Navbar
                group={group}
                orientation="horizontal"
                collapsed={true}
                {...navbarProps}
              />
            </Box>
          </Box>

          {/* Children content */}
          <Box
            sx={{
              flexGrow: 1,
              minWidth: 0, // Prevents overflow issues
              mb: 2,
              px: 2,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </LayoutContainer>
  );
};

export default DashboardTemplate;
