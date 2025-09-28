"use client"

import { forwardRef, useMemo, useCallback } from "react"
import { Box, Typography, IconButton, CircularProgress, Fade, Collapse } from "@mui/material"
import {
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material"
import { useTabs } from "@/hooks/useTabs"
import {
  StyledTabsContainer,
  StyledTabs,
  StyledTab,
  StyledTabPanel,
  StyledTabContent,
  StyledCloseButton,
  StyledLoadingOverlay,
  StyledTabBadge,
  StyledTabChip,
} from "./ReusableTabs.styles"

const ReusableTabs = forwardRef(
  (
    {
      id,
      variant = "standard", // standard, scrollable, fullWidth
      orientation = "horizontal",
      size = "medium", // small, medium, large
      type = "default", // default, wizard, navigation, settings, dashboard
      elevation = 1,
      borderRadius,
      indicatorColor,
      activeColor,
      activeBg,
      headerBg,
      contentBg,
      contentPadding,
      minHeight,
      compact = false,
      mobileFullWidth = true,
      showNavigation = false,
      allowCloseTabs = false,
      animated = true,
      loading: externalLoading = false,
      disabled: externalDisabled = false,
      onTabChange,
      onTabClose,
      className,
      sx,
      ...props
    },
    ref,
  ) => {
    const {
      tabs,
      activeTab,
      activeTabIndex,
      currentTab,
      loading: internalLoading,
      disabled: internalDisabled,
      setActiveTab,
      removeTabByIndex,
    } = useTabs(id)

    const isLoading = externalLoading || internalLoading
    const isDisabled = externalDisabled || internalDisabled

    // Style props for styled components
    const styleProps = useMemo(
      () => ({
        variant,
        size,
        elevation,
        borderRadius,
        indicatorColor,
        activeColor,
        activeBg,
        headerBg,
        contentBg,
        contentPadding,
        minHeight,
        compact,
        mobileFullWidth,
        textTransform: type === "navigation" ? "uppercase" : "none",
        fontSize: size === "small" ? "0.8125rem" : size === "large" ? "0.9375rem" : "0.875rem",
        minTabWidth: size === "small" ? 80 : size === "large" ? 120 : 90,
        maxTabWidth: size === "small" ? 200 : size === "large" ? 400 : 300,
        tabSpacing: type === "wizard" ? 8 : 0,
        indicatorHeight: size === "small" ? 2 : size === "large" ? 4 : 3,
      }),
      [
        variant,
        size,
        elevation,
        borderRadius,
        indicatorColor,
        activeColor,
        activeBg,
        headerBg,
        contentBg,
        contentPadding,
        minHeight,
        compact,
        mobileFullWidth,
        type,
      ],
    )

    // Handle tab change
    const handleTabChange = useCallback(
      (event, newValue) => {
        if (isDisabled) return

        setActiveTab(newValue)
        onTabChange?.(newValue, tabs[newValue])
      },
      [isDisabled, setActiveTab, onTabChange, tabs],
    )

    // Handle tab close
    const handleTabClose = useCallback(
      (event, tabIndex) => {
        event.stopPropagation()

        const tabToClose = tabs[tabIndex]
        const shouldClose = onTabClose ? onTabClose(tabIndex, tabToClose) : true

        if (shouldClose !== false) {
          removeTabByIndex(tabIndex)
        }
      },
      [tabs, onTabClose, removeTabByIndex],
    )

    // Navigation handlers
    const handlePrevTab = useCallback(() => {
      const prevIndex = (activeTabIndex - 1 + tabs.length) % tabs.length
      setActiveTab(prevIndex)
    }, [activeTabIndex, tabs.length, setActiveTab])

    const handleNextTab = useCallback(() => {
      const nextIndex = (activeTabIndex + 1) % tabs.length
      setActiveTab(nextIndex)
    }, [activeTabIndex, tabs.length, setActiveTab])

    // Render tab content
    const renderTabContent = useCallback(
      (tab) => {
        return (
          <StyledTabContent>
            {tab.icon && (
              <Box className="tab-icon" component="span">
                {tab.icon}
              </Box>
            )}

            <Typography variant="inherit" className="tab-label" noWrap>
              {tab.label}
            </Typography>

            {tab.badge && <StyledTabBadge badgeContent={tab.badge} color="primary" className="tab-badge" />}

            {tab.chip && <StyledTabChip label={tab.chip} size="small" variant="outlined" className="tab-chip" />}

            {(allowCloseTabs || tab.closable) && tabs.length > 1 && (
              <StyledCloseButton
                size="small"
                onClick={(e) => handleTabClose(e, tabs.indexOf(tab))}
                disabled={isDisabled}
              >
                <CloseIcon fontSize="inherit" />
              </StyledCloseButton>
            )}
          </StyledTabContent>
        )
      },
      [allowCloseTabs, tabs, handleTabClose, isDisabled],
    )

    // Render tab panel
    const renderTabPanel = useCallback(
      (tab, index) => {
        const isActive = index === activeTabIndex

        if (!animated) {
          return isActive ? (
            <StyledTabPanel
              key={tab.id}
              styleProps={styleProps}
              role="tabpanel"
              id={`tabpanel-${id}-${index}`}
              aria-labelledby={`tab-${id}-${index}`}
            >
              {tab.content}
            </StyledTabPanel>
          ) : null
        }

        return (
          <Collapse key={tab.id} in={isActive} timeout={300}>
            <Fade in={isActive} timeout={200}>
              <StyledTabPanel
                styleProps={styleProps}
                role="tabpanel"
                id={`tabpanel-${id}-${index}`}
                aria-labelledby={`tab-${id}-${index}`}
              >
                {tab.content}
              </StyledTabPanel>
            </Fade>
          </Collapse>
        )
      },
      [activeTabIndex, animated, styleProps, id],
    )

    if (!tabs.length) {
      return (
        <StyledTabsContainer styleProps={styleProps} className={className} sx={sx}>
          <Box p={3} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              No tabs available
            </Typography>
          </Box>
        </StyledTabsContainer>
      )
    }

    return (
      <StyledTabsContainer ref={ref} styleProps={styleProps} className={className} sx={sx} {...props}>
        {/* Navigation buttons */}
        {showNavigation && tabs.length > 1 && (
          <Box display="flex" justifyContent="space-between" p={1}>
            <IconButton onClick={handlePrevTab} disabled={isDisabled} size="small">
              <ChevronLeftIcon />
            </IconButton>
            <IconButton onClick={handleNextTab} disabled={isDisabled} size="small">
              <ChevronRightIcon />
            </IconButton>
          </Box>
        )}

        {/* Tabs header */}
        <StyledTabs
          value={activeTabIndex}
          onChange={handleTabChange}
          variant={variant}
          orientation={orientation}
          styleProps={styleProps}
          disabled={isDisabled}
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {tabs.map((tab, index) => (
            <StyledTab
              key={tab.id}
              label={renderTabContent(tab)}
              styleProps={styleProps}
              tabType={type}
              disabled={isDisabled || tab.disabled}
              id={`tab-${id}-${index}`}
              aria-controls={`tabpanel-${id}-${index}`}
            />
          ))}
        </StyledTabs>

        {/* Tab content */}
        <Box position="relative">
          {tabs.map((tab, index) => renderTabPanel(tab, index))}

          {/* Loading overlay */}
          {isLoading && (
            <StyledLoadingOverlay>
              <CircularProgress size={40} />
            </StyledLoadingOverlay>
          )}
        </Box>
      </StyledTabsContainer>
    )
  },
)

ReusableTabs.displayName = "ReusableTabs"

export default ReusableTabs
