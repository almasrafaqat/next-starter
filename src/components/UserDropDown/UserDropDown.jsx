"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  List,
  Popper,
  Fade,
  Divider,
  Button,
} from "@mui/material";
import { Logout, AccountCircle, Login, PersonAdd } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSession, signOut } from "next-auth/react";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { NAVIGATION_GROUPS, ROUTES } from "@/config/siteLinks";
import {
  DropdownContainer,
  MenuContainer,
  UserIconWrapper,
} from "./UserDropdown.styles";
import { NavigationLinkItem } from "@/components/NavigationLinkItem/NavigationLinkItem";
import RecentViews from "@/components/RecentViews/RecentViews";
import SignInModal from "@/components/SignInModal/SignInModal";
import RegisterModal from "@/components/RegisterModal/RegisterModal";

const UserDropdown = ({group}) => {
  const [open, setOpen] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const anchorRef = useRef(null);
  const trans = useTranslations("translations");
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { isRtl } = useResponsiveLayout();

  // Define dropdown items using new ROUTES structure
  const dropdownItems = [
    ROUTES.CUSTOMER.DASHBOARD,
    ROUTES.CUSTOMER.ORDERS,
    ROUTES.CUSTOMER.PROFILE,
    // Add more as needed
  ];

  const handleNavigate = (path) => {
    router.push(path);
    setOpen(false);
    setShowRecent(false);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(ROUTES.HOME.path);
    setOpen(false);
    setShowRecent(false);
  };

  const handleMouseEnter = () => {
    setOpen(true);
    if (session) {
      setTimeout(() => setShowRecent(true), 300);
    }
  };

  const handleMouseLeave = () => {
    setOpen(false);
    setShowRecent(false);
  };

  const handleOpenSignIn = () => {
    setIsSignInModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const handleOpenRegister = () => {
    setIsRegisterModalOpen(true);
    setIsSignInModalOpen(false);
  };

  return (
    <>
      <div
        ref={anchorRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <UserIconWrapper>
          <AccountCircle />
        </UserIconWrapper>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement={isRtl ? "bottom-start" : "bottom-end"}
          transition
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 10],
              },
            },
          ]}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <DropdownContainer>
                <MenuContainer>
                  {status === "authenticated" ? (
                    <>
                      <Box
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <AccountCircle
                          sx={{ fontSize: 40, color: "primary.main" }}
                        />
                        <Typography variant="subtitle1">
                          {session?.user?.name ||
                            trans("link.userDropdown.guestUser")}
                        </Typography>
                      </Box>
                      <Divider />
                      <List component="nav" sx={{ p: 1 }}>
                        {NAVIGATION_GROUPS[group].map((item) => (
                          <NavigationLinkItem
                            key={item.path}
                            item={item}
                            isActive={item.path === pathname}
                            onClick={() => handleNavigate(item.path)}
                          />
                        ))}
                        <Divider sx={{ my: 1 }} />
                        <NavigationLinkItem
                          item={{
                            path: "#",
                            labelKey: "displayMessages.signOut",
                            icon: Logout,
                          }}
                          onClick={handleLogout}
                        />
                      </List>
                    </>
                  ) : (
                    <Box
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <Button
                        startIcon={<Login />}
                        variant="contained"
                        fullWidth
                        onClick={handleOpenSignIn}
                        sx={{
                          "& .MuiButton-startIcon": {
                            marginLeft: isRtl ? "8px" : "0",
                            marginRight: isRtl ? "-4px" : "8px",
                          },
                        }}
                      >
                        {trans(ROUTES.AUTH.SIGN_IN.labelKey)}
                      </Button>
                      <Button
                        startIcon={<PersonAdd />}
                        variant="outlined"
                        fullWidth
                        onClick={handleOpenRegister}
                        sx={{
                          "& .MuiButton-startIcon": {
                            marginLeft: isRtl ? "8px" : "0",
                            marginRight: isRtl ? "-4px" : "8px",
                          },
                        }}
                      >
                        {trans(ROUTES.AUTH.REGISTER.labelKey)}
                      </Button>
                    </Box>
                  )}
                </MenuContainer>
                {status === "authenticated" && (
                  <RecentViews show={showRecent} />
                )}
              </DropdownContainer>
            </Fade>
          )}
        </Popper>
      </div>

      <SignInModal
        open={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSwitchToRegister={handleOpenRegister}
      />
      <RegisterModal
        open={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToSignIn={handleOpenSignIn}
      />
    </>
  );
};

export default UserDropdown;
