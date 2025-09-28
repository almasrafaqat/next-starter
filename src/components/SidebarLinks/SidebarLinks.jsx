import {
  Paper,
  List,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { usePathname, useRouter } from "@/i18n/routing";
import { NAVIGATION_GROUPS, ROUTES } from "@/config/siteLinks";
import { NavigationLinkItem } from "../NavigationLinkItem/NavigationLinkItem";
import { signOut } from "next-auth/react";
import { Logout } from "@mui/icons-material";


export const SidebarLinks = ({
  group = "CUSTOMER"
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery((theme) =>
    theme.breakpoints.down("md")
  );

  const handleNavigate = (path) => {
    router.push(path);
   
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(ROUTES.HOME.path);
  };

  const sidebarContent = (
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
  );

  return (
    <>
      {/* Sidebar for desktop */}
      {!isMobile && (
        <Paper
          sx={{
            width: 280,
            flexShrink: 0,
            borderRadius: 2,
            mb: 2,
          }}
        >
          {sidebarContent}
        </Paper>
      )}
    </>
  );
};
