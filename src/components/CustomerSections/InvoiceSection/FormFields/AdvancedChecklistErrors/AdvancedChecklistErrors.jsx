import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Badge,
  Dialog,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { green, red } from "@mui/material/colors";
import React, { useState, useEffect } from "react";

export default function AdvancedChecklistErrors({
  checklist,
  errors,
  forceOpen,
  onClose,
}) {
  const [open, setOpen] = useState(forceOpen || false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setOpen(forceOpen);
  }, [forceOpen]);

  // Map errors for quick lookup
  const errorMap = {};
  errors.forEach((e) => {
    errorMap[e.field] = e.message;
  });

  const errorCount = checklist.filter((item) => !!errorMap[item.field]).length;

  // Show summary indicator
  return (
    <Box
      sx={{
        mb: 2,
        mt: 2,
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 1,
        bgcolor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Badge
          badgeContent={errorCount}
          color={errorCount ? "error" : "success"}
        >
          {errorCount ? (
            <ErrorIcon color="error" />
          ) : (
            <CheckCircleIcon color="success" />
          )}
        </Badge>
        <Typography variant="subtitle2" sx={{ ml: 1, flex: 1 }}>
          {errorCount
            ? `${errorCount} fields need attention`
            : "All required fields are valid"}
        </Typography>
        <IconButton onClick={() => setOpen(!open)} size="small">
          <ExpandMoreIcon
            sx={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </IconButton>
        {/* <IconButton
          onClick={() => {
            setOpen(false);
            if (onClose) onClose();
          }}
          size="small"
        >
          <CloseIcon />
        </IconButton> */}
      </Box>
      <Collapse in={open}>
        <Box sx={{ p: 2, bgcolor: "#fafafa", borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
            Required Fields Checklist
          </Typography>
          <List>
            {checklist.map((item, idx) => {
              const hasError = !!errorMap[item.field];
              return (
                <ListItem key={item.field} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    {hasError ? (
                      <ErrorIcon sx={{ color: red[500] }} />
                    ) : (
                      <CheckCircleIcon sx={{ color: green[500] }} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    secondary={hasError ? errorMap[item.field] : "Looks good!"}
                    primaryTypographyProps={{
                      color: hasError ? "error" : "success.main",
                      fontWeight: hasError ? 500 : 400,
                    }}
                    secondaryTypographyProps={{
                      color: hasError ? "error" : "success.main",
                      fontSize: 13,
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Collapse>
      {/* Dialog for popup on submit error */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" color="error" sx={{ mb: 2 }}>
            Please fix the following errors:
          </Typography>
          <List>
            {checklist.map((item, idx) => {
              const hasError = !!errorMap[item.field];
              return hasError ? (
                <ListItem key={item.field}>
                  <ListItemIcon>
                    <ErrorIcon sx={{ color: red[500] }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    secondary={errorMap[item.field]}
                    primaryTypographyProps={{ color: "error" }}
                    secondaryTypographyProps={{ color: "error", fontSize: 13 }}
                  />
                </ListItem>
              ) : null;
            })}
          </List>
          <Box sx={{ textAlign: "right", mt: 2 }}>
            <IconButton onClick={() => setDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
