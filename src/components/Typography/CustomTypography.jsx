'use client'
import { Typography as MuiTypography } from '@mui/material';
import { styled, textTransform } from '@mui/system';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

const StyledTypography = styled(MuiTypography, {
  shouldForwardProp: (prop) =>
    prop !== 'customColor' &&
    prop !== 'customFontStyle' &&
    prop !== 'customFontFamily' &&
    prop !== 'customFontSize'
})(({ customColor, customFontStyle, customFontFamily, customFontSize }) => ({
  color: customColor || 'inherit',
  fontStyle: customFontStyle || 'normal',
  fontFamily: customFontFamily || 'inherit',
  fontSize: customFontSize || 'inherit',
  transition: 'font-size 0.3s ease',
}));

const CustomTypography = ({
  variant = 'body1',
  color,
  fontStyle,
  fontFamily,
  fontSize,
  children,
  ...props
}) => {

const {theme} = useResponsiveLayout();
  const getThemeColor = (colorValue) => {
    if (colorValue && colorValue.startsWith('theme.')) {
      const [, palette, shade] = colorValue.split('.');
      return theme.palette[palette][shade];
    }
    return colorValue || theme.typography[variant].color || theme.palette.text.primary;
  };

  const getThemeFontSize = (variant) => {
    return theme.typography[variant].fontSize;
  };

  const getResponsiveFontSize = (size) => {
    if (typeof size === 'object') {
      return {
        fontSize: size.xs,
        [theme.breakpoints.up('sm')]: { fontSize: size.sm },
        [theme.breakpoints.up('md')]: { fontSize: size.md },
        [theme.breakpoints.up('lg')]: { fontSize: size.lg },
      };
    }
    return { fontSize: size };
  };

  return (
    <StyledTypography
      variant={variant}
      customColor={getThemeColor(color)}
      customFontStyle={fontStyle}
      customFontFamily={fontFamily || theme.typography.fontFamily}
      customFontSize={fontSize || getThemeFontSize(variant)}
      sx={{
        textTransform: textTransform || 'none',
        ...getResponsiveFontSize(fontSize),
      }}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

export default CustomTypography;

