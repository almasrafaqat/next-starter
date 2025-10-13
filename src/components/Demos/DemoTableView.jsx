import {TableView} from "@/components/TableView/TableView[pending]";
import HeadingTitle from "@/components/HeadingTitle/HeadingTitle";
import DisplayMessage from "@/components/DisplayMessage/DisplayMessage";
import { demoCustomers } from "@/data/demoCustomers";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  AccountCircle,
  Add,
  GradeSharp,
  PlaylistAddCheck,
} from "@mui/icons-material";

// Demo columns
const columns = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 60,
    primary: true,
    sortable: true,
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 120,
    secondary: true,
    sortable: true,
  },
  { field: "email", headerName: "Email", minWidth: 180, sortable: true },
  {
    field: "status",
    headerName: "Status",
    minWidth: 100,
    type: "chip",
    chipColor: (v) => (v === "active" ? "success" : "default"),
    filterType: "select",
    filterOptions: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  },
  {
    field: "createdAt",
    headerName: "Created At",
    minWidth: 120,
    type: "date",
    sortable: true,
  },
  {
    field: "favorite",
    headerName: "Favorite",
    minWidth: 80,
    type: "boolean",
    filterType: "boolean",
    filterable: true,
  },
  {
    field: "thumbnail",
    headerName: "Avatar",
    minWidth: 80,
    type: "thumbnail",
    filterable: false,
  },
];

// Demo data
const data = [
  {
    id: 1,
    name: "Ali Khan",
    email: "ali@example.com",
    status: "active",
    createdAt: "2023-09-01",
    favorite: true,
    thumbnail: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Sara Malik",
    email: "sara@example.com",
    status: "inactive",
    createdAt: "2023-08-15",
    favorite: false,
    thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Bilal Ahmed",
    email: "bilal@example.com",
    status: "active",
    createdAt: "2023-07-20",
    favorite: true,
    thumbnail: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const renderExpandedRow = (row) => (
  <Box>
    <Typography variant="subtitle2">Details for {row.name}</Typography>
    <Typography variant="body2">Email: {row.email}</Typography>
    <Typography variant="body2">Status: {row.status}</Typography>
    <Typography variant="body2">Created: {row.createdAt}</Typography>
    <Typography variant="body2">
      Favorite: {row.favorite ? "Yes" : "No"}
    </Typography>
  </Box>
);

const handleExport = () => {
  alert({ title: "Export", message: "Exported all data!" });
};

// Demo actions
const actions = {
  onView: (row) =>
    alert({ title: "View", message: JSON.stringify(row, null, 2) }),
  onEdit: (row) => alert({ title: "Edit", message: `Edit user: ${row.name}` }),
  onDelete: (row) =>
    confirm({ title: "Delete", message: `Delete user: ${row.name}?` }),
};

const customRowActions = [
  {
    icon: <Add color="warning" />,
    label: "Mark as Favorite",
    onClick: (row) =>
      alert({
        title: "Favorite",
        message: `Marked ${row.name} as favorite!`,
      }),
  },
  {
    icon: <Add />,
    label: "Export Row",
    onClick: (row) =>
      alert({ title: "Export", message: `Exported ${row.name}` }),
  },
];



export const DemoTableView = () => (
  
  <Box>
    <HeadingTitle title="TableView Component" />
    <DisplayMessage
      type="info"
      title="TableView"
      description="A robust, responsive table with search, filter, export, bulk actions, and expandable rows. Use for any data grid in your app."
    />
    <TableView
      title="Customer List"
      columns={columns}
      data={data}
      actions={{
        onView: (row) =>
          alert({ title: "View", message: JSON.stringify(row, null, 2) }),
        onEdit: (row) =>
          alert({ title: "Edit", message: `Edit user: ${row.name}` }),
        onDelete: (row) =>
          confirm({ title: "Delete", message: `Delete user: ${row.name}?` }),
      }}
      selectable={true}
      pagination={true}
      searchable={true}
      filterable={true}
      exportable={true}
      onExport={handleExport}
      expandable={true}
      renderExpandedRow={renderExpandedRow}
      customRowActions={customRowActions}
      
    />
  </Box>
);


