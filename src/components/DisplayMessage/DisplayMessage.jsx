import { useState } from "react";
import {
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { IconButton, useTheme, Button } from "@mui/material";
import {
  MessageContainer,
  IconWrapper,
  ContentWrapper,
  Title,
  Description,
  CloseButton,
  ActionButton,
} from "./DisplayMessage.styles";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useTranslations } from "next-intl";

const iconMap = {
  success: CheckCircleIcon,
  info: InfoIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

export default function DisplayMessage({
  type = "info",
  showTitle = true,
  title,
  description,
  showIcon = true,
  onClose,
  className,
  actionText,
  onAction,
  buttonProps = {},
}) {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = iconMap[type];
  const theme = useTheme();
  const { isRtl, isMobile } = useResponsiveLayout();
  const trans = useTranslations("translations.displayMessages");

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleAction = () => {
    if (onAction) {
      onAction();
    }
  };

  if (!isVisible) return null;

  const displayTitle = showTitle ? (title || trans(type)) : null;

  return (
    <MessageContainer
      type={type}
      className={className}
      theme={theme}
      $isRtl={isRtl}
      $isMobile={isMobile}
    >
      {showIcon && (
        <IconWrapper $isRtl={isRtl}>
          <Icon />
        </IconWrapper>
      )}
      <ContentWrapper>
        {displayTitle && <Title>{displayTitle}</Title>}
        {description && <Description>{description}</Description>}
        {actionText && (
          <ActionButton>
            <Button
              onClick={handleAction}
              variant={buttonProps.variant || "outlined"}
              size={buttonProps.size || "medium"}
              sx={{ color: buttonProps.color }}
              {...(buttonProps)}
            >
              {actionText}
            </Button>
          </ActionButton>
        )}
      </ContentWrapper>
      {onClose && (
        <CloseButton $isRtl={isRtl}>
          <IconButton
            size="small"
            onClick={handleClose}
            aria-label={trans("closeMessage")}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </CloseButton>
      )}
    </MessageContainer>
  );
}

