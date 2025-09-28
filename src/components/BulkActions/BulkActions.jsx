// src/components/BulkActions/BulkActions.jsx
"use client";

import { useState, useEffect, useRef } from 'react';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useBulkActions } from '@/hooks/useBulkActions';
import {
  Delete,
  Edit,
  Visibility,
  VisibilityOff,
  Archive,
  Unarchive,
  Star,
  StarBorder,
  // Add other icons you need
} from '@mui/icons-material';

// Icon mapping object
const iconMap = {
  'delete': Delete,
  'edit': Edit,
  'visibility': Visibility,
  'visibilityOff': VisibilityOff,
  'archive': Archive,
  'unarchive': Unarchive,
  'star': Star,
  'starBorder': StarBorder,
  // Add other mappings
};

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  [theme.breakpoints.down('sm')]: {
    minWidth: 100,
    '& .MuiSelect-select': {
      fontSize: '0.875rem',
      padding: theme.spacing(1, 1.5),
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  height: 40,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[300],
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  height: 40,
  textTransform: 'none',
  fontWeight: 500,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
    padding: theme.spacing(1, 2),
  },
}));

const BulkActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
    flexWrap: 'wrap',
  },
}));

export default function BulkActions({
  actions = [],
  onExecute,
  disabled = false,
  size = 'medium',
  variant = 'outlined',
}) {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedAction, setSelectedAction] = useState('');

  // Add a ref to track if actions have been initialized
  const actionsInitializedRef = useRef(false);
  const {
    selectedItems,
    availableActions,
    isProcessing,
    initializeActions,
    executeAction,
  } = useBulkActions();

  // Fix: Only initialize actions once or when actions array changes significantly
  useEffect(() => {
    // Skip if no actions or already initialized with same length
    if (actions.length === 0 ||
      (actionsInitializedRef.current && actions.length === availableActions.length)) {
      return;
    }

    // Convert actions to serializable format
    const serializableActions = actions.map(action => ({
      key: action.key,
      label: action.label,
      iconName: action.iconName || getIconNameFromKey(action.key),
      disabled: action.disabled,
      confirmMessage: action.confirmMessage,
    }));

    initializeActions(serializableActions);
    actionsInitializedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions.length]); // Only depend on actions.length, not the entire actions array

  // Helper function to get icon name from action key
  const getIconNameFromKey = (key) => {
    switch (key) {
      case 'delete': return 'delete';
      case 'activate': return 'visibility';
      case 'deactivate': return 'visibilityOff';
      case 'edit': return 'edit';
      default: return null;
    }
  };

  // Function to render icon from name
  const renderIcon = (iconName) => {
    if (!iconName) return null;

    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent fontSize="small" /> : null;
  };

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  const handleApply = async () => {
    if (!selectedAction || selectedItems.length === 0) return;

    await executeAction(selectedAction, onExecute);
    setSelectedAction('');
  };

  const isDisabled = disabled || selectedItems.length === 0 || !selectedAction || isProcessing;
  return (
    <BulkActionsContainer
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        gap: { xs: 2, sm: 2 },
        // background: (theme) => theme.palette.background.alternate,
        borderRadius: 3,
        boxShadow: 0,
      }}
    >
      <StyledFormControl size="small" sx={{ minWidth: 140 }}>
        <StyledSelect
          value={selectedAction}
          onChange={handleActionChange}
          displayEmpty
          variant={variant}
          fullWidth
        >
          <MenuItem value="" disabled>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Bulk actions
            </Typography>
          </MenuItem>
          {availableActions.map((action) => (
            <MenuItem
              key={action.key}
              value={action.key}
              disabled={action.disabled}
            >
              <Box display="flex" alignItems="center" gap={1}>
                {action.iconName && (
                  <Box sx={{
                    color: action.key === "delete"
                      ? (theme) => theme.palette.error.main
                      : (theme) => theme.palette.primary.main
                  }}>
                    {renderIcon(action.iconName)}
                  </Box>
                )}
                <Typography variant="body2">
                  {action.label}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>

      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleApply}
        disabled={isDisabled}
        size="large"
        sx={{
          minWidth: 100,
          background: (theme) => theme.palette.primary.gradientBg,
          color: (theme) => theme.palette.primary.contrastText,
          '&:hover': {
            background: (theme) => theme.palette.primary.gradientBgHover,
          },
        }}
        startIcon={isProcessing ? <CircularProgress size={16} /> : null}
      >
        {isProcessing ? 'Processing...' : 'Apply'}
      </StyledButton>

      {selectedItems.length > 0 && (
        <Chip
          label={`${selectedItems.length} item${selectedItems.length !== 1 ? 's' : ''} selected`}
          color="primary"
          variant="filled"
          sx={{
            ml: { xs: 0, sm: 2 },
            mt: { xs: 1, sm: 0 },
            fontWeight: 500,
            fontSize: "1rem",
            background: (theme) => theme.palette.primary.light,
            color: (theme) => theme.palette.primary.contrastText,
            boxShadow: 1,
            letterSpacing: 0.2,
          }}
        />
      )}
    </BulkActionsContainer>
  );
}