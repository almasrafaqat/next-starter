"use client";
import { Box, } from "@mui/material";
import Container from "../Container/Container";



const LayoutContainer = ({
  children,
  backgroundColor,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  backgroundAttachment,
  minHeight,
  borderRadius,
  useContainer = true,
  component = "section",
  isPadding = true,
  ...props
}) => {
  const content = useContainer ? <Container>{children}</Container> : children;

  return (
    <Box
      component={component}
      sx={{
        width: "100%",
        backgroundColor: backgroundColor || "palette.gradientBg",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: backgroundSize || "cover",
        backgroundPosition: backgroundPosition || "center",
        backgroundRepeat: backgroundRepeat || "no-repeat",
        backgroundAttachment: backgroundAttachment || "scroll",
        minHeight: minHeight || "auto",
        borderRadius: borderRadius || 0,
        overflow: borderRadius ? "hidden" : "visible",
        ...props.sx,
        paddingLeft: isPadding ? 1 : 0,
        paddingRight: isPadding ? 1 : 0,
      }}
      {...props}
    >
      {content}
    </Box>
  );
};

export default LayoutContainer;
