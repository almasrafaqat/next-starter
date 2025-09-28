import { Typography } from '@mui/material';
import { Link } from '@/i18n/routing';


const ThemedLink = ({
  href,
  children,
  margin = '0 5px',
  typographyProps,
  ...linkProps
}) => {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: "inherit",
        margin: margin,
      }}
      {...linkProps}
    >
      <Typography
        component="span"
        sx={{
          color: "primary.main",
          "&:hover": {
            color: "secondary.main",
          },
          ...typographyProps?.sx
        }}
        {...typographyProps}
      >
        {children}
      </Typography>
    </Link>
  );
};

export default ThemedLink;
