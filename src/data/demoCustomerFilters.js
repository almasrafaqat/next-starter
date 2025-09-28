export const demoCustomerFilterConfigs = [
  {
    key: "search",
    label: "Search Name or Email",
    type: "search",
    section: "General",
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    section: "General",
    options: [
      { key: "active", label: "Active" },
      { key: "inactive", label: "Inactive" },
    ],
    allLabel: "All Statuses",
  },
  {
    key: "favorite",
    label: "Favorite",
    type: "select",
    section: "General",
    options: [
      { key: true, label: "Yes" },
      { key: false, label: "No" },
    ],
    allLabel: "All",
  },
  {
    key: "city",
    label: "City",
    type: "select",
    section: "Location",
    options: [
      { key: "Lahore", label: "Lahore" },
      { key: "Karachi", label: "Karachi" },
      { key: "Islamabad", label: "Islamabad" },
    ],
    allLabel: "All Cities",
  },
  {
    key: "createdAt",
    label: "Created At",
    type: "date",
    section: "Dates",
  },
];