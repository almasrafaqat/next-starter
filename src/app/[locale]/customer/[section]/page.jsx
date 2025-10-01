import PlansSection from "@/components/CustomerSections/PlansSection/PlansSection";
import ProfileSection from "@/components/CustomerSections/ProfileSection/ProfileSection";
import SettingsSection from "@/components/CustomerSections/SettingsSection/SettingsSection";
import DashboardTemplate from "@/components/DashboardTemplate/DashboardTemplate";
import React from "react";

const sectionComponents = {
  profile: ProfileSection,
  plans: PlansSection,
  settings: SettingsSection,
  // add more as needed
};

const CustomerSectionPage = ({ params }) => {
  const { section } = params;
  const SectionComponent = sectionComponents[section];
  return (
    <DashboardTemplate group="CUSTOMER">
      {SectionComponent ? <SectionComponent /> : <div>Section not found</div>}
    </DashboardTemplate>
  );
};

export default CustomerSectionPage;
