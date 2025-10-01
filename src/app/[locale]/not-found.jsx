"use client";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { SearchOff, Home, ArrowBack, Explore } from "@mui/icons-material";

const NotFoundContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#ffffff",
  padding: theme.spacing(3),
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
    color: "#059669",
    opacity: 0.9,
  },
}));

const ErrorCode = styled(Typography)({
  fontSize: "clamp(80px, 15vw, 140px)",
  fontWeight: 700,
  color: "#059669",
  lineHeight: 1,
  marginBottom: 16,
  letterSpacing: "-0.02em",
});

const Headline = styled(Typography)({
  fontSize: "clamp(24px, 5vw, 36px)",
  fontWeight: 700,
  color: "#475569",
  marginBottom: 16,
  lineHeight: 1.3,
});

const Subtext = styled(Typography)({
  fontSize: 18,
  color: "#64748b",
  marginBottom: 32,
  lineHeight: 1.6,
});

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "center",
  flexWrap: "wrap",
}));

const PrimaryButton = styled(Button)({
  backgroundColor: "#059669",
  color: "#ffffff",
  padding: "12px 32px",
  fontSize: 16,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: 8,
  "&:hover": {
    backgroundColor: "#047857",
  },
});

const SecondaryButton = styled(Button)({
  backgroundColor: "#f1f5f9",
  color: "#475569",
  padding: "12px 32px",
  fontSize: 16,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: 8,
  "&:hover": {
    backgroundColor: "#e2e8f0",
  },
});

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

export default async function NotFound({ params }) {
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
