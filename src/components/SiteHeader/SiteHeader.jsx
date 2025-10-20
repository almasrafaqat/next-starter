"use client";

import React from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Box,
  Container,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import BoltIcon from "@mui/icons-material/Bolt";
import LanguageIcon from "@mui/icons-material/Language";
import { HeaderBar, Brand, NavGroup, NavLinkBtn, CtaButton, MobileOnly, DesktopOnly, Glow } from "./SiteHeader.styles";

const nav = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/en/tools/doctopdf" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
];

export default function SiteHeader({ onUpload }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Glow />
      <HeaderBar position="sticky" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 1.5, minHeight: { xs: 64, sm: 72 } }}>
            <Brand component={Link} href="/">
              <BoltIcon className="logo" />
              <span className="text">Export Pocket</span>
            </Brand>

            <Box sx={{ flex: 1 }} />

            <DesktopOnly>
              <NavGroup>
                {nav.map((n) => (
                  <NavLinkBtn key={n.label} component={Link} href={n.href}>
                    {n.label}
                  </NavLinkBtn>
                ))}
              </NavGroup>
            </DesktopOnly>

            <Tooltip title="Language">
              <IconButton color="primary" size="large" sx={{ mr: { xs: 0, sm: 1 } }}>
                <LanguageIcon />
              </IconButton>
            </Tooltip>

            <DesktopOnly>
              <CtaButton
                variant="contained"
                startIcon={<PictureAsPdfIcon />}
                onClick={() => onUpload?.()}
              >
                Convert a file
              </CtaButton>
            </DesktopOnly>

            <MobileOnly>
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            </MobileOnly>
          </Toolbar>
        </Container>
      </HeaderBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 300, p: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 18, ml: 1 }}>Menu</Typography>
            <Box sx={{ flex: 1 }} />
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {nav.map((n) => (
              <ListItemButton key={n.label} component={Link} href={n.href} onClick={() => setOpen(false)}>
                <ListItemText primary={n.label} />
              </ListItemButton>
            ))}
          </List>
          <Box sx={{ p: 2 }}>
            <CtaButton
              fullWidth
              variant="contained"
              startIcon={<PictureAsPdfIcon />}
              onClick={() => {
                onUpload?.();
                setOpen(false);
              }}
            >
              Convert a file
            </CtaButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}