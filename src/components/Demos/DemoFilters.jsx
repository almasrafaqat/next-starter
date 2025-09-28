import { Box } from "@mui/material";
import Filters from "@/components/Filters/Filters";
import HeadingTitle from "@/components/HeadingTitle/HeadingTitle";
import DisplayMessage from "@/components/DisplayMessage/DisplayMessage";
import { demoCustomerFilterConfigs } from "@/data/demoCustomerFilters";
import { useState, useMemo } from "react";
import { demoCustomers } from "@/data/demoCustomers";

const DemoFilters = () => {
  const [filters, setFilters] = useState({});
  const filteredData = useMemo(() => {
    let result = demoCustomers;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (row) =>
          row.name.toLowerCase().includes(search) ||
          row.email.toLowerCase().includes(search)
      );
    }
    if (filters.status) {
      result = result.filter((row) => row.status === filters.status);
    }
    if (filters.favorite !== undefined && filters.favorite !== "") {
      result = result.filter((row) => String(row.favorite) === String(filters.favorite));
    }
    if (filters.city) {
      result = result.filter((row) => row.city === filters.city);
    }
    if (filters.createdAt) {
      result = result.filter((row) => row.createdAt === filters.createdAt.format("YYYY-MM-DD"));
    }
    return result;
  }, [filters]);

  return (
    <Box>
      <HeadingTitle title="Filters Component" />
      <DisplayMessage
        type="info"
        title="Filters"
        description="Reusable filter bar for search, select, boolean, and date filters. Use to filter any dataset in your app."
      />
      <Filters
        filters={filters}
        onChange={setFilters}
        filterConfigs={demoCustomerFilterConfigs}
      />
      <Box sx={{ mt: 2 }}>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </Box>
    </Box>
  );
};

export default DemoFilters;