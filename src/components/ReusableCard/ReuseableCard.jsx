import { Card,  styled } from "@mui/material";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";



const StyledCard = styled(Card, {
  shouldForwardProp: (prop) =>
    prop !== "maxWidth" &&
    prop !== "padding" &&
    prop !== "borderRadius" &&
    prop !== "boxShadow" &&
    prop !== "margin",
})(
  ({
    theme,
    maxWidth = 450,
    padding = theme.spacing(4),
    borderRadius = 20,
    boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)",
    margin = "2rem auto",
  }) => ({
    maxWidth,
    padding,
    borderRadius,
    boxShadow,
    margin,
    [theme.breakpoints.down("sm")]: {
      margin: "1rem auto",
      padding: theme.spacing(2),
    },
  })
);

export default function ReusableCard({
  children,
  maxWidth,
  padding,
  borderRadius,
  boxShadow,
  margin,
  ...props
}) {
  const { theme } = useResponsiveLayout();

  return (
    <StyledCard
      maxWidth={maxWidth}
      padding={padding}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      margin={margin}
      dir={theme.direction}
      {...props}
    >
      {children}
    </StyledCard>
  );
}
