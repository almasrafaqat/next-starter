import { Box, Tooltip } from "@mui/material";
import { Phone, Email } from "@mui/icons-material";
import { SupportIcon, SupportLink } from "./SupportLinks.styles";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useTranslations } from 'next-intl';

const SupportLinks = () => {
  const { isMobile, isRtl } = useResponsiveLayout();
  const trans = useTranslations('translations');


  const links = [
    {
      icon: Phone,
      href: "tel:+923156402227",
      text: isRtl ? "+92-315-6402227" : "+92-315-6402227",
      label: trans('support.phoneLabel')
    },
    {
      icon: Email,
      href: "mailto:info@example.com",
      text: "info@example.com",
      label: trans('support.emailLabel')
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 1, md: 2 },
        direction: 'ltr', // Force LTR for container
      }}
    >
      {links.map(({ icon: Icon, href, text, label }) => (
        <Tooltip key={href} title={isMobile ? label : ''} arrow>
          <SupportLink
            href={href}
            className="support-link"
          >
            <SupportIcon>
              <Icon fontSize="small" />
            </SupportIcon>
            {!isMobile && (
              <span className="support-text">
                {text}
              </span>
            )}
          </SupportLink>
        </Tooltip>
      ))}
    </Box>
  );
};

export default SupportLinks;