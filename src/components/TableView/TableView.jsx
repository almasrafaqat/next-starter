"use client";

import { Checkbox } from "@/components/ui/Checkbox/Checkbox";

import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Typography,
  Alert,
  Card,
  CardContent,
  CardActions,
  Divider,
  useMediaQuery,
  useTheme,
  Collapse,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Badge,
  Stack,
  Switch,
  FormControlLabel,
  Skeleton,
  Grid,
} from "@mui/material";

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  InsertDriveFile as InsertDriveFileIcon,
  VideoFile as VideoFileIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import ImageSkeleton from "../ImageSkeleton/ImageSkeleton";
import { dayDifferenceDate } from "@/utils/dateFormatter";

/**
 * Enhanced data table component with mobile-first approach
 * @param {Object} props
 * @param {Array} props.data - Array of data to display
 * @param {Array} props.columns - Array of column definitions
 * @param {string} props.idField - Field to use as unique ID
 * @param {boolean} props.loading - Whether data is loading
 * @param {string} props.error - Error message if any
 * @param {Object} props.actions - Object with action handlers
 * @param {string} props.emptyMessage - Message to display when no data
 * @param {boolean} props.pagination - Whether to show pagination
 * @param {string} props.title - Table title
 * @param {Function} props.onRefresh - Refresh callback
 * @param {Function} props.onAdd - Add new item callback
 * @param {boolean} props.selectable - Whether rows are selectable
 * @param {Function} props.onSelectionChange - Selection change callback
 * @param {boolean} props.searchable - Whether to show search field
 * @param {Function} props.onSearch - Search callback
 * @param {boolean} props.filterable - Whether to show filter options
 * @param {Array} props.filterOptions - Filter options
 * @param {Function} props.onFilterChange - Filter change callback
 * @param {boolean} props.exportable - Whether to show export button
 * @param {Function} props.onExport - Export callback
 * @param {boolean} props.expandable - Whether rows are expandable
 * @param {Function} props.renderExpandedRow - Function to render expanded row content
 */
export function TableView({
  data = [],
  columns = [],
  idField = "id",
  loading = false,
  error = null,
  actions = {},
  emptyMessage = "No data available",
  pagination = true,
  title = "",
  onRefresh = null,
  onAdd = null,
  selectable = true,
  onSelectionChange = null,
  searchable = true,
  onSearch = null,
  filterable = true,
  filterOptions = [],
  onFilterChange = null,
  exportable = true,
  onExport = null,
  expandable = true,
  renderExpandedRow = null,
  headerContent = null, // <-- for tabs or extra controls
  customRowActions = [], // <-- array of {icon, label, onClick}
  bulkActions = [], // <-- array of {icon, label, onClick}
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  // Local state for image loading
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // View mode (table or card)
  const [viewMode, setViewMode] = useState(isMobile ? "card" : "table");

  // Sorting state
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(columns[0]?.field || "");

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Filter state
  const [activeFilters, setActiveFilters] = useState({});
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);

  // Selection state
  const [selected, setSelected] = useState([]);

  // Expanded rows state
  const [expandedRows, setExpandedRows] = useState({});

  // Actions menu state
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [actionRow, setActionRow] = useState(null);

  // Update view mode when screen size changes
  useEffect(() => {
    setViewMode(isMobile ? "card" : "table");
  }, [isMobile]);

  // Handle sort request
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle search
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setPage(0);

    if (onSearch) {
      onSearch(value);
    }
  };

  // Handle filter menu open
  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  // Handle filter menu close
  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  // Handle filter change
  // const handleFilterChange = (filter, value) => {
  //   const newFilters = { ...activeFilters };

  //   if (value === null || value === undefined || value === "") {
  //     delete newFilters[filter];
  //   } else {
  //     newFilters[filter] = value;
  //   }

  //   setActiveFilters(newFilters);
  //   setPage(0);

  //   if (onFilterChange) {
  //     onFilterChange(newFilters);
  //   }
  // };

  const handleFilterChange = (filter, value) => {
    const column = columns.find((col) => col.field === filter);
    const isMultiSelect = column && column.filterType === "multi-select";
    const newFilters = { ...activeFilters };

    if (
      value === null ||
      value === undefined ||
      (isMultiSelect ? value.length === 0 : value === "")
    ) {
      delete newFilters[filter];
    } else {
      newFilters[filter] = value;
    }

    setActiveFilters(newFilters);
    setPage(0);

    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  // Handle row selection
  const handleSelectRow = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((item) => item !== id);
    }

    setSelected(newSelected);

    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  };

  // Handle select all
  // const handleSelectAll = (event) => {
  //   if (event.target.checked) {
  //     const newSelected = filteredData.map((row) => row[idField]);
  //     setSelected(newSelected);
  //     if (onSelectionChange) {
  //       onSelectionChange(newSelected);
  //     }
  //   } else {
  //     setSelected([]);
  //     if (onSelectionChange) {
  //       onSelectionChange([]);
  //     }
  //   }
  // };

  const handleSelectAll = (event) => {
    const pageIds = paginatedData.map((row) => row[idField]);
    if (event.target.checked) {
      // Add all page IDs that aren't already selected
      const newSelected = Array.from(new Set([...selected, ...pageIds]));
      setSelected(newSelected);
      if (onSelectionChange) onSelectionChange(newSelected);
    } else {
      // Remove only the page IDs from selected
      const newSelected = selected.filter((id) => !pageIds.includes(id));
      setSelected(newSelected);
      if (onSelectionChange) onSelectionChange(newSelected);
    }
  };

  // Handle row expansion
  const handleExpandRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle action menu open
  const handleActionMenuOpen = (event, row) => {
    event.stopPropagation();
    setActionMenuAnchor(event.currentTarget);
    setActionRow(row);
  };

  // Handle action menu close
  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setActionRow(null);
  };

  // Handle action
  const handleAction = (actionType) => {
    if (actionRow && actions[actionType]) {
      actions[actionType](actionRow);
    }
    handleActionMenuClose();
  };

  // Sort function
  const sortData = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  // Filter data based on search term and active filters
  const filterData = (data) => {
    return data.filter((row) => {
      // Search filter
      if (searchTerm) {
        const searchFields = columns
          .filter((col) => col.searchable !== false)
          .map((col) => col.field);
        const matchesSearch = searchFields.some((field) => {
          const value = row[field];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });

        if (!matchesSearch) return false;
      }

      // Active filters
      for (const [filter, value] of Object.entries(activeFilters)) {
        const column = columns.find((col) => col.field === filter);
        if (!column) continue;

        const rowValue = row[filter];

        // Use custom filterFn if provided
        if (typeof column.filterFn === "function") {
          if (!column.filterFn(rowValue, value, row)) return false;
          continue;
        }

        // Handle different filter types
        if (column.filterType === "boolean") {
          if (value === "true" && !rowValue) return false;
          if (value === "false" && rowValue) return false;
        } else if (column.filterType === "select") {
          if (rowValue !== value) return false;
        } else {
          // Default string comparison
          if (
            !String(rowValue)
              .toLowerCase()
              .includes(String(value).toLowerCase())
          )
            return false;
        }
      }

      return true;
    });
  };

  const renderCellContent = (column, row) => {
    const value = row[column.field];

    switch (column.type) {
      case "thumbnail":
        return (
          <ImageSkeleton
            src={value}
            alt={row.name || "Image"}
            width={60}
            height={60}
            className="rounded object-cover"
            priority
          />
        );

      case "image":
        return (
          <ImageSkeleton
            src={value}
            alt={row.name || "Image"}
            width={60}
            height={60}
            className="rounded object-cover"
          />
        );

      case "external":
        return Array.isArray(value) && value.length > 0 ? (
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {value.map((url, idx) => (
              <Box
                key={idx}
                component="img"
                src={url}
                alt={row.name}
                sx={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  borderBottom: "1px solid #eee",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  display: "block",
                }}
              />
            ))}
          </Box>
        ) : null;

      case "gallery":
        return Array.isArray(value) && value.length > 0 ? (
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {value.slice(0, 3).map((img, idx) => (
              <ImageSkeleton
                key={idx}
                src={img}
                alt={`Gallery ${idx + 1}`}
                width={32}
                height={32}
                className="rounded object-cover"
              />
            ))}
          </Box>
        ) : null;

      case "video":
        return value ? (
          <video width={80} height={48} controls style={{ borderRadius: 4 }}>
            <source src={value} />
            Your browser does not support the video tag.
          </video>
        ) : null;

      case "youtube":
        return Array.isArray(value) && value.length > 0 ? (
          <Box>
            {value.map((url, idx) => (
              <Box key={idx} sx={{ mb: 0.5 }}>
                <iframe
                  width="80"
                  height="48"
                  src={url.replace("watch?v=", "embed/")}
                  title={`YouTube video ${idx + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
            ))}
          </Box>
        ) : null;

      case "boolean":
        return value ? (
          <Chip
            icon={<StarIcon fontSize="small" />}
            label="Yes"
            size="small"
            color="primary"
            variant="outlined"
          />
        ) : (
          <Chip
            icon={<StarBorderIcon fontSize="small" />}
            label="No"
            size="small"
            color="default"
            variant="outlined"
          />
        );
      case "date":
        return value ? new Date(value).toLocaleDateString() : "";
      case "datetime":
        return value ? dayDifferenceDate(value) : "";
      // return value ? new Date(value).toLocaleString() : ""
      case "chip":
        return value ? (
          <Chip
            label={column.valueFormatter ? column.valueFormatter(value) : value}
            color={column.chipColor ? column.chipColor(value) : "default"}
            size="small"
            sx={{
              fontWeight: 500,
              borderRadius: "16px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              "& .MuiChip-label": { px: 1.5 },
            }}
          />
        ) : (
          ""
        );

      default:
        return column.valueFormatter
          ? column.valueFormatter(value, row)
          : value;
    }
  };

  // Render card view for mobile
  const renderCardView = (row) => {
    const isExpanded = expandedRows[row[idField]];
    const isSelected = selected.indexOf(row[idField]) !== -1;

    // Get primary and secondary fields for card display
    const primaryField = columns.find((col) => col.primary) || columns[0];
    const secondaryFields = columns.filter(
      (col) => col.secondary && col.field !== primaryField.field
    );

    // Get remaining fields for expanded view
    const expandedFields = columns.filter(
      (col) =>
        !col.primary &&
        !col.secondary &&
        col.field !== primaryField.field &&
        col.field !== "actions"
    );

    return (
      <Card
        key={row[idField]}
        sx={{
          mb: 2,
          position: "relative",
          overflow: "visible",
          transition: "all 0.2s ease",
          boxShadow: isExpanded
            ? "0 8px 24px rgba(0,0,0,0.12)"
            : "0 2px 8px rgba(0,0,0,0.08)",
          "&:hover": {
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
          },
          borderRadius: 2,
        }}
      >
        {/* Bulk selection checkbox */}
        {selectable && (
          <Checkbox
            checked={isSelected}
            onChange={() => handleSelectRow(row[idField])}
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              zIndex: 2,
              background: "rgba(255,255,255,0.8)",
              borderRadius: "50%",
            }}
          />
        )}
        {/* Thumbnail as cover */}
        {row.thumbnail && (
          <Box
            component="img"
            src={row.thumbnail}
            alt={row.name}
            sx={{
              width: "100%",
              height: 160,
              objectFit: "cover",
              borderBottom: "1px solid #eee",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              display: "block",
            }}
          />
        )}
        <CardContent sx={{ pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              {renderCellContent(primaryField, row)}
            </Typography>

            <IconButton
              size="small"
              onClick={(e) => handleActionMenuOpen(e, row)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>

          <Stack spacing={1} sx={{ mt: 2 }}>
            {secondaryFields.map((column) => (
              <Box
                key={column.field}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ minWidth: 100, fontWeight: 500 }}
                >
                  {column.headerName}:
                </Typography>
                <Box sx={{ ml: 1 }}>{renderCellContent(column, row)}</Box>
              </Box>
            ))}
          </Stack>

          {expandable && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  mt: 2,
                  pt: 2,
                  borderTop: `1px solid ${theme.palette.divider}`,
                }}
              >
                {renderExpandedRow ? (
                  renderExpandedRow(row)
                ) : (
                  <Stack spacing={1.5}>
                    {expandedFields.map((column) => (
                      <Box
                        key={column.field}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ minWidth: 120, fontWeight: 500 }}
                        >
                          {column.headerName}:
                        </Typography>
                        <Box sx={{ ml: 1 }}>
                          {renderCellContent(column, row)}
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Box>
            </Collapse>
          )}
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", px: 2, py: 1 }}>
          <Box>
            {actions.onView && (
              <Tooltip title="View">
                <IconButton
                  size="small"
                  onClick={() => actions.onView(row)}
                  color="info"
                >
                  <ViewIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {actions.onEdit && (
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={() => actions.onEdit(row)}
                  color="primary"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {actions.onDelete && (
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={() => actions.onDelete(row)}
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          {expandable && (
            <Button
              size="small"
              onClick={() => handleExpandRow(row[idField])}
              endIcon={
                isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
              }
              sx={{ textTransform: "none" }}
            >
              {isExpanded ? "Less" : "More"}
            </Button>
          )}
        </CardActions>
      </Card>
    );
  };

  // Filter and sort data
  const filteredData = filterData(data);
  const sortedData = sortData(filteredData, getComparator(order, orderBy));
  const paginatedData = pagination
    ? sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : sortedData;

  // Show loading state
  if (loading) {
    return (
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {title && (
          <Box
            sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}
          >
            <Typography variant="h6">{title}</Typography>
          </Box>
        )}

        <Box sx={{ p: 3 }}>
          {isMobile ? (
            <Stack spacing={2}>
              {[1, 2, 3].map((i) => (
                <Card key={i} sx={{ mb: 2 }}>
                  <CardContent>
                    <Skeleton variant="text" width="60%" height={32} />
                    <Skeleton
                      variant="text"
                      width="40%"
                      height={20}
                      sx={{ mt: 1 }}
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={20}
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <CardActions>
                    <Skeleton variant="rectangular" width={120} height={30} />
                  </CardActions>
                </Card>
              ))}
            </Stack>
          ) : (
            <>
              <Skeleton variant="rectangular" width="100%" height={52} />
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width="100%"
                  height={52}
                  sx={{ mt: 1 }}
                />
              ))}
            </>
          )}
        </Box>
      </Paper>
    );
  }

  // Show error state
  if (error) {
    return (
      <Alert
        severity="error"
        sx={{
          mb: 3,
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {error}
      </Alert>
    );
  }

  // Show empty state
  if (!loading && filteredData.length === 0) {
    return (
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.divider}`,
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {title && (
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  fontWeight: 600,
                }}
              >
                {title}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {searchable && (
              <TextField
                placeholder="Search..."
                size="small"
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "24px",
                    backgroundColor: theme.palette.background.default,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.divider,
                    },
                  },
                }}
                sx={{
                  width: { xs: "100%", sm: 220 },
                  mb: { xs: 1, sm: 0 },
                }}
              />
            )}
          </Box>
        </Box>

        {/* Always show active filters and Clear All, even if no data */}
        {Object.keys(activeFilters).length > 0 && (
          <Box
            sx={{
              px: 2,
              py: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              backgroundColor: theme.palette.background.default,
            }}
          >
            {Object.entries(activeFilters).map(([field, value]) => {
              const column = columns.find((col) => col.field === field);
              if (!column) return null;
              let displayValue = value;
              if (column.filterType === "boolean") {
                displayValue = value === "true" ? "Yes" : "No";
              } else if (
                (column.filterType === "select" ||
                  column.filterType === "multi-select") &&
                column.filterOptions
              ) {
                if (Array.isArray(value)) {
                  displayValue = value
                    .map((val) => {
                      const opt = column.filterOptions.find(
                        (opt) => String(opt.value) === String(val)
                      );
                      return opt ? opt.label : val;
                    })
                    .join(", ");
                } else {
                  const option = column.filterOptions.find(
                    (opt) => String(opt.value) === String(value)
                  );
                  if (option) displayValue = option.label;
                }
              }
              return (
                <Chip
                  key={field}
                  label={`${column.headerName}: ${displayValue}`}
                  onDelete={() => handleFilterChange(field, "")}
                  size="small"
                  sx={{
                    borderRadius: "16px",
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
              );
            })}

            <Button
              size="small"
              onClick={() => {
                setActiveFilters({});
                if (onFilterChange) onFilterChange({});
                handleFilterMenuClose(); // <-- Close the filter menu after clearing
              }}
              sx={{ ml: 1, textTransform: "none" }}
            >
              Clear All
            </Button>
          </Box>
        )}

        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {emptyMessage}
          </Typography>
          {onAdd && (
            <Button
              variant
              startIcon={<AddIcon />}
              onClick={onAdd}
              sx={{
                mt: 2,
                borderRadius: "24px",
                px: 3,
              }}
            >
              Add New
            </Button>
          )}
        </Box>
      </Paper>
    );
  }

  // Bulk actions bar
  const showBulkActions = selected.length > 0 && bulkActions.length > 0;

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header area: title, tabs, search, actions */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {title && (
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          )}
          {headerContent}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 1,
          }}
        >
          {searchable && (
            <TextField
              placeholder="Search..."
              size="small"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "24px",
                  backgroundColor: theme.palette.background.default,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.divider,
                  },
                },
              }}
              sx={{
                width: { xs: "100%", sm: 220 },
                mb: { xs: 1, sm: 0 },
              }}
            />
          )}

          <Box sx={{ display: "flex", gap: 1 }}>
            {filterable && (
              <>
                <Tooltip title="Filter">
                  <Badge
                    badgeContent={Object.keys(activeFilters).length}
                    color="primary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={handleFilterMenuOpen}
                      sx={{
                        backgroundColor: theme.palette.background.default,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: "50%",
                      }}
                    >
                      <FilterIcon fontSize="small" />
                    </IconButton>
                  </Badge>
                </Tooltip>

                <Menu
                  anchorEl={filterMenuAnchor}
                  open={Boolean(filterMenuAnchor)}
                  onClose={handleFilterMenuClose}
                  TransitionComponent={Fade}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      minWidth: 200,
                      maxWidth: 320,
                      mt: 1,
                      p: 1,
                      borderRadius: 2,
                    },
                  }}
                >
                  <Typography variant="subtitle2" sx={{ px: 2, py: 1 }}>
                    Filters
                  </Typography>
                  <Divider sx={{ mb: 1 }} />

                  {columns
                    .filter((col) => col.filterable !== false)
                    .map((column) => (
                      <MenuItem
                        key={column.field}
                        sx={{
                          flexDirection: "column",
                          alignItems: "flex-start",
                          p: 2,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ mb: 1, fontWeight: 500 }}
                        >
                          {column.headerName}
                        </Typography>

                        {column.filterType === "date-range" ? (
                          <Box sx={{ width: "100%" }}>
                            <Grid container spacing={1}>
                              <Grid item xs={6}>
                                <TextField
                                  type="date"
                                  size="small"
                                  fullWidth
                                  label="From"
                                  value={
                                    activeFilters[column.field]?.start || ""
                                  }
                                  onChange={(e) =>
                                    handleFilterChange(column.field, {
                                      ...activeFilters[column.field],
                                      start: e.target.value,
                                    })
                                  }
                                  InputLabelProps={{ shrink: true }}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  type="date"
                                  size="small"
                                  fullWidth
                                  label="To"
                                  value={activeFilters[column.field]?.end || ""}
                                  onChange={(e) =>
                                    handleFilterChange(column.field, {
                                      ...activeFilters[column.field],
                                      end: e.target.value,
                                    })
                                  }
                                  InputLabelProps={{ shrink: true }}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        ) : column.filterType === "boolean" ? (
                          <FormControlLabel
                            control={
                              <Switch
                                checked={activeFilters[column.field] === "true"}
                                onChange={(e) =>
                                  handleFilterChange(
                                    column.field,
                                    e.target.checked ? "true" : ""
                                  )
                                }
                                size="small"
                              />
                            }
                            label="Yes"
                          />
                        ) : column.filterType === "multi-select" &&
                          column.filterOptions ? (
                          <TextField
                            select
                            fullWidth
                            size="small"
                            SelectProps={{ multiple: true }}
                            value={activeFilters[column.field] || []}
                            onChange={(e) =>
                              handleFilterChange(column.field, e.target.value)
                            }
                            renderValue={(selected) =>
                              Array.isArray(selected)
                                ? selected
                                    .map(
                                      (val) =>
                                        column.filterOptions.find(
                                          (opt) => opt.value === val
                                        )?.label || val
                                    )
                                    .join(", ")
                                : ""
                            }
                          >
                            {column.filterOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                <Checkbox
                                  checked={
                                    Array.isArray(
                                      activeFilters[column.field]
                                    ) &&
                                    activeFilters[column.field].includes(
                                      option.value
                                    )
                                  }
                                />
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : column.filterType === "select" &&
                          column.filterOptions ? (
                          <TextField
                            select
                            fullWidth
                            size="small"
                            value={activeFilters[column.field] || ""}
                            onChange={(e) =>
                              handleFilterChange(column.field, e.target.value)
                            }
                          >
                            <MenuItem value="">All</MenuItem>
                            {column.filterOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : (
                          <TextField
                            fullWidth
                            size="small"
                            placeholder={`Filter by ${column.headerName.toLowerCase()}`}
                            value={activeFilters[column.field] || ""}
                            onChange={(e) =>
                              handleFilterChange(column.field, e.target.value)
                            }
                          />
                        )}
                      </MenuItem>
                    ))}

                  {Object.keys(activeFilters).length > 0 && (
                    <Box
                      sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}
                    >
                      <Button
                        size="small"
                        onClick={() => {
                          setActiveFilters({});
                          if (onFilterChange) onFilterChange({});
                        }}
                      >
                        Clear All
                      </Button>
                    </Box>
                  )}
                </Menu>
              </>
            )}

            {!isMobile && (
              <Tooltip
                title={viewMode === "table" ? "Card View" : "Table View"}
              >
                <IconButton
                  size="small"
                  onClick={() =>
                    setViewMode(viewMode === "table" ? "card" : "table")
                  }
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "50%",
                  }}
                >
                  {viewMode === "table" ? (
                    <ViewModuleIcon fontSize="small" />
                  ) : (
                    <ViewListIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            )}

            {onRefresh && (
              <Tooltip title="Refresh">
                <IconButton
                  size="small"
                  onClick={onRefresh}
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "50%",
                  }}
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            {exportable && onExport && (
              <Tooltip title="Export">
                <IconButton
                  size="small"
                  onClick={onExport}
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "50%",
                  }}
                >
                  <DownloadIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            {onAdd && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAdd}
                sx={{
                  borderRadius: "24px",
                  px: { xs: 2, sm: 3 },
                  ml: { xs: 0, sm: 1 },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                {isMobile ? "Add" : "Add New"}
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Active filters display */}
      {Object.keys(activeFilters).length > 0 && (
        <Box
          sx={{
            px: 2,
            py: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            backgroundColor: theme.palette.background.default,
          }}
        >
          {Object.entries(activeFilters).map(([field, value]) => {
            const column = columns.find((col) => col.field === field);
            if (!column) return null;

            let displayValue = value;
            if (column.filterType === "boolean") {
              displayValue = value === "true" ? "Yes" : "No";
            } else if (column.filterType === "date-range" && value) {
              let label = "";
              if (value.start) label += `From: ${value.start} `;
              if (value.end) label += `To: ${value.end}`;
              displayValue = label.trim();
            } else if (
              (column.filterType === "select" ||
                column.filterType === "multi-select") &&
              column.filterOptions
            ) {
              if (Array.isArray(value)) {
                displayValue = value
                  .map(
                    (val) =>
                      column.filterOptions.find((opt) => opt.value === val)
                        ?.label || val
                  )
                  .join(", ");
              } else {
                const option = column.filterOptions.find(
                  (opt) => opt.value === value
                );
                if (option) displayValue = option.label;
              }
            }

            return (
              <Chip
                key={field}
                label={`${column.headerName}: ${displayValue}`}
                onDelete={() => handleFilterChange(field, "")}
                size="small"
                sx={{
                  borderRadius: "16px",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
            );
          })}

          <Button
            size="small"
            onClick={() => {
              setActiveFilters({});
              if (onFilterChange) onFilterChange({});
            }}
            sx={{ ml: 1, textTransform: "none" }}
          >
            Clear All
          </Button>
        </Box>
      )}

      {/* Table or Card view based on viewMode */}
      {viewMode === "table" ? (
        <TableContainer>
          <Table stickyHeader aria-label="data table">
            <TableHead>
              <TableRow>
                {selectable && (
                  <TableCell padding="checkbox">
                    {(() => {
                      const selectedOnPage = paginatedData.filter((row) =>
                        selected.includes(row[idField])
                      );
                      return (
                        <Checkbox
                          indeterminate={
                            selectedOnPage.length > 0 &&
                            selectedOnPage.length < paginatedData.length
                          }
                          checked={
                            paginatedData.length > 0 &&
                            selectedOnPage.length === paginatedData.length
                          }
                          onChange={handleSelectAll}
                        />
                      );
                    })()}
                  </TableCell>
                )}

                {expandable && <TableCell padding="checkbox" />}

                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.align || "left"}
                    style={{
                      minWidth: column.minWidth,
                      width: column.width,
                      whiteSpace: "nowrap",
                      fontWeight: 600,
                    }}
                    sortDirection={orderBy === column.field ? order : false}
                  >
                    {column.sortable !== false ? (
                      <TableSortLabel
                        active={orderBy === column.field}
                        direction={orderBy === column.field ? order : "asc"}
                        onClick={() => handleRequestSort(column.field)}
                      >
                        {column.headerName}
                      </TableSortLabel>
                    ) : (
                      column.headerName
                    )}
                  </TableCell>
                ))}

                {(actions.onView || actions.onEdit || actions.onDelete) && (
                  <TableCell
                    align="right"
                    style={{
                      minWidth: 120,
                      fontWeight: 600,
                    }}
                  >
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => {
                const isItemSelected = selected.indexOf(row[idField]) !== -1;
                const isRowExpanded = expandedRows[row[idField]];

                return (
                  <React.Fragment key={row[idField]}>
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row[idField]}
                      selected={isItemSelected}
                      sx={{
                        cursor: selectable ? "pointer" : "default",
                        "&.Mui-selected": {
                          backgroundColor: `${theme.palette.primary.light}20`,
                        },
                      }}
                      onClick={() =>
                        selectable && handleSelectRow(row[idField])
                      }
                    >
                      {selectable && (
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} />
                        </TableCell>
                      )}

                      {expandable && (
                        <TableCell padding="checkbox">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExpandRow(row[idField]);
                            }}
                          >
                            {isRowExpanded ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                      )}

                      {columns.map((column) => (
                        <TableCell
                          key={column.field}
                          align={column.align || "left"}
                        >
                          {renderCellContent(column, row)}
                        </TableCell>
                      ))}

                      {(actions.onView ||
                        actions.onEdit ||
                        actions.onDelete) && (
                        <TableCell align="right">
                          <Box
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                          >
                            {actions.onView && (
                              <Tooltip title="View">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    actions.onView(row);
                                  }}
                                  color="info"
                                  sx={{
                                    mx: 0.5,
                                    "&:hover": {
                                      backgroundColor: `${theme.palette.info.light}20`,
                                    },
                                  }}
                                >
                                  <ViewIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}

                            {actions.onEdit && (
                              <Tooltip title="Edit">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    actions.onEdit(row);
                                  }}
                                  color="primary"
                                  sx={{
                                    mx: 0.5,
                                    "&:hover": {
                                      backgroundColor: `${theme.palette.primary.light}20`,
                                    },
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}

                            {actions.onDelete && (
                              <Tooltip title="Delete">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    actions.onDelete(row);
                                  }}
                                  color="error"
                                  sx={{
                                    mx: 0.5,
                                    "&:hover": {
                                      backgroundColor: `${theme.palette.error.light}20`,
                                    },
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>

                    {expandable && isRowExpanded && (
                      <TableRow>
                        <TableCell
                          colSpan={
                            columns.length +
                            (selectable ? 1 : 0) +
                            (expandable ? 1 : 0) +
                            (actions.onView ||
                            actions.onEdit ||
                            actions.onDelete
                              ? 1
                              : 0)
                          }
                          sx={{
                            py: 2,
                            backgroundColor: theme.palette.background.default,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                          }}
                        >
                          {renderExpandedRow ? (
                            renderExpandedRow(row)
                          ) : (
                            <Box sx={{ pl: 2 }}>
                              <Typography variant="subtitle2" gutterBottom>
                                Additional Details
                              </Typography>
                              <Grid container spacing={2}>
                                {columns
                                  .filter(
                                    (col) => !col.primary && !col.secondary
                                  )
                                  .map((column) => (
                                    <Grid
                                      item
                                      xs={12}
                                      sm={6}
                                      md={4}
                                      key={column.field}
                                    >
                                      <Box>
                                        <Typography
                                          variant="caption"
                                          color="text.secondary"
                                        >
                                          {column.headerName}
                                        </Typography>
                                        <Typography variant="body2">
                                          {renderCellContent(column, row)}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                  ))}
                              </Grid>
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ p: 2 }}>
          {/* Select All Checkbox for Card View */}
          {selectable && paginatedData.length > 0 && (
            <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              {/** Calculate how many items on the current page are selected */}
              {(() => {
                const selectedOnPage = paginatedData.filter((row) =>
                  selected.includes(row[idField])
                );
                return (
                  <Checkbox
                    indeterminate={
                      selectedOnPage.length > 0 &&
                      selectedOnPage.length < paginatedData.length
                    }
                    checked={
                      paginatedData.length > 0 &&
                      selectedOnPage.length === paginatedData.length
                    }
                    onChange={handleSelectAll}
                  />
                );
              })()}
              <Typography variant="body2" sx={{ ml: 1 }}>
                Select All
              </Typography>
            </Box>
          )}
          {paginatedData.map((row) => renderCardView(row))}
        </Box>
      )}

      {/* Pagination */}
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
              {
                [theme.breakpoints.down("sm")]: {
                  display: "none",
                },
              },
          }}
        />
      )}

      {/* Action menu for mobile */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
        TransitionComponent={Fade}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 180,
            borderRadius: 2,
          },
        }}
      >
        {actions.onView && (
          <MenuItem onClick={() => handleAction("onView")}>
            <ListItemIcon>
              <ViewIcon fontSize="small" color="info" />
            </ListItemIcon>
            <ListItemText>View</ListItemText>
          </MenuItem>
        )}

        {actions.onEdit && (
          <MenuItem onClick={() => handleAction("onEdit")}>
            <ListItemIcon>
              <EditIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        )}

        {actions.onDelete && (
          <MenuItem onClick={() => handleAction("onDelete")}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </Paper>
  );
}
