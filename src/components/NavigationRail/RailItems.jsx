import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Slide,
  IconButton,
  Badge,
  Tooltip,
} from "@mui/material";

import {
  StyledContentPanel,
  StyledMobileContentPanel,
  StyledMobileNav,
} from "./NavigationRail.styles";

import { SwiperSlide } from "swiper/react";
import EasySwiperHorizontal from "../Swiper/EasySwiperHorizontal";
import EasySwiperVertical from "../Swiper/EasySwiperVertical";
import EasyScrollableContainer from "../Swiper/EasyScrollableContainer";
import React from "react";

export const MobileMenuItems = ({
  items,
  selected,
  expanded,
  handleItemClick,
}) => {
  const handleSelect = (key) => {
    handleItemClick(key);
  };
  return (
    <StyledMobileNav>
      <EasySwiperHorizontal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.key} style={{ boder: "10px solid red" }}>
            <Tooltip title={item.label} arrow placement="top">
              <IconButton
                sx={{
                  background:
                    selected === item.key
                      ? (theme) => theme.gradientBg
                      : "transparent",
                  boxShadow:
                    selected === item.key
                      ? "0 2px 8px 0 rgba(240,101,149,0.18)"
                      : "none",
                  border:
                    selected === item.key
                      ? "2px solid #fff"
                      : "2px solid transparent",
                  transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                  p: 1.2,
                  "&:hover": {
                    background: (theme) => theme.gradientBgHover,
                    transform: "scale(1.13)",
                    boxShadow: "0 4px 16px 0 rgba(240,101,149,0.22)",
                  },
                }}
                onClick={() => handleSelect(item.key)}
                color={selected === item.key ? "primary" : "default"}
              >
                <Badge
                  badgeContent={item.badge}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "white",
                      color: "primary.main",
                      fontSize: "0.65rem",
                      minWidth: 16,
                      height: 16,
                      padding: "0 4px",
                      boxShadow: "0 1px 4px 0 rgba(240,101,149,0.10)",
                      animation: item.badge > 0 ? "badgePop 0.3s" : "none",
                    },
                    "@keyframes badgePop": {
                      "0%": { transform: "scale(0.7)" },
                      "70%": { transform: "scale(1.15)" },
                      "100%": { transform: "scale(1)" },
                    },
                  }}
                >
                  {item.icon &&
                    React.cloneElement(item.icon, {
                      sx: {
                        color: selected === item.key ? "primary.contrastText" : "primary.contrastText",
                        fontSize: 24,
                      },
                    })}
                </Badge>
              </IconButton>
            </Tooltip>
          </SwiperSlide>
        ))}
      </EasySwiperHorizontal>
    </StyledMobileNav>
  );
};

export const PcMenuItems = ({
  items,
  selected,
  expanded,
  setSelected = () => {},
  handleItemClick,
}) => {
  return (
    <List component="nav">
      <EasySwiperVertical style={{ height: "50vh" }}>
        {items.map((item) => (
          <SwiperSlide key={item.key}>
            <ListItem disablePadding>
              <ListItemButton
                selected={selected === item.key}
                onClick={() => handleItemClick(item.key)}
                sx={{
                  borderRadius: 2,
                  my: 0.5,
                  px: 2,
                  minHeight: 48,
                  alignItems: "center",
                  transition: "background 0.2s, color 0.2s",
                  "&:hover": {
                    bgcolor: "rgba(240,101,149,0.08)", // subtle primary tint
                  },
                  "&.Mui-selected": {
                    color: "primary.main",
                    bgcolor: "rgba(240,101,149,0.12)",
                    "& .MuiListItemIcon-root": {
                      color: "primary.main",
                    },
                    "& .MuiListItemText-primary": {
                      color: "primary.main",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: selected === item.key ? "primary.main" : "grey.600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  {item.icon && item.icon}
                </ListItemIcon>
                {expanded && (
                  <ListItemText
                    primary={item.label}
                    sx={{
                      ml: 1,
                      transition: "opacity 0.3s",
                      opacity: expanded ? 1 : 0,
                      fontWeight: selected === item.key ? 600 : 400,
                      fontSize: "1rem",
                    }}
                  />
                )}
                {item.badge > 0 && (
                  <Box
                    component="span"
                    sx={{
                      ml: 1,
                      bgcolor: "primary.main",
                      color: "white",
                      borderRadius: "8px",
                      px: 0.75,
                      fontSize: "0.75rem",
                      minWidth: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: 1,
                      animation: "badgePop 0.3s",
                      "@keyframes badgePop": {
                        "0%": { transform: "scale(0.7)" },
                        "70%": { transform: "scale(1.15)" },
                        "100%": { transform: "scale(1)" },
                      },
                    }}
                  >
                    {item.badge}
                  </Box>
                )}
              </ListItemButton>
            </ListItem>
          </SwiperSlide>
        ))}
      </EasySwiperVertical>
    </List>
  );
};

export const MobileSlide = ({
  items,
  selected,
  setSelected = () => {},
  isScrollable,
}) => {
  const item = items.find((m) => m.key === selected);
  if (!item) return null;
  const Content = item?.component;
  if (!Content) return null;
  return (
    <Slide direction="up" in={!!selected} mountOnEnter unmountOnExit>
      <StyledMobileContentPanel elevation={3} mobileheight="80vh">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Typography variant="h6">{item.label}</Typography>
          <Typography
            variant="body2"
            sx={{ cursor: "pointer", color: "primary.main" }}
            onClick={() => setSelected(null)}
          >
            Close
          </Typography>
        </Box>
        <Divider />
        <Box p={2}>
          {isScrollable ? (
            <EasyScrollableContainer style={{ height: "40vh" }}>
              {Content ? <Content /> : null}
            </EasyScrollableContainer>
          ) : Content ? (
            <Content />
          ) : null}
        </Box>
      </StyledMobileContentPanel>
    </Slide>
  );
};

export const PCSlide = ({
  items,
  selected,
  setSelected = () => {},
  isScrollable,
}) => {
  const item = items.find((m) => m.key === selected);
  if (!item) return null;
  const Content = item?.component;
  if (!Content) return null;
  return (
    <Slide direction="left" in={!!selected} mountOnEnter unmountOnExit>
      <StyledContentPanel elevation={0}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Typography variant="h6">{item.label}</Typography>
          <Typography
            variant="body2"
            sx={{ cursor: "pointer", color: "primary.main" }}
            onClick={() => setSelected(null)}
          >
            Close
          </Typography>
        </Box>
        <Divider />
        <Box p={2}>
          {isScrollable ? (
            <EasyScrollableContainer style={{ height: "40vh" }}>
              {Content ? <Content /> : null}
            </EasyScrollableContainer>
          ) : Content ? (
            <Content />
          ) : null}
        </Box>
      </StyledContentPanel>
    </Slide>
  );
};
