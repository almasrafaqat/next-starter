"use client";
import HeadingTitle from "@/components/HeadingTitle/HeadingTitle";
import { LoadingCard } from "@/components/ui/LoadingComponents";
import PageHead from "@/components/ui/PageHead/PageHead";
import { usePlan } from "@/hooks/usePlan";
import { Box, Typography } from "@mui/material";
import CompanyAccordion from "../CompanyAccordion/CompanyAccordion";

const LoadingLayout = () => (
  <Box sx={{ mt: 2, mb: 2 }}>
    <LoadingCard />
  </Box>
);

const PlansSection = () => {
  const { data: companies, isLoading, error } = usePlan();

  return (
    <PageHead title="Manage Plans" index={false}>
      <HeadingTitle title="Manage your subscription" />

      {error && <div>Error: {error.message}</div>}
      {isLoading ? (
        <LoadingLayout />
      ) : (
        <Box sx={{ mt: 2 }}>
          {companies?.length ? (
            companies.map((company) => (
              <CompanyAccordion key={company.id} company={company} />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No companies found.
            </Typography>
          )}
        </Box>
      )}
    </PageHead>
  );
};

export default PlansSection;
