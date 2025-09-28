import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LayoutContainer from "../LayoutContainer/LayoutContainer";
import { TopHeaderContainer } from "./TopHeader.styles";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import PromotionCarousel from "../PromotionCarousel/PromotionCarousel";
import SupportLinks from "../SupportLinks/SupportLinks";
import LanguageCurrencyDropdown from "../LanguageCurrencyDropdown/LanguageCurrencyDropdown";

const TopHeader = () => {
  const { isSmallScreen } = useResponsiveLayout();

  return (
    <LayoutContainer backgroundColor={"secondary.dark"} useContainer={false}>
      <TopHeaderContainer>
        <Grid container spacing={2} alignItems="center">
          {!isSmallScreen && (
            <Grid size={8}>
              <Box overflow="hidden">
                <PromotionCarousel />
              </Box>
            </Grid>
          )}
          <Grid size={isSmallScreen ? 12 : 4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: { xs: "space-between", md: "flex-end" },
                width: "100%",
              }}
            >
              <SupportLinks />
              <LanguageCurrencyDropdown />
            </Box>
          </Grid>
        </Grid>
      </TopHeaderContainer>
    </LayoutContainer>
  );
};

export default TopHeader;
