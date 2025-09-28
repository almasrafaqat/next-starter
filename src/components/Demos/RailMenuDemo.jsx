import {
  AccountCircle,
  Add,
  GradeSharp,
  PlaylistAddCheck,
} from "@mui/icons-material";
import { useBulkActions } from "@/hooks/useBulkActions";
import BulkActions from "@/components/BulkActions/BulkActions";
import NavigationRail from "@/components/NavigationRail/NavigationRail";
import { useResponsiveDevice } from "@/hooks/useResponsiveDevice";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import NavigationPills from "@/components/NavigationPills/NavigationPills";
import CustomTypography from "@/components/Typography/CustomTypography";
import { useDrawer } from "@/hooks/useDrawer";

const RailMenuDemo = () => {
  const {
    selectedItems,
    initializeActions,
    selectItems,
    addItem,
    removeItem,
    toggleItem,
    selectAll,
    clearAll,
    executeAction,
    processing,
  } = useBulkActions();
  const { showDrawer, hideDrawer } = useDrawer();

  const { isSmallScreen } = useResponsiveDevice();

  const bulkActions = useMemo(
    () => [
      {
        key: "delete",
        label: "Delete",
        iconName: "delete", // Use string name instead of React element
        confirmMessage: "Are you sure you want to delete selected items?",
      },
      {
        key: "activate",
        label: "Activate",
        iconName: "visibility",
      },
      {
        key: "deactivate",
        label: "Deactivate",
        iconName: "visibilityOff",
      },
    ],
    []
  );

  useEffect(() => {
    initializeActions(bulkActions);
  }, [initializeActions, bulkActions]);

    const handleBulkExecute = async (selectedIds, actionKey) => {
      console.log(`Executing ${actionKey} on items:`, selectedIds);
  
      // bulkAction(selectedIds, actionKey);
      // Your bulk action logic here
    };

  const handleBulkAction = () => {
    showDrawer(
      <BulkActions
        actions={bulkActions}
        onExecute={handleBulkExecute}
        size="large"
        variant="outlined"
        disabled={selectedItems.length === 0 || processing}
      />,
      `Bulk Actions (${selectedItems.length})`
    );
  };

   const AddPlan = () => {
      const itemsPills = [
        {
          key: "plan",
          label: "your plan",
          badge: 2,
          selected: true,
  
          component: () => <Box>Hey Plan Component</Box>,
        },
        {
          key: "profile",
          label: "your profile",
          badge: 2,
          selected: false,
  
          component: () => <Box>Hey Profile here</Box>,
        },
        {
          key: "setting",
          label: "your settings",
          badge: 2,
          selected: false,
  
          component: () => <Box>Hey Your settings goes here</Box>,
        },
      ];
  
      return (
        <Box>
          <NavigationPills items={itemsPills} isScrollable={false} />
          <CustomTypography>Add Plan</CustomTypography>
        </Box>
      );
    };

  const railItems = [
    {
      key: "add",
      label: "Add Plan",
      selected: true,
      component: AddPlan,

      icon: <Add />,
    },

    {
      key: "bulk-actions",
      label: "Bulk Actions",
      selected: false,
      badge: 3,
      // You can show a BulkActions panel/modal or just focus the BulkActions component
      action: () => {
        console.log("Bulk Actions clicked");
        handleBulkAction();
        // Optionally, scroll to or open the BulkActions panel
        // Or open a modal with BulkActions inside
      },
      icon: <PlaylistAddCheck />, // Or use a different icon
    },
  ];

  return (
    <NavigationRail title="Main Menu" items={railItems} isScrollable={false} />
  );
};

export default RailMenuDemo;
