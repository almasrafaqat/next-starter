"use client";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { SearchOff, Home, ArrowBack, Explore } from "@mui/icons-material";

const NotFoundContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.background.default,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const ContentWrapper = styled(Box)({
  textAlign: "center",
  maxWidth: 600,
});

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  "& svg": {
    fontSize: 80,
    color: theme.palette.primary.main,
    opacity: 0.9,
  },
}));

const ErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(80px, 15vw, 140px)",
  fontWeight: 700,
  color: theme.palette.primary.main,
  lineHeight: 1,
  marginBottom: 16,
  letterSpacing: "-0.02em",
  fontFamily: theme.typography.h1.fontFamily,
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(24px, 5vw, 36px)",
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: 16,
  lineHeight: 1.3,
  fontFamily: theme.typography.h2.fontFamily,
}));

const Subtext = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.text.muted,
  marginBottom: 32,
  lineHeight: 1.6,
  fontFamily: theme.typography.body1.fontFamily,
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "center",
  flexWrap: "wrap",
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.contrastText,
  padding: "12px 32px",
  fontSize: 16,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.alternate,
  color: theme.palette.text.primary,
  padding: "12px 32px",
  fontSize: 16,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.background.highlight,
  },
}));

const DecorativeIcons = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(3),
  marginTop: theme.spacing(6),
  opacity: 0.3,
  "& svg": {
    fontSize: 32,
    color: "#059669",
  },
}));

export default async function NotFoundSection({ params }) {
  return (
    <NotFoundContainer>
      <ContentWrapper>
        <IconWrapper>
          <SearchOff sx={{ fontSize: "80px !important" }} />
        </IconWrapper>

        <ErrorCode>404</ErrorCode>

        <Headline>Oops! We can't seem to find that page.</Headline>

        <Subtext>
          Don't worry, it happens to the best of us. The page you're looking for
          might have been moved, deleted, or perhaps never existed. Let's get
          you back on track.
        </Subtext>

        <ButtonGroup>
          <Link href="/" passHref style={{ textDecoration: "none" }}>
            <PrimaryButton startIcon={<Home />}>Go Back Home</PrimaryButton>
          </Link>

          <SecondaryButton
            startIcon={<ArrowBack />}
            onClick={() => window.history.back()}
          >
            Go Back
          </SecondaryButton>
        </ButtonGroup>

        <DecorativeIcons>
          <Explore />
          <Home />
          <SearchOff />
        </DecorativeIcons>
      </ContentWrapper>
    </NotFoundContainer>
  );
}
