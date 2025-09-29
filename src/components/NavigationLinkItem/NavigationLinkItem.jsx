import { ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Collapse, ListItemButton } from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  StorefrontOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { NestedList, BranchListItem } from "./NestedList.styles";

function NodeRow({
  item,
  hasChildren,
  open,
  toggle,
  onClick,
  isActive,
  level,
}) {
  const trans = useTranslations("translations");
  const isParent = level === 0;

  return (
    <ListItemButton
      onClick={() => (hasChildren ? toggle() : onClick?.(item.path))}
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
      }}
    >
      {isParent && item.icon && (
        <ListItemIcon
          sx={{
            minWidth: 40,
            color: isActive ? "primary.contrastText" : "primary.main",
            transition: "color 0.2s",
          }}
        >
          <item.icon />
        </ListItemIcon>
      )}
      {!isParent && (
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: isActive ? "primary.main" : "grey.400",
            mr: 2,
            ml: 0.5,
            border: isActive ? "2px solid" : "2px solid transparent",
            borderColor: isActive ? "gold" : "transparent",
            transition: "all 0.2s",
          }}
        />
      )}
      <ListItemText
        primary={trans(item.labelKey)}
        primaryTypographyProps={{
          fontWeight: isActive ? 600 : 400,
          color:
            isParent && isActive
              ? "primary.contrastText"
              : isActive
              ? "primary.main"
              : isParent
              ? "primary.main"
              : "text.secondary",
        }}
      />
      {hasChildren ? (
        open ? (
          <ExpandLess
            sx={{
              color:
                isParent && isActive ? "primary.contrastText" : "primary.main",
            }}
          />
        ) : (
          <ExpandMore
            sx={{
              color:
                isParent && isActive ? "primary.contrastText" : "primary.main",
            }}
          />
        )
      ) : null}
    </ListItemButton>
  );
}

export const NavigationLinkItem = ({
  item,
  isActive = false,
  onNavigate,
  defaultOpen = true,
  sx = {},
  level = 0,
  showNested = true,
}) => {
  const router = useRouter();
  const trans = useTranslations("translations");

  const [open, setOpen] = useState(defaultOpen);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const handleClick = (e) => {
    // e.preventDefault();
    if (onNavigate) {
      onNavigate();
    }
    router.push(item.path);
  };

  const toggle = () => setOpen((prev) => !prev);


  return (
    <>
      {level === 0 ? (
        <ListItem disableGutters sx={{ borderRadius: 1, px: 0 }}>
          <NodeRow
            item={item}
            hasChildren={hasChildren}
            open={open}
            toggle={() => setOpen((p) => !p)}
            onClick={handleClick}
            isActive={isActive}
            level={level}
          />
        </ListItem>
      ) : (
        <BranchListItem disableGutters>
          <NodeRow
            item={item}
            hasChildren={hasChildren}
            open={open}
            toggle={() => setOpen((p) => !p)}
            onClick={handleClick}
            isActive={isActive}
            level={level}
          />
        </BranchListItem>
      )}

      {hasChildren && showNested && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <NestedList component="div" disablePadding>
            {item.children.map((child) => (
              <NavigationLinkItem
                key={trans(child.labelKey)}
                item={child}
                onNavigate={onNavigate}
                defaultOpen={defaultOpen}
                level={level + 1}
                isActive={child.path === router.pathname}
              />
            ))}
          </NestedList>
        </Collapse>
      )}
    </>
  );
};
