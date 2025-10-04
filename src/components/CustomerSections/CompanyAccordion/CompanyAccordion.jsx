import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useState } from "react";
import CompanyMeta from "../CompanyMeta/CompanyMeta";
import PlanAccordion from "../PlanAccordion/PlanAccordion";
import ReusableCard from "@/components/ReusableCard/ReuseableCard";

export default function CompanyAccordion({ company }) {
  const [expandedPlan, setExpandedPlan] = useState(false);

  const handlePlanChange = (panel) => (event, isExpanded) => {
    setExpandedPlan(isExpanded ? panel : false);
  };

  return (
    <ReusableCard>
      <CardContent sx={{ p: 0.5 }}>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                {company.name}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">ID: {company.id}</Typography> */}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1" fontWeight={500} gutterBottom>
              Company Meta
            </Typography>
            {company.metas?.length ? (
              company.metas.map((meta, idx) => (
                <CompanyMeta key={idx} meta={meta} />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                No company meta data.
              </Typography>
            )}

            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight={500} gutterBottom>
              Plans
            </Typography>
            {company.plans?.length ? (
              company.plans.map((plan, idx) => (
                <PlanAccordion
                  key={plan.id}
                  plan={plan}
                  expanded={expandedPlan === `plan${plan.id}`}
                  handleChange={handlePlanChange(`plan${plan.id}`)}
                />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No plans.
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </ReusableCard>
  );
}
