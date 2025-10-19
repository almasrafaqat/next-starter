import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  alpha,
  useTheme,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SheetDrawer from "@/components/ui/Sheet/SheetDrawer";
import CompanyForm from "../CompanyForm/CompanyForm";
import { useState } from "react";

const EmptyCompany = () => {

const theme = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleCreateCompany = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          py: 6,
        }}
      >
        <Card
          elevation={0}
          sx={{
            width: "100%",
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.05
            )} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
            border: `2px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: 4,
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: alpha(theme.palette.primary.main, 0.4),
              transform: "translateY(-4px)",
              boxShadow: `0 12px 24px ${alpha(
                theme.palette.primary.main,
                0.15
              )}`,
            },
          }}
        >
          <CardContent sx={{ p: 6 }}>
            {/* Icon with animated background */}
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: -8,
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette.primary.main,
                    0.2
                  )}, ${alpha(theme.palette.primary.main, 0.05)})`,
                  borderRadius: "50%",
                  animation: "pulse 2s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%, 100%": {
                      transform: "scale(1)",
                      opacity: 1,
                    },
                    "50%": {
                      transform: "scale(1.1)",
                      opacity: 0.8,
                    },
                  },
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: `0 8px 24px ${alpha(
                    theme.palette.primary.main,
                    0.4
                  )}`,
                }}
              >
                <BusinessIcon
                  sx={{
                    fontSize: 64,
                    color: "white",
                  }}
                />
              </Box>
            </Box>

            {/* Heading */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: "text.primary",
                mb: 2,
              }}
            >
              No Companies Yet
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 1,
                lineHeight: 1.7,
                maxWidth: 400,
                mx: "auto",
              }}
            >
              Get started by creating your first company profile to manage
              invoices, customers, and settings.
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 4,
                fontStyle: "italic",
              }}
            >
              It only takes a minute! ⚡
            </Typography>

            {/* CTA Button */}
            <Button
              variant="contained"
              size="large"
              startIcon={<AddBusinessIcon />}
              onClick={handleCreateCompany}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                boxShadow: `0 4px 12px ${alpha(
                  theme.palette.primary.main,
                  0.4
                )}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 6px 20px ${alpha(
                    theme.palette.primary.main,
                    0.5
                  )}`,
                },
              }}
            >
              Create Your First Company
            </Button>

            {/* Feature hints */}
            <Box
              sx={{
                mt: 5,
                pt: 4,
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mb: 2, fontWeight: 600 }}
              >
                What you can do with companies:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {[
                  "📧 Configure SMTP",
                  "📄 Manage Invoices",
                  "👥 Track Customers",
                  "⚙️ Custom Settings",
                ].map((feature, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      color: "primary.main",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    {feature}
                  </Box>
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <SheetDrawer open={isDrawerOpen} onClose={handleCloseDrawer}>
        <CompanyForm
          handleCloseDrawer={handleCloseDrawer}
          mode={"create"}
        />
      </SheetDrawer>
    </Container>
  );
};

export default EmptyCompany;
