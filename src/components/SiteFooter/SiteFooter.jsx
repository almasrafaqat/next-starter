"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import BoltIcon from "@mui/icons-material/Bolt";
import { FooterWrap, FooterBrand, FooterLink, SocialBtn, FooterBottom } from "./SiteFooter.styles";

const links = {
  Product: [
    { label: "Word to PDF", href: "/en/tools/doctopdf" },
    { label: "Excel to PDF", href: "/en/tools/doctopdf" },
    { label: "All tools", href: "#" },
  ],
  Resources: [
    { label: "Docs", href: "#" },
    { label: "Guides", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" },
  ],
};

export default function SiteFooter() {
  return (
    <FooterWrap component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 6 }}>
          <Grid item xs={12} md={4}>
            <FooterBrand>
              <BoltIcon className="logo" />
              <div className="text">
                <strong>Export Pocket</strong>
                <span>Convert documents instantly</span>
              </div>
            </FooterBrand>
            <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
              <SocialBtn component="a" href="#" aria-label="Twitter">
                <TwitterIcon />
              </SocialBtn>
              <SocialBtn component="a" href="#" aria-label="GitHub">
                <GitHubIcon />
              </SocialBtn>
              <SocialBtn component="a" href="#" aria-label="YouTube">
                <YouTubeIcon />
              </SocialBtn>
            </Box>
          </Grid>

          {Object.entries(links).map(([title, items]) => (
            <Grid item xs={6} md={2} key={title}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                {title}
              </Typography>
              <Box sx={{ display: "grid", gap: 0.5 }}>
                {items.map((l) => (
                  <FooterLink key={l.label} component={Link} href={l.href}>
                    {l.label}
                  </FooterLink>
                ))}
              </Box>
            </Grid>
          ))}

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
              Get updates
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                size="small"
                placeholder="Your email"
                fullWidth
                type="email"
              />
              <Button variant="contained" sx={{ fontWeight: 800, textTransform: "none" }}>
                Subscribe
              </Button>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
              No spam. Unsubscribe anytime.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <FooterBottom>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Export Pocket. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FooterLink component={Link} href="#">
              Terms
            </FooterLink>
            <FooterLink component={Link} href="#">
              Privacy
            </FooterLink>
          </Box>
        </FooterBottom>
      </Container>
    </FooterWrap>
  );
}