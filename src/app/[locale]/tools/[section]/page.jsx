import dynamic from "next/dynamic";
import NotFoundSection from "@/components/NotFoundSection/NotFoundSection";
import React from "react";
import { Box, Container, Typography } from "@mui/material";

const tools = {
  doctopdf: dynamic(() => import("@/components/features/DocToPdf/DocToPdf"), {
    ssr: false,
    loading: () => (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography>Loading converter…</Typography>
      </Box>
    ),
  }),
};

const toolsMetaFallback = {
  doctopdf: {
    title: "Word/Excel to PDF Converter - Free Online Tool",
    description:
      "Convert Word (.docx) and Excel (.xlsx) files to high-quality PDF instantly. Mobile-first, no signup required. Preview before download.",
    keywords: [
      "word to pdf",
      "excel to pdf",
      "docx to pdf",
      "xlsx to pdf",
      "free pdf converter",
      "online converter",
    ],
    slug: "doctopdf",
  },
};

export const dynamicParams = false;
export const revalidate = 604800; // Revalidate weekly (ISR)

export function generateStaticParams() {
  const locales = ["en", "ar"];
  return locales.flatMap((locale) =>
    Object.keys(tools).map((section) => ({ locale, section }))
  );
}

// SEO metadata
export function generateMetadata({ params }) {
  const { section, locale } = params;
  const meta = toolsMetaFallback[section];

  if (!meta) return {};

  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://exportpocket.com";
  const canonical = `${base}/${locale}/tools/${section}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical,
      languages: {
        en: `${base}/en/tools/${section}`,
        ar: `${base}/ar/tools/${section}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      type: "website",
      locale: locale,
      siteName: "Export Pocket",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

const ToolsSectionPage = ({ params }) => {
  const { section } = params;
  const Tool = tools[section];

  if (!Tool) return <NotFoundSection />;

  const meta = toolsMetaFallback[section];

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: meta.title,
            description: meta.description,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />

      {/* SSR header for SEO & accessibility */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4 } }}>
        <Box
          component="header"
          sx={{
            mb: { xs: 3, sm: 4 },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
              fontWeight: 800,
              mb: 1,
              letterSpacing: -0.5,
            }}
          >
            {meta.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 600,
              mx: { xs: "auto", sm: 0 },
            }}
          >
            {meta.description}
          </Typography>
        </Box>
      </Container>

      {/* Client-side tool */}
      <Tool />
    </>
  );
};

export default ToolsSectionPage;
