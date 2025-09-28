import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ThemedLink from '../ThemeLink/ThemeLink';
import Image from 'next/image';

const fullLogoPath = "/menifest-logo/152x152.png";
const compactLogoPath = "/menifest-logo/120x120.png";

const LogoWrapper = styled(Box)(({ theme, size }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: size === 'small' ? 32 : size === 'medium' ? 48 : size === 'large' ? 96 : 64,
  height: size === 'small' ? 32 : size === 'medium' ? 48 : size === 'large' ? 96 : 64,
  [theme.breakpoints.down('sm')]: {
    width: size === 'large' ? 64 : size === 'small' ? 24 : 32,
    height: size === 'large' ? 64 : size === 'small' ? 24 : 32,
  },
}));

const Logo = ({
  variant = 'full',
  size = 'medium',
  ...props
}) => {
  const isCompact = variant === 'compact';
  const logoPath = isCompact ? compactLogoPath : fullLogoPath;

  const getImageSize = (size) => {
    switch(size) {
      case 'small': return 32;
      case 'medium': return 48;
      case 'large': return 96;
      default: return 64;
    }
  };

  return (
    <ThemedLink href="/" passHref>
      <LogoWrapper size={size} {...props}>
        <Image
          src={logoPath}
          alt="Logo"
          width={getImageSize(size)}
          height={getImageSize(size)}
          style={{ width: '100%', height: 'auto' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </LogoWrapper>
    </ThemedLink>
  );
};

export default Logo;

