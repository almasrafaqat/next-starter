"use client";
import React, { createContext, useContext, useCallback, useMemo, useState } from "react";

const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
  // State structure mirrors your Redux slice
  const [tabsData, setTabsData] = useState({});
  const [activeTabs, setActiveTabs] = useState({});
  const [loading, setLoading] = useState({});
  const [disabled, setDisabled] = useState({});

  // --- Actions ---
  const setTabs = useCallback(({ id, tabs, activeTab = 0 }) => {
    setTabsData(prev => ({ ...prev, [id]: tabs }));
    setActiveTabs(prev => ({ ...prev, [id]: activeTab }));
    setLoading(prev => ({ ...prev, [id]: false }));
    setDisabled(prev => ({ ...prev, [id]: false }));
  }, []);

  const changeTab = useCallback(({ id, tabIndex }) => {
    setActiveTabs(prev => {
      if (tabsData[id] && tabIndex >= 0 && tabIndex < tabsData[id].length) {
        return { ...prev, [id]: tabIndex };
      }
      return prev;
    });
  }, [tabsData]);

  const addTab = useCallback(({ id, tab, makeActive = false }) => {
    setTabsData(prev => ({
      ...prev,
      [id]: prev[id] ? [...prev[id], tab] : [tab],
    }));
    setActiveTabs(prev => {
      if (makeActive && tabsData[id]) {
        return { ...prev, [id]: (tabsData[id].length) };
      }
      return prev;
    });
  }, [tabsData]);

  const removeTab = useCallback(({ id, tabIndex }) => {
    setTabsData(prev => {
      if (prev[id] && tabIndex >= 0 && tabIndex < prev[id].length) {
        const newTabs = [...prev[id]];
        newTabs.splice(tabIndex, 1);
        return { ...prev, [id]: newTabs };
      }
      return prev;
    });
    setActiveTabs(prev => {
      const currentActive = prev[id];
      const tabsLen = tabsData[id]?.length || 0;
      let newActive = currentActive;
      if (currentActive >= tabIndex && currentActive > 0) {
        newActive = currentActive - 1;
      } else if (currentActive >= tabsLen - 1) {
        newActive = Math.max(0, tabsLen - 2);
      }
      return { ...prev, [id]: newActive };
    });
  }, [tabsData]);

  const updateTab = useCallback(({ id, tabIndex, updates }) => {
    setTabsData(prev => {
      if (prev[id] && prev[id][tabIndex]) {
        const newTabs = [...prev[id]];
        newTabs[tabIndex] = { ...newTabs[tabIndex], ...updates };
        return { ...prev, [id]: newTabs };
      }
      return prev;
    });
  }, []);

  const setTabsLoading = useCallback(({ id, loading: isLoading }) => {
    setLoading(prev => ({ ...prev, [id]: isLoading }));
  }, []);

  const setTabsDisabled = useCallback(({ id, disabled: isDisabled }) => {
    setDisabled(prev => ({ ...prev, [id]: isDisabled }));
  }, []);

  const clearTabs = useCallback(({ id }) => {
    setTabsData(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setActiveTabs(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setLoading(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setDisabled(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }, []);

  const resetAllTabs = useCallback(() => {
    setTabsData({});
    setActiveTabs({});
    setLoading({});
    setDisabled({});
  }, []);

  // --- Presets ---
  const presets = useMemo(() => ({
    basic: (id, tabsConfig) => {
      const tabs = tabsConfig.map((config, index) => ({
        id: config.id || `tab-${index}`,
        label: config.label,
        content: config.content,
        icon: config.icon,
        disabled: config.disabled || false,
        closable: config.closable || false,
        ...config,
      }));
      setTabs({ id, tabs });
    },
    wizard: (id, steps, currentStep = 0) => {
      const tabs = steps.map((step, index) => ({
        id: step.id || `step-${index}`,
        label: step.label,
        content: step.content,
        icon: step.icon,
        completed: index < currentStep,
        current: index === currentStep,
        disabled: index > currentStep,
        type: "wizard",
        ...step,
      }));
      setTabs({ id, tabs, activeTab: currentStep });
    },
    navigation: (id, navItems, defaultActive = 0) => {
      const tabs = navItems.map((item, index) => ({
        id: item.id || `nav-${index}`,
        label: item.label,
        content: item.content,
        icon: item.icon,
        badge: item.badge,
        href: item.href,
        type: "navigation",
        ...item,
      }));
      setTabs({ id, tabs, activeTab: defaultActive });
    },
    settings: (id, sections) => {
      const tabs = sections.map((section, index) => ({
        id: section.id || `settings-${index}`,
        label: section.label,
        content: section.content,
        icon: section.icon,
        type: "settings",
        category: section.category,
        ...section,
      }));
      setTabs({ id, tabs });
    },
    dashboard: (id, widgets, layout = "horizontal") => {
      const tabs = widgets.map((widget, index) => ({
        id: widget.id || `widget-${index}`,
        label: widget.label,
        content: widget.content,
        icon: widget.icon,
        refreshable: widget.refreshable || false,
        type: "dashboard",
        layout,
        ...widget,
      }));
      setTabs({ id, tabs });
    },
  }), [setTabs]);

  // --- Utilities ---
  const getCurrentTab = useCallback((id) => {
    const tabs = tabsData[id] || [];
    const active = activeTabs[id] || 0;
    return tabs[active];
  }, [tabsData, activeTabs]);

  const getTabById = useCallback((id, tabId) => {
    return (tabsData[id] || []).find(tab => tab.id === tabId);
  }, [tabsData]);

  const getTabIndexById = useCallback((id, tabId) => {
    return (tabsData[id] || []).findIndex(tab => tab.id === tabId);
  }, [tabsData]);

  const hasTab = useCallback((id, tabId) => {
    return (tabsData[id] || []).some(tab => tab.id === tabId);
  }, [tabsData]);

  const getNextTabIndex = useCallback((id) => {
    const tabs = tabsData[id] || [];
    const active = activeTabs[id] || 0;
    return (active + 1) % tabs.length;
  }, [tabsData, activeTabs]);

  const getPrevTabIndex = useCallback((id) => {
    const tabs = tabsData[id] || [];
    const active = activeTabs[id] || 0;
    return (active - 1 + tabs.length) % tabs.length;
  }, [tabsData, activeTabs]);

  const nextTab = useCallback((id) => {
    changeTab({ id, tabIndex: getNextTabIndex(id) });
  }, [changeTab, getNextTabIndex]);

  const prevTab = useCallback((id) => {
    changeTab({ id, tabIndex: getPrevTabIndex(id) });
  }, [changeTab, getPrevTabIndex]);

  // --- Context value ---
  const value = useMemo(() => ({
    // State
    tabsData,
    activeTabs,
    loading,
    disabled,

    // Actions
    setTabs,
    changeTab,
    addTab,
    removeTab,
    updateTab,
    setTabsLoading,
    setTabsDisabled,
    clearTabs,
    resetAllTabs,

    // Presets
    presets,

    // Utilities
    getCurrentTab,
    getTabById,
    getTabIndexById,
    hasTab,
    getNextTabIndex,
    getPrevTabIndex,
    nextTab,
    prevTab,
  }), [
    tabsData, activeTabs, loading, disabled,
    setTabs, changeTab, addTab, removeTab, updateTab,
    setTabsLoading, setTabsDisabled, clearTabs, resetAllTabs,
    presets,
    getCurrentTab, getTabById, getTabIndexById, hasTab, getNextTabIndex, getPrevTabIndex, nextTab, prevTab
  ]);

  return (
    <TabsContext.Provider value={value}>
      {children}
    </TabsContext.Provider>
  );
};

// Custom hook to use tabs context
export const useTabsContext = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("useTabsContext must be used within a TabsProvider");
  return ctx;
};