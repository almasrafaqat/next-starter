import { Box } from "@mui/material";
import BulkActions from "@/components/BulkActions/BulkActions";
import HeadingTitle from "@/components/HeadingTitle/HeadingTitle";
import DisplayMessage from "@/components/DisplayMessage/DisplayMessage";
import { useBulkActions } from "@/hooks/useBulkActions";
import { useResponsiveDevice } from "@/hooks/useResponsiveDevice";
import React, { useEffect, useMemo, useState } from "react";
import {
  AccountCircle,
  Add,
  GradeSharp,
  PlaylistAddCheck,
} from "@mui/icons-material";

const DemoBulkActions = () => {
  const { isSmallScreen } = useResponsiveDevice();
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

  return (
    <Box>
      <HeadingTitle title="BulkActions Component" />
      <DisplayMessage
        type="info"
        title="BulkActions"
        description="Perform actions on multiple selected items. Use for mass updates, deletes, or status changes."
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
          flexWrap: "wrap",
          background: { xs: "none", md: "#f9f9f9" },
          p: { xs: 0, md: 2 },
          borderRadius: { xs: 0, md: 2 },
        }}
      >
        <BulkActions
          actions={bulkActions}
          onExecute={handleBulkExecute}
          size="medium"
          variant="outlined"
          disabled={selectedItems.length === 0 || processing}
        />
      </Box>
    </Box>
  );
};

export default DemoBulkActions;
