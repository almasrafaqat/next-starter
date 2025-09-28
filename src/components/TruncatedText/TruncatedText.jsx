import { styled } from "@mui/material/styles";
import { Box, Tooltip, Typography } from "@mui/material";

const TruncateContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  width: "100%",
}));

const TruncatedContent = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "maxWidth" && prop !== "showTooltip",
})(({ theme, maxWidth = "100%", showTooltip }) => ({
  position: "relative",
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth,
  paddingRight: "9px",
  fontSize: "0.70rem",
  cursor: showTooltip ? "help" : "inherit",
  transition: "text-decoration 0.2s",
  [theme.breakpoints.up("md")]: {
    fontSize: "0.875rem",
  },
  "&:hover": showTooltip
    ? {
        textDecoration: "underline dotted",
      }
    : {},
}));

const TruncatedText = ({
  icon,
  text,
  maxWidth,
  variant = "body2",
  showTooltip = true,
  tooltipPlacement = "top",
  ...props
}) => {
  const content = (
    <TruncateContainer>
      {icon && <Box component="span">{icon}</Box>}
      <TruncatedContent
        variant={variant}
        maxWidth={maxWidth}
        showTooltip={showTooltip ? 1 : 0}
        {...props}
      >
        {text}
      </TruncatedContent>
    </TruncateContainer>
  );

  if (showTooltip) {
    return (
      <Tooltip title={text} placement={tooltipPlacement}>
        <Box sx={{ width: "100%" }}>{content}</Box>
      </Tooltip>
    );
  }

  return content;
};

export default TruncatedText;
