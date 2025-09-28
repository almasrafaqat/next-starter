"use client";
import { useTabsContext } from "@/contexts/TabsContext";
import { useMemo } from "react";

export const useTabs = (id) => {
  const ctx = useTabsContext();

  // State for this tab group
  const tabsData = ctx.tabsData[id] || [];
  const activeTab = ctx.activeTabs[id] || 0;
  const loading = ctx.loading[id] || false;
  const disabled = ctx.disabled[id] || false;

  // Utilities for this tab group
  const utils = useMemo(
    () => ({
      getCurrentTab: () => tabsData[activeTab],
      getTabById: (tabId) => tabsData.find((tab) => tab.id === tabId),
      getTabIndexById: (tabId) => tabsData.findIndex((tab) => tab.id === tabId),
      hasTab: (tabId) => tabsData.some((tab) => tab.id === tabId),
      getNextTabIndex: () => (activeTab + 1) % tabsData.length,
      getPrevTabIndex: () =>
        (activeTab - 1 + tabsData.length) % tabsData.length,
      nextTab: () =>
        ctx.changeTab({ id, tabIndex: (activeTab + 1) % tabsData.length }),
      prevTab: () =>
        ctx.changeTab({
          id,
          tabIndex: (activeTab - 1 + tabsData.length) % tabsData.length,
        }),
    }),
    [tabsData, activeTab, ctx, id]
  );

  return {
    // State
    tabs: tabsData,
    activeTab,
    activeTabIndex: activeTab,
    currentTab: tabsData[activeTab],
    loading,
    disabled,

    // Actions
    setTabs: (payload) => ctx.setTabs({ id, ...payload }),
    changeTab: (tabIndex) => ctx.changeTab({ id, tabIndex }),
    addTab: (tab, makeActive = false) => ctx.addTab({ id, tab, makeActive }),
    removeTab: (tabIndex) => ctx.removeTab({ id, tabIndex }),
    updateTab: (tabIndex, updates) => ctx.updateTab({ id, tabIndex, updates }),
    setLoading: (isLoading) => ctx.setTabsLoading({ id, loading: isLoading }),
    setDisabled: (isDisabled) =>
      ctx.setTabsDisabled({ id, disabled: isDisabled }),
    clear: () => ctx.clearTabs({ id }),
    resetAll: ctx.resetAllTabs,

    setActiveTab: (tabIndex) => ctx.changeTab({ id, tabIndex }), // <-- alias
    updateTabByIndex: (tabIndex, updates) =>
      ctx.updateTab({ id, tabIndex, updates }), // <-- alias
    // Presets
    presets: {
      basic: (tabsConfig) => ctx.presets.basic(id, tabsConfig),
      wizard: (steps, currentStep = 0) =>
        ctx.presets.wizard(id, steps, currentStep),
      navigation: (navItems, defaultActive = 0) =>
        ctx.presets.navigation(id, navItems, defaultActive),
      settings: (sections) => ctx.presets.settings(id, sections),
      dashboard: (widgets, layout = "horizontal") =>
        ctx.presets.dashboard(id, widgets, layout),
    },

    // Utilities
    ...utils,
  };
};

export default useTabs;
