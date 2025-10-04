import InvoiceSection from "@/components/CustomerSections/InvoiceSection/InvoiceSection";
import PlansSection from "@/components/CustomerSections/PlansSection/PlansSection";
import ProfileSection from "@/components/CustomerSections/ProfileSection/ProfileSection";
import SettingsSection from "@/components/CustomerSections/SettingsSection/SettingsSection";
import DashboardTemplate from "@/components/DashboardTemplate/DashboardTemplate";
import NotFoundSection from "@/components/NotFoundSection/NotFoundSection";
import { ProtectedPage } from "@/components/ProtectedPage/ProtectedPage";
import React from "react";

const sectionComponents = {
  profile: ProfileSection,
  plans: PlansSection,
  settings: SettingsSection,
  invoices: InvoiceSection,
  // add more as needed
};

const CustomerSectionPage = ({ params }) => {
  const { section } = params;
  const SectionComponent = sectionComponents[section] || NotFoundSection;
  return (
    <DashboardTemplate group="CUSTOMER">
      <ProtectedPage>
        <SectionComponent />
      </ProtectedPage>
    </DashboardTemplate>
  );
};

export default CustomerSectionPage;
