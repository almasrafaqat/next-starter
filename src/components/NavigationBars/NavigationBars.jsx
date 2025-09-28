"use client";

import { Badge, Tooltip, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import {
  FloatingButton,
  ShimmerPill,
  RailHandle,
} from "./NavigationBars.styles";

export function MenuFab({ onOpen, label = "Menu", showBadge = false }) {
  return (
    <Tooltip title={label} placement="right">
      <FloatingButton onClick={onOpen} aria-label={label}>
        <Badge color="primary" variant="dot" invisible={!showBadge}>
          <MenuRoundedIcon fontSize="small" />
        </Badge>
        <Typography variant="body2" component="span">
          {label}
        </Typography>
      </FloatingButton>
    </Tooltip>
  );
}

// export function MenuPill({ onOpen, label = "Menu" }) {
//   return (
//     <ShimmerPill onClick={onOpen} aria-label={label}>
//       <MenuRoundedIcon fontSize="small" />
//       <Typography
//         variant="body2"
//         component="span"
//         sx={{
//           fontWeight: 600,
//           color: 'inherit'
//          }}
//       >
//         {label}
//       </Typography>
//     </ShimmerPill>
//   )
// }

export function MenuPill({
  onOpen,
  label = "Menu",
  open = false,
  iconPlacement = "left",
}) {
  // Choose icon based on open state
  const Icon = open ? ChevronRightRoundedIcon : MenuRoundedIcon;

  return (
    <ShimmerPill onClick={onOpen} aria-label={label}>
      {iconPlacement === "left" && <Icon fontSize="small" />}
      <Typography
        variant="body2"
        component="span"
        sx={{ fontWeight: 600, color: "inherit", mx: 0.75 }}
      >
        {label}
      </Typography>
      {iconPlacement === "right" && <Icon fontSize="small" />}
    </ShimmerPill>
  );
}

// A subtle rail handle peeking from the left edge
// export function MenuRailHandle({ onOpen, title = "Open menu" }) {
//   return (
//     <Tooltip title={title} placement="right">
//       <RailHandle role="button" tabIndex={0} onClick={onOpen} onKeyDown={(e) => e.key === "Enter" && onOpen()}>
//         <ChevronRightRoundedIcon fontSize="small" />
//       </RailHandle>
//     </Tooltip>
//   )
// }

export function MenuRailHandle({
  onOpen,
  title = "Open menu",
  open = false,
  iconPlacement = "right",
}) {
  // Use left/right chevron based on open state
  const Icon = open ? ChevronLeftRoundedIcon : ChevronRightRoundedIcon;

  // Dynamic border radius
  const borderRadius =
    iconPlacement === "right"
      ? {
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          borderTopLeftRadius: open ? 12 : 0,
          borderBottomLeftRadius: open ? 12 : 0,
        }
      : {
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          borderTopRightRadius: open ? 12 : 0,
          borderBottomRightRadius: open ? 12 : 0,
        };

  return (
    <Tooltip title={title} placement="right">
      <RailHandle
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => e.key === "Enter" && onOpen()}
        sx={{
          ...borderRadius,
          transition: "border-radius 0.2s",
        }}
      >
        {iconPlacement === "left" && <Icon fontSize="small" />}
        {/* You can add a label or shimmer here if desired */}
        {iconPlacement === "right" && <Icon fontSize="small" />}
      </RailHandle>
    </Tooltip>
  );
}
