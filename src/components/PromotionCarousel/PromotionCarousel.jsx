import { useState, useEffect } from 'react';
import { Box, Fade } from '@mui/material';
import { LocalShipping, Assignment } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import { PromotionItem } from './PromotionCarousel.styles';
import CustomTypography from '../Typography/CustomTypography';
import ThemedLink from '../ThemeLink/ThemeLink';

const PromotionCarousel = () => {
  const t = useTranslations('translations.topHeader');
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  const promotions = [
    {
      icon: <LocalShipping />,
      text: `${t('realTime3DCustomization')} - ${t('b2bBulkDiscounts')}`,
      href: '/local-shipping'
    },
    {
      icon: <Assignment />,
      text: `${t('globalShipping')} - ${t('blackFridayDeals')}`,
      href: '/global-shipping'
    },

  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromoIndex((prevIndex) => (prevIndex + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [promotions.length]);

  return (
    <Box sx={{ overflow: 'hidden', height: '1.5rem', width: '100%' }}>
      <Fade in={true} timeout={500}>
        <PromotionItem
        >
          <ThemedLink
            href={promotions[currentPromoIndex].href}
          >
            <CustomTypography
              color={'theme.primary.contrastText'}
              component="span"
            >
              {promotions[currentPromoIndex].icon}
            </CustomTypography>

          </ThemedLink>
          <ThemedLink
            href={promotions[currentPromoIndex].href}
          >
            <CustomTypography
              color={'theme.primary.contrastText'}
              fontSize={'0.9rem'}
            >
              {promotions[currentPromoIndex].text}
            </CustomTypography>
          </ThemedLink>

        </PromotionItem>

      </Fade>

    </Box>
  );
};

export default PromotionCarousel;