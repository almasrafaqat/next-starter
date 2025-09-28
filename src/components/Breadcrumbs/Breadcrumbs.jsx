"use client";
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { generateBreadcrumbItems } from "@/utils/breadcrumbUtils";
import { usePathname } from "@/i18n/routing";
import ThemedLink from "../ThemeLink/ThemeLink";


export const Breadcrumbs = ({ items }) => {
  const trans = useTranslations('translations');
  const { isRtl } = useResponsiveLayout();
  const pathname = usePathname();

  const breadcrumbItems = items || generateBreadcrumbItems(pathname);

  return (
    <MuiBreadcrumbs
      sx={{
        "& .MuiBreadcrumbs-separator": {
          mx: 1,
          transform: isRtl ? "rotate(180deg)" : "none",
        },
      }}
    >
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;

        if (isLast) {
          return (
            <Typography key={item.path} color="text.primary">
              {trans(item.labelKey)}
            </Typography>
          );
        }

        return (
          <ThemedLink
            key={item.path}
            href={item.path}
            margin="0"
            typographyProps={{
              color: "text.primary",
              sx: { "&:hover": { color: "primary.main" } },
            }}
          >
            {trans(item.labelKey)}
          </ThemedLink>
        );
      })}
    </MuiBreadcrumbs>
  );
};
