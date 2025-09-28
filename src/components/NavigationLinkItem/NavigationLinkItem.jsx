import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";



export const NavigationLinkItem = ({
  item,
  isActive = false,
  onClick,
  sx = {},
}) => {
  const router = useRouter();
  const trans = useTranslations('translations');

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
    router.push(item.path);
  };

  return (
    <ListItem
      component={Link}
      href={item.path}
      onClick={handleClick}
      sx={{
        borderRadius: 1,
        cursor: "pointer",
        color: "text.primary",
        transition: "all 0.2s ease-in-out",
        "&:hover, &:focus": {
          bgcolor: "primary.main",
          color: "primary.white",
          "& .MuiListItemIcon-root": {
            color: "primary.white",
          },
          "& .MuiListItemText-primary": {
            color: "primary.white",
          },
        },
        ...(isActive && {
          bgcolor: "primary.main",
          color: "primary.white",
          "& .MuiListItemIcon-root": {
            color: "primary.white",
          },
          "& .MuiListItemText-primary": {
            color: "primary.white",
          },
        }),
        ...sx,
      }}
    >
      {item.icon && (
        <ListItemIcon
          sx={{
            minWidth: 40,
            color: isActive ? "primary.contrastText" : "primary.main",
            transition: "color 0.2s ease-in-out",
          }}
        >
          <item.icon />
        </ListItemIcon>
      )}
      <ListItemText primary={trans(item.labelKey)} />
    </ListItem>
  );
};

