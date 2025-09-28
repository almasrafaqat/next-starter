"use client"

import { useMemo } from "react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { Tooltip } from "@mui/material"
import { NAVIGATION_GROUPS } from "@/config/siteLinks"
import { Link } from "@/i18n/routing"
import {
  NavContainer,
  NavList,
  NavItemLi,
  NavButton,
  IconBox,
  Label,
  BadgeChip
} from "./NavItems.styles"
import { useDrawer } from "@/hooks/useDrawer"


// Helpers
const stripLocale = (p) => (p || "").replace(/^\/[a-z]{2}(?=\/|$)/i, "")
const stripTrailingSlash = (p) => {
  const s = (p || "").replace(/\/+$/, "")
  return s.length ? s : "/"
}
const pathDepth = (p) => stripTrailingSlash(p).split("/").length

// Fallback matcher if getIsActive isn't provided:
// - "/" is exact only
// - shallow roots like "/customer" or "/admin" are exact only
// - deeper routes like "/customer/orders" are exact or startsWith (to cover detail pages)
const defaultIsActive = (routePath, rawPathname) => {
  if (!routePath) return false
  const pathname = stripLocale(rawPathname || "/")

  const current = stripTrailingSlash(pathname)
  const target = stripTrailingSlash(routePath)

  if (target === "/") return current === "/"

  const depth = pathDepth(target)
  if (depth > 2) {
    // e.g. "/customer/orders" -> active on "/customer/orders" and "/customer/orders/123"
    return current === target || current.startsWith(target + "/")
  }

  // shallow roots (e.g., "/customer", "/admin") must match exactly
  return current === target
}




const NavItems = ({ groupKey = "CUSTOMER", orientation = "horizontal", collapsed = false, className, getIsActive }) => {
  const trans = useTranslations("translations")
  const pathname = usePathname() || "/"

  const {  hideDrawer } = useDrawer();

  const routes = useMemo(() => {
    const group = NAVIGATION_GROUPS[groupKey] || []
    return group
  }, [groupKey])

   const handleNavigate = () => {
    hideDrawer()
  }

  if (!routes.length) {
    return null
  }

  return (
    <NavContainer className={className} role="navigation" aria-label={`${String(groupKey).toLowerCase()} navigation`}>
      <NavList $orientation={orientation}>
        {routes.map((route) => {
          const Icon = route.icon
          const active =
            typeof getIsActive === "function" ? getIsActive(route, pathname) : defaultIsActive(route.path, pathname)

          const content = (
            <NavButton
              key={route.path}
              component={Link}
              href={route.path}
              onClick={handleNavigate}
              aria-current={active ? "page" : undefined}
              $active={active}
              $orientation={orientation}
              $collapsed={collapsed}
              disabled={route.disabled}
            >
              <IconBox $active={active}>
                <Icon />
              </IconBox>

              {!collapsed && (
                <>
                  <Label $active={active} component="span">
                    {trans(route.labelKey)}
                  </Label>
                  {typeof route.badgeCount === "number" && route.badgeCount > 0 && (
                    <BadgeChip
                      label={route.badgeCount > 99 ? "99+" : route.badgeCount}
                      color={active ? "default" : "primary"}
                      variant={active ? "filled" : "outlined"}
                      size="small"
                      sx={{ ml: 0.5 }}
                    />
                  )}
                </>
              )}
            </NavButton>
          )

          return (
            <NavItemLi key={route.path}>
              {collapsed ? (
                <Tooltip title={trans(route.labelKey)} placement="bottom" arrow>
                  <span>{content}</span>
                </Tooltip>
              ) : (
                content
              )}
            </NavItemLi>
          )
        })}
      </NavList>
    </NavContainer>
  )
}

export default NavItems
