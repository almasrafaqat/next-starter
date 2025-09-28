import { IconButton, Badge } from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import Logo from "@/components/Logo/Logo";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import LayoutContainer from "../LayoutContainer/LayoutContainer";
import { ActionContainer } from "./MainHeader.styles";
import Grid from "@mui/material/Grid2";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import SearchBar from "../SearchBar/SearchBar";
import UserDropdown from "../UserDropDown/UserDropDown";

const MainHeader = () => {
  const { isRtl } = useResponsiveLayout();
  const { isMobile } = useDeviceDetection();
  return (
    <LayoutContainer
      sx={{
        borderBottom: "1px solid #ccc",
        py: 1,
        backgroundColor: "primary.contrastText",
      }}
      useContainer={false}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid
          size={isMobile ? 2 : 1}
          textAlign={isMobile ? "center" : isRtl ? "left" : "right"}
        >
          <Logo variant="compact" size="medium" />
        </Grid>

        <Grid
          size={isMobile ? 8 : 7}
          sx={{
            border: (theme) => `1px solid ${theme.palette.secondary.dark}`,
            borderRadius: "6px",
          }}
        >
          <SearchBar />
        </Grid>
        <Grid size={isMobile ? 2 : 2} textAlign="center">
          <UserDropdown group="CUSTOMER" />
        </Grid>
        {!isMobile && (
          <Grid size={isMobile ? 12 : 2}>
            <ActionContainer>
              <>
                <IconButton
                  color="inherit"
                  aria-label="user account"
                ></IconButton>
                <IconButton color="inherit" aria-label="shopping cart">
                  <Badge badgeContent={5} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </>
            </ActionContainer>
          </Grid>
        )}
      </Grid>
    </LayoutContainer>
  );
};

export default MainHeader;
